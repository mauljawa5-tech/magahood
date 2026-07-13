import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import {
  APP_CONFIG,
  generateCitizenId,
  shortAddress,
} from '../data/config'
import {
  TARGET_CHAIN,
  connectEvmWallet,
  tryReconnect,
  subscribeWalletEvents,
  switchOrAddChain,
  getNativeBalance,
  getChainId,
  hasWallet,
  detectWalletName,
  openMetaMaskInstall,
  explorerAddressUrl,
} from '../lib/wallet'

const STORAGE_KEY = 'magahood_citizen_v1'
const AppContext = createContext(null)

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function AppProvider({ children }) {
  const saved = loadState()

  // Real EVM wallet — do not restore fake addresses from storage
  const [wallet, setWallet] = useState(null)
  const [connecting, setConnecting] = useState(false)
  const [walletName, setWalletName] = useState(null)
  const [chainId, setChainId] = useState(null)
  const [networkOk, setNetworkOk] = useState(false)
  const [ethBalance, setEthBalance] = useState(null)
  const [walletReady, setWalletReady] = useState(false)

  const [citizen, setCitizen] = useState(saved?.citizen ?? null)
  const [joinedCities, setJoinedCities] = useState(saved?.joinedCities ?? [])
  const [balance, setBalance] = useState(saved?.balance ?? 0)
  const [staked, setStaked] = useState(saved?.staked ?? 0)
  const [votes, setVotes] = useState(saved?.votes ?? {})
  const [purchases, setPurchases] = useState(saved?.purchases ?? [])
  const [ownedListings, setOwnedListings] = useState(saved?.ownedListings ?? [])

  const balanceRef = useRef(balance)
  const stakedRef = useRef(staked)
  const walletRef = useRef(wallet)
  useEffect(() => {
    balanceRef.current = balance
  }, [balance])
  useEffect(() => {
    stakedRef.current = staked
  }, [staked])
  useEffect(() => {
    walletRef.current = wallet
  }, [wallet])

  // UI modals
  const [activeModal, setActiveModal] = useState(null) // wallet | citizenship | token | stake | city | listing | create-city
  const [modalPayload, setModalPayload] = useState(null)
  const [toasts, setToasts] = useState([])

  // Persist app state (not wallet address — wallet rehydrates via eth_accounts)
  useEffect(() => {
    const data = {
      citizen,
      joinedCities,
      balance,
      staked,
      votes,
      purchases,
      ownedListings,
      lastWallet: wallet,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [wallet, citizen, joinedCities, balance, staked, votes, purchases, ownedListings])

  const applySession = useCallback((session) => {
    if (!session?.address) {
      setWallet(null)
      walletRef.current = null
      setWalletName(null)
      setChainId(null)
      setNetworkOk(false)
      setEthBalance(null)
      return
    }
    setWallet(session.address)
    walletRef.current = session.address
    setWalletName(session.walletName || detectWalletName())
    setChainId(session.chainId ?? null)
    setNetworkOk(Boolean(session.networkOk))
    setEthBalance(session.ethBalance ?? null)
  }, [])

  const toast = useCallback((message, type = 'info') => {
    const id = `${Date.now()}-${Math.random()}`
    setToasts((t) => [...t, { id, message, type }])
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id))
    }, 3800)
  }, [])

  const dismissToast = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id))
  }, [])

  const openModal = useCallback((name, payload = null) => {
    setActiveModal(name)
    setModalPayload(payload)
  }, [])

  const closeModal = useCallback(() => {
    setActiveModal(null)
    setModalPayload(null)
  }, [])

  // Auto-reconnect if previously authorized in browser wallet
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const session = await tryReconnect()
        if (!cancelled && session) {
          applySession(session)
        }
      } finally {
        if (!cancelled) setWalletReady(true)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [applySession])

  // Listen for account / chain changes
  useEffect(() => {
    return subscribeWalletEvents({
      onAccountsChanged: async (accounts) => {
        if (!accounts?.length) {
          applySession(null)
          toast('Wallet disconnected', 'info')
          return
        }
        const address = accounts[0]
        let ethBal = null
        let newChainId = null
        try {
          newChainId = await getChainId()
          ethBal = await getNativeBalance(address)
        } catch {
          /* ignore */
        }
        applySession({
          address,
          chainId: newChainId,
          networkOk: newChainId === TARGET_CHAIN.chainId,
          walletName: detectWalletName(),
          ethBalance: ethBal,
        })
        toast(`Account switched: ${shortAddress(address)}`, 'info')
      },
      onChainChanged: async (newChainId) => {
        setChainId(newChainId)
        const ok = newChainId === TARGET_CHAIN.chainId
        setNetworkOk(ok)
        if (walletRef.current) {
          try {
            const ethBal = await getNativeBalance(walletRef.current)
            setEthBalance(ethBal)
          } catch {
            /* ignore */
          }
        }
        if (ok) {
          toast(`Connected to ${TARGET_CHAIN.chainName}`, 'success')
        } else {
          toast(`Wrong network (chain ${newChainId}). Switch to Robinhood Chain.`, 'error')
        }
      },
    })
  }, [applySession, toast])

  const connectWallet = useCallback(async () => {
    if (!hasWallet()) {
      toast('Install MetaMask or another EVM wallet', 'error')
      openMetaMaskInstall()
      return null
    }

    setConnecting(true)
    try {
      const session = await connectEvmWallet({ switchNetwork: true })
      applySession(session)

      // Demo $MAGAHOOD app balance for ecosystem features (token not on-chain yet)
      if (balanceRef.current === 0) {
        balanceRef.current = 1000
        setBalance(1000)
      }

      if (session.networkOk) {
        toast(`${session.walletName} connected · ${TARGET_CHAIN.chainName}`, 'success')
      } else {
        toast(
          `Connected ${shortAddress(session.address)} — please switch to ${TARGET_CHAIN.chainName}`,
          'info',
        )
      }
      return session.address
    } catch (err) {
      if (err?.code === 'NO_WALLET' || err?.code === 'NO_WALLET') {
        toast('No wallet detected. Install MetaMask.', 'error')
        openMetaMaskInstall()
      } else if (err?.code === 4001) {
        toast('Connection rejected in wallet', 'error')
      } else {
        console.error(err)
        toast(err?.message || 'Failed to connect wallet', 'error')
      }
      return null
    } finally {
      setConnecting(false)
    }
  }, [applySession, toast])

  const switchToRobinhood = useCallback(async () => {
    try {
      await switchOrAddChain(TARGET_CHAIN)
      const id = TARGET_CHAIN.chainId
      setChainId(id)
      setNetworkOk(true)
      if (walletRef.current) {
        const ethBal = await getNativeBalance(walletRef.current)
        setEthBalance(ethBal)
      }
      toast(`Switched to ${TARGET_CHAIN.chainName}`, 'success')
      return true
    } catch (err) {
      if (err?.code === 4001) {
        toast('Network switch rejected', 'error')
      } else {
        toast(err?.message || 'Failed to switch network', 'error')
      }
      return false
    }
  }, [toast])

  const disconnectWallet = useCallback(() => {
    setWallet(null)
    walletRef.current = null
    setWalletName(null)
    setChainId(null)
    setNetworkOk(false)
    setEthBalance(null)
    toast('Wallet disconnected from MAGAHOOD', 'info')
  }, [toast])

  const refreshEthBalance = useCallback(async () => {
    if (!walletRef.current) return null
    try {
      const ethBal = await getNativeBalance(walletRef.current)
      setEthBalance(ethBal)
      return ethBal
    } catch {
      return null
    }
  }, [])

  const requireWallet = useCallback(async () => {
    if (wallet) return wallet
    openModal('wallet')
    return null
  }, [wallet, openModal])

  const claimCitizenship = useCallback(
    async ({ displayName, homeCity, address }) => {
      const w = address || wallet
      if (!w) {
        toast('Connect wallet first', 'error')
        return false
      }
      await new Promise((r) => setTimeout(r, 700))
      const profile = {
        id: generateCitizenId(),
        displayName: displayName?.trim() || 'Digital Citizen',
        homeCity: homeCity || 'creator',
        reputation: 12,
        createdAt: new Date().toISOString(),
        passportMinted: true,
      }
      setCitizen(profile)
      if (homeCity) {
        setJoinedCities((c) => (c.includes(homeCity) ? c : [...c, homeCity]))
      }
      toast(`Citizenship claimed · Passport #${profile.id}`, 'success')
      return true
    },
    [wallet, toast],
  )

  const joinCity = useCallback(
    (cityId) => {
      if (!wallet) {
        openModal('wallet')
        return false
      }
      if (!citizen) {
        openModal('citizenship', { preferCity: cityId })
        toast('Claim citizenship to join cities', 'info')
        return false
      }
      if (joinedCities.includes(cityId)) {
        toast('Already a member of this city', 'info')
        return true
      }
      setJoinedCities((c) => [...c, cityId])
      setCitizen((prev) =>
        prev ? { ...prev, reputation: Math.min(100, (prev.reputation || 0) + 5) } : prev,
      )
      toast(`Joined city successfully`, 'success')
      return true
    },
    [wallet, citizen, joinedCities, openModal, toast],
  )

  const buyToken = useCallback(
    (amount, { skipWalletCheck = false } = {}) => {
      if (!walletRef.current && !skipWalletCheck) {
        openModal('wallet')
        return false
      }
      const n = Number(amount)
      if (!n || n <= 0) {
        toast('Enter a valid amount', 'error')
        return false
      }
      balanceRef.current += n
      setBalance(balanceRef.current)
      toast(`Received ${n.toLocaleString()} $MAGAHOOD (demo)`, 'success')
      return true
    },
    [openModal, toast],
  )

  const stakeTokens = useCallback(
    (amount, { skipWalletCheck = false } = {}) => {
      if (!walletRef.current && !skipWalletCheck) {
        openModal('wallet')
        return false
      }
      const n = Number(amount)
      if (!n || n <= 0) {
        toast('Enter a valid stake amount', 'error')
        return false
      }
      if (n > balanceRef.current) {
        toast('Insufficient $MAGAHOOD balance', 'error')
        openModal('token')
        return false
      }
      balanceRef.current -= n
      stakedRef.current += n
      setBalance(balanceRef.current)
      setStaked(stakedRef.current)
      toast(`Staked ${n.toLocaleString()} $MAGAHOOD`, 'success')
      return true
    },
    [openModal, toast],
  )

  const unstakeTokens = useCallback(
    (amount) => {
      const n = Number(amount)
      if (!n || n <= 0 || n > stakedRef.current) {
        toast('Invalid unstake amount', 'error')
        return false
      }
      stakedRef.current -= n
      balanceRef.current += n
      setStaked(stakedRef.current)
      setBalance(balanceRef.current)
      toast(`Unstaked ${n.toLocaleString()} $MAGAHOOD`, 'success')
      return true
    },
    [toast],
  )

  const spendTokens = useCallback(
    (amount, reason = 'purchase') => {
      if (!walletRef.current) {
        openModal('wallet')
        return false
      }
      const n = Number(amount)
      if (!n || n <= 0) return false
      if (n > balanceRef.current) {
        toast('Insufficient $MAGAHOOD balance', 'error')
        openModal('token')
        return false
      }
      balanceRef.current -= n
      setBalance(balanceRef.current)
      toast(`Spent ${n} $MAGAHOOD · ${reason}`, 'success')
      return true
    },
    [openModal, toast],
  )

  const voteOnProposal = useCallback(
    (proposalId, choice) => {
      if (!wallet) {
        openModal('wallet')
        return false
      }
      if (!citizen) {
        openModal('citizenship')
        toast('Citizenship required to vote', 'info')
        return false
      }
      if (votes[proposalId]) {
        toast('You already voted on this proposal', 'info')
        return false
      }
      const power = Math.max(1, Math.floor(staked / 10) + 1)
      setVotes((v) => ({ ...v, [proposalId]: { choice, power, at: Date.now() } }))
      setCitizen((prev) =>
        prev ? { ...prev, reputation: Math.min(100, (prev.reputation || 0) + 3) } : prev,
      )
      toast(`Vote cast: ${choice.toUpperCase()} (power ${power})`, 'success')
      return true
    },
    [wallet, citizen, votes, staked, openModal, toast],
  )

  const purchaseListing = useCallback(
    (listing) => {
      if (!walletRef.current) {
        openModal('wallet')
        return false
      }
      if (balanceRef.current < listing.price) {
        toast('Not enough $MAGAHOOD — get tokens first', 'error')
        openModal('token')
        return false
      }
      if (purchases.includes(listing.id) || ownedListings.includes(listing.id)) {
        toast('Already owned', 'info')
        return false
      }
      balanceRef.current -= listing.price
      setBalance(balanceRef.current)
      setPurchases((p) => [...p, listing.id])
      setOwnedListings((o) => [...o, listing.id])
      setCitizen((prev) =>
        prev ? { ...prev, reputation: Math.min(100, (prev.reputation || 0) + 2) } : prev,
      )
      toast(`Purchased ${listing.title}`, 'success')
      return true
    },
    [purchases, ownedListings, openModal, toast],
  )

  const copyContract = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(APP_CONFIG.contractAddress)
      toast('Contract address copied', 'success')
    } catch {
      toast('Could not copy address', 'error')
    }
  }, [toast])

  const resetDemo = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setCitizen(null)
    setJoinedCities([])
    setBalance(0)
    balanceRef.current = 0
    setStaked(0)
    stakedRef.current = 0
    setVotes({})
    setPurchases([])
    setOwnedListings([])
    toast('App demo data reset (wallet still connected)', 'info')
    closeModal()
  }, [toast, closeModal])

  const value = useMemo(
    () => ({
      config: APP_CONFIG,
      wallet,
      connecting,
      walletName,
      chainId,
      networkOk,
      ethBalance,
      walletReady,
      targetChain: TARGET_CHAIN,
      hasInjectedWallet: hasWallet(),
      citizen,
      joinedCities,
      balance,
      staked,
      votes,
      purchases,
      ownedListings,
      activeModal,
      modalPayload,
      toasts,
      isConnected: Boolean(wallet),
      isCitizen: Boolean(citizen),
      shortWallet: wallet ? shortAddress(wallet) : null,
      explorerUrl: wallet ? explorerAddressUrl(wallet) : null,
      toast,
      dismissToast,
      openModal,
      closeModal,
      connectWallet,
      disconnectWallet,
      switchToRobinhood,
      refreshEthBalance,
      requireWallet,
      claimCitizenship,
      joinCity,
      buyToken,
      stakeTokens,
      unstakeTokens,
      spendTokens,
      voteOnProposal,
      purchaseListing,
      copyContract,
      resetDemo,
    }),
    [
      wallet,
      connecting,
      walletName,
      chainId,
      networkOk,
      ethBalance,
      walletReady,
      citizen,
      joinedCities,
      balance,
      staked,
      votes,
      purchases,
      ownedListings,
      activeModal,
      modalPayload,
      toasts,
      toast,
      dismissToast,
      openModal,
      closeModal,
      connectWallet,
      disconnectWallet,
      switchToRobinhood,
      refreshEthBalance,
      requireWallet,
      claimCitizenship,
      joinCity,
      buyToken,
      stakeTokens,
      unstakeTokens,
      spendTokens,
      voteOnProposal,
      purchaseListing,
      copyContract,
      resetDemo,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
