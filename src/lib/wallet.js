/** Robinhood Chain — EVM L2 (mainnet) */
export const ROBINHOOD_CHAIN = {
  chainId: 4663,
  chainIdHex: '0x1237', // 4663
  chainName: 'Robinhood Chain',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://rpc.mainnet.chain.robinhood.com'],
  blockExplorerUrls: ['https://robinhoodchain.blockscout.com'],
}

export const ROBINHOOD_TESTNET = {
  chainId: 46630,
  chainIdHex: '0xb626', // 46630
  chainName: 'Robinhood Chain Testnet',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://rpc.testnet.chain.robinhood.com'],
  blockExplorerUrls: ['https://testnet.robinhoodchain.blockscout.com'],
}

/** Active target chain for MAGAHOOD */
export const TARGET_CHAIN = ROBINHOOD_CHAIN

export function getEthereum() {
  if (typeof window === 'undefined') return null
  const { ethereum } = window
  if (!ethereum) return null

  // Prefer MetaMask if multiple providers injected
  if (ethereum.providers?.length) {
    const metamask = ethereum.providers.find((p) => p.isMetaMask && !p.isBraveWallet)
    const phantom = ethereum.providers.find((p) => p.isPhantom)
    const rabby = ethereum.providers.find((p) => p.isRabby)
    return metamask || rabby || phantom || ethereum.providers[0]
  }
  return ethereum
}

export function hasWallet() {
  return Boolean(getEthereum())
}

export function detectWalletName() {
  const eth = getEthereum()
  if (!eth) return null
  if (eth.isRabby) return 'Rabby'
  if (eth.isPhantom) return 'Phantom'
  if (eth.isMetaMask) return 'MetaMask'
  if (eth.isCoinbaseWallet) return 'Coinbase Wallet'
  if (eth.isOkxWallet || eth.isOKExWallet) return 'OKX Wallet'
  return 'Browser Wallet'
}

function toHexChainId(id) {
  return `0x${Number(id).toString(16)}`
}

export async function getChainId() {
  const eth = getEthereum()
  if (!eth) return null
  const id = await eth.request({ method: 'eth_chainId' })
  return parseInt(id, 16)
}

export async function switchOrAddChain(chain = TARGET_CHAIN) {
  const eth = getEthereum()
  if (!eth) throw new Error('No wallet found')

  const chainIdHex = chain.chainIdHex || toHexChainId(chain.chainId)

  try {
    await eth.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chainIdHex }],
    })
    return true
  } catch (err) {
    // 4902 = chain not added
    if (err?.code === 4902 || err?.code === -32603 || /unrecognized chain/i.test(err?.message || '')) {
      await eth.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: chainIdHex,
            chainName: chain.chainName,
            nativeCurrency: chain.nativeCurrency,
            rpcUrls: chain.rpcUrls,
            blockExplorerUrls: chain.blockExplorerUrls,
          },
        ],
      })
      return true
    }
    // User rejected
    if (err?.code === 4001) {
      throw new Error('Network switch rejected in wallet')
    }
    throw err
  }
}

/**
 * Request accounts from injected EVM wallet (MetaMask, etc.)
 * Optionally switches to Robinhood Chain.
 */
export async function connectEvmWallet({ switchNetwork = true } = {}) {
  const eth = getEthereum()
  if (!eth) {
    const error = new Error('NO_WALLET')
    error.code = 'NO_WALLET'
    throw error
  }

  const accounts = await eth.request({ method: 'eth_requestAccounts' })
  if (!accounts?.length) {
    throw new Error('No account returned from wallet')
  }

  let chainId = await getChainId()
  let networkOk = chainId === TARGET_CHAIN.chainId

  if (switchNetwork && !networkOk) {
    try {
      await switchOrAddChain(TARGET_CHAIN)
      chainId = await getChainId()
      networkOk = chainId === TARGET_CHAIN.chainId
    } catch (e) {
      // Still allow connect if switch fails — report status
      console.warn('Chain switch failed:', e)
    }
  }

  const address = accounts[0]
  let ethBalance = null
  try {
    ethBalance = await getNativeBalance(address)
  } catch {
    ethBalance = null
  }

  return {
    address,
    chainId,
    networkOk,
    walletName: detectWalletName(),
    ethBalance,
    provider: eth,
  }
}

/** Silent reconnect if already authorized */
export async function tryReconnect() {
  const eth = getEthereum()
  if (!eth) return null

  try {
    const accounts = await eth.request({ method: 'eth_accounts' })
    if (!accounts?.length) return null

    const chainId = await getChainId()
    let ethBalance = null
    try {
      ethBalance = await getNativeBalance(accounts[0])
    } catch {
      ethBalance = null
    }

    return {
      address: accounts[0],
      chainId,
      networkOk: chainId === TARGET_CHAIN.chainId,
      walletName: detectWalletName(),
      ethBalance,
      provider: eth,
    }
  } catch {
    return null
  }
}

export async function getNativeBalance(address) {
  const eth = getEthereum()
  if (!eth || !address) return null
  const hex = await eth.request({
    method: 'eth_getBalance',
    params: [address, 'latest'],
  })
  const wei = BigInt(hex)
  // ETH with 4 decimal places
  const whole = wei / 10n ** 18n
  const frac = (wei % 10n ** 18n) / 10n ** 14n // 4 decimals
  return `${whole}.${frac.toString().padStart(4, '0')}`
}

export function openMetaMaskInstall() {
  window.open('https://metamask.io/download/', '_blank', 'noopener,noreferrer')
}

export function subscribeWalletEvents({ onAccountsChanged, onChainChanged }) {
  const eth = getEthereum()
  if (!eth) return () => {}

  const handleAccounts = (accounts) => {
    onAccountsChanged?.(accounts)
  }
  const handleChain = (chainIdHex) => {
    onChainChanged?.(parseInt(chainIdHex, 16))
  }

  eth.on?.('accountsChanged', handleAccounts)
  eth.on?.('chainChanged', handleChain)

  return () => {
    eth.removeListener?.('accountsChanged', handleAccounts)
    eth.removeListener?.('chainChanged', handleChain)
  }
}

export function explorerAddressUrl(address) {
  const base = TARGET_CHAIN.blockExplorerUrls?.[0] || 'https://robinhoodchain.blockscout.com'
  return `${base.replace(/\/$/, '')}/address/${address}`
}
