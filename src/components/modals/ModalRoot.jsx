import { useEffect, useState } from 'react'
import {
  Wallet,
  Copy,
  Loader2,
  UserPlus,
  Coins,
  Lock,
  Unlock,
  ExternalLink,
  Building2,
  AlertTriangle,
  RefreshCw,
  Network,
} from 'lucide-react'
import Modal from '../ui/Modal'
import { useApp } from '../../context/AppContext'
import { CITIES, APP_CONFIG } from '../../data/config'
import { LogoMark } from '../Logo'
import { hasWallet, detectWalletName, openMetaMaskInstall } from '../../lib/wallet'

export default function ModalRoot() {
  const {
    activeModal,
    modalPayload,
    closeModal,
    wallet,
    connecting,
    connectWallet,
    disconnectWallet,
    citizen,
    claimCitizenship,
    balance,
    staked,
    buyToken,
    stakeTokens,
    unstakeTokens,
    copyContract,
    joinCity,
    purchaseListing,
    ownedListings,
    resetDemo,
    toast,
    walletName,
    networkOk,
    chainId,
    ethBalance,
    switchToRobinhood,
    refreshEthBalance,
    explorerUrl,
    targetChain,
  } = useApp()

  return (
    <>
      <WalletModal
        open={activeModal === 'wallet'}
        onClose={closeModal}
        wallet={wallet}
        connecting={connecting}
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}
        balance={balance}
        staked={staked}
        citizen={citizen}
        resetDemo={resetDemo}
        walletName={walletName}
        networkOk={networkOk}
        chainId={chainId}
        ethBalance={ethBalance}
        switchToRobinhood={switchToRobinhood}
        refreshEthBalance={refreshEthBalance}
        explorerUrl={explorerUrl}
        targetChain={targetChain}
      />
      <CitizenshipModal
        open={activeModal === 'citizenship'}
        onClose={closeModal}
        wallet={wallet}
        citizen={citizen}
        claimCitizenship={claimCitizenship}
        connectWallet={connectWallet}
        preferCity={modalPayload?.preferCity}
      />
      <TokenModal
        open={activeModal === 'token'}
        onClose={closeModal}
        wallet={wallet}
        balance={balance}
        buyToken={buyToken}
        connectWallet={connectWallet}
        copyContract={copyContract}
        toast={toast}
      />
      <StakeModal
        open={activeModal === 'stake'}
        onClose={closeModal}
        wallet={wallet}
        balance={balance}
        staked={staked}
        stakeTokens={stakeTokens}
        unstakeTokens={unstakeTokens}
        connectWallet={connectWallet}
      />
      <CityModal
        open={activeModal === 'city'}
        onClose={closeModal}
        city={modalPayload?.city}
        joinCity={joinCity}
        joined={modalPayload?.joined}
      />
      <ListingModal
        open={activeModal === 'listing'}
        onClose={closeModal}
        listing={modalPayload?.listing}
        purchaseListing={purchaseListing}
        owned={ownedListings.includes(modalPayload?.listing?.id)}
        balance={balance}
      />
      <CreateCityModal open={activeModal === 'create-city'} onClose={closeModal} toast={toast} wallet={wallet} citizen={citizen} connectWallet={connectWallet} />
    </>
  )
}

function WalletModal({
  open,
  onClose,
  wallet,
  connecting,
  connectWallet,
  disconnectWallet,
  balance,
  staked,
  citizen,
  resetDemo,
  walletName,
  networkOk,
  chainId,
  ethBalance,
  switchToRobinhood,
  refreshEthBalance,
  explorerUrl,
  targetChain,
}) {
  const injected = hasWallet()
  const detected = detectWalletName()

  const handleConnect = async () => {
    const addr = await connectWallet()
    if (addr) {
      // keep modal open so user sees status
    }
  }

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(wallet)
    } catch {
      /* ignore */
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Connect Wallet">
      {!wallet ? (
        <div className="space-y-5">
          <div className="flex justify-center">
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4">
              <Wallet className="text-primary" size={32} />
            </div>
          </div>
          <div className="text-center space-y-2">
            <p className="text-sm text-white font-semibold">
              Connect to {targetChain?.chainName || APP_CONFIG.network}
            </p>
            <p className="text-xs text-muted leading-relaxed">
              Use MetaMask, Rabby, Phantom (EVM), or any injected wallet. We will request
              connection and switch to Chain ID {targetChain?.chainId || 4663}.
            </p>
          </div>

          {injected ? (
            <button
              type="button"
              disabled={connecting}
              onClick={handleConnect}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-bold text-void hover:bg-primary-glow disabled:opacity-60"
            >
              {connecting ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Waiting for wallet…
                </>
              ) : (
                <>
                  <Wallet size={16} /> Connect {detected || 'Wallet'}
                </>
              )}
            </button>
          ) : (
            <div className="space-y-3">
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 flex gap-2 text-xs text-amber-200">
                <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                No browser wallet detected. Install MetaMask, then refresh this page.
              </div>
              <button
                type="button"
                onClick={openMetaMaskInstall}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-bold text-void"
              >
                <ExternalLink size={16} /> Install MetaMask
              </button>
            </div>
          )}

          <div className="rounded-xl border border-border bg-surface p-3 text-[11px] text-muted space-y-1">
            <p>
              <span className="text-primary">Network:</span> {targetChain?.chainName}
            </p>
            <p>
              <span className="text-primary">Chain ID:</span> {targetChain?.chainId}
            </p>
            <p>
              <span className="text-primary">RPC:</span> rpc.mainnet.chain.robinhood.com
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {!networkOk && (
            <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 space-y-2">
              <div className="flex gap-2 text-xs text-amber-100">
                <AlertTriangle size={16} className="shrink-0" />
                <span>
                  Wrong network (chain {chainId ?? '—'}). Switch to{' '}
                  {targetChain?.chainName} (ID {targetChain?.chainId}).
                </span>
              </div>
              <button
                type="button"
                onClick={switchToRobinhood}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary py-2 text-xs font-bold text-void"
              >
                <Network size={14} /> Switch to Robinhood Chain
              </button>
            </div>
          )}

          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[10px] uppercase tracking-wider text-primary">
                {walletName || 'Wallet'} · {networkOk ? targetChain?.chainName : `Chain ${chainId}`}
              </p>
              {networkOk && (
                <span className="text-[10px] font-bold text-primary">● Connected</span>
              )}
            </div>
            <p className="font-mono text-sm text-white break-all">{wallet}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={copyAddress}
                className="inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1 text-[11px] text-muted hover:text-primary"
              >
                <Copy size={12} /> Copy
              </button>
              {explorerUrl && (
                <a
                  href={explorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1 text-[11px] text-muted hover:text-primary"
                >
                  <ExternalLink size={12} /> Explorer
                </a>
              )}
              <button
                type="button"
                onClick={refreshEthBalance}
                className="inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1 text-[11px] text-muted hover:text-primary"
              >
                <RefreshCw size={12} /> Refresh
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-surface p-3">
              <p className="text-[10px] text-muted uppercase">ETH (gas)</p>
              <p className="text-white font-bold text-sm">
                {ethBalance != null ? `${ethBalance}` : '—'}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-3">
              <p className="text-[10px] text-muted uppercase">$MAGAHOOD (app)</p>
              <p className="text-primary font-bold text-sm">{balance.toLocaleString()} MH</p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-3 col-span-2">
              <p className="text-[10px] text-muted uppercase">Staked (app)</p>
              <p className="text-primary font-bold text-sm">{staked.toLocaleString()} MH</p>
            </div>
          </div>

          {citizen && (
            <div className="rounded-xl border border-border bg-surface p-3 flex items-center gap-3">
              <LogoMark className="h-10 w-10" />
              <div>
                <p className="text-sm font-semibold text-white">{citizen.displayName}</p>
                <p className="text-xs text-primary">Passport #{citizen.id}</p>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => {
              disconnectWallet()
              onClose()
            }}
            className="w-full rounded-full border border-border py-2.5 text-sm text-muted hover:text-white hover:border-primary/30"
          >
            Disconnect
          </button>
          <button
            type="button"
            onClick={resetDemo}
            className="w-full text-xs text-muted hover:text-red-400"
          >
            Reset demo app data
          </button>
        </div>
      )}
    </Modal>
  )
}

function CitizenshipModal({
  open,
  onClose,
  wallet,
  citizen,
  claimCitizenship,
  connectWallet,
  preferCity,
}) {
  const [name, setName] = useState('')
  const [city, setCity] = useState(preferCity || 'creator')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open && preferCity) setCity(preferCity)
  }, [open, preferCity])

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    let address = wallet
    if (!address) {
      address = await connectWallet()
    }
    const ok = await claimCitizenship({
      displayName: name,
      homeCity: city,
      address,
    })
    setLoading(false)
    if (ok) onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Claim Citizenship">
      {citizen ? (
        <div className="space-y-4 text-center">
          <LogoMark className="h-16 w-16 mx-auto" />
          <div>
            <p className="font-display text-lg font-bold text-white">{citizen.displayName}</p>
            <p className="text-primary text-sm">Passport #{citizen.id}</p>
            <p className="text-xs text-muted mt-2">
              Reputation {citizen.reputation} · Home city: {citizen.homeCity}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-full bg-primary py-3 text-sm font-bold text-void"
          >
            Continue
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <p className="text-sm text-muted leading-relaxed">
            Mint your MAGAHOOD Passport and join the digital nation. Demo mints are free and
            stored locally.
          </p>
          {!wallet && (
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 text-xs text-primary">
              Wallet required — connecting will create a demo wallet.
            </div>
          )}
          <label className="block">
            <span className="text-xs text-muted mb-1.5 block">Display name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Cyber Citizen"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-white outline-none focus:border-primary/50"
            />
          </label>
          <label className="block">
            <span className="text-xs text-muted mb-1.5 block">Home city</span>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-white outline-none focus:border-primary/50"
            >
              {CITIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-bold text-void hover:bg-primary-glow disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Minting passport…
              </>
            ) : (
              <>
                <UserPlus size={16} /> {wallet ? 'Claim Citizenship' : 'Connect & Claim'}
              </>
            )}
          </button>
        </form>
      )}
    </Modal>
  )
}

function TokenModal({
  open,
  onClose,
  wallet,
  balance,
  buyToken,
  connectWallet,
  copyContract,
  toast,
}) {
  const [amount, setAmount] = useState('500')

  const getTokens = async () => {
    if (!wallet) {
      await connectWallet()
    }
    if (buyToken(amount, { skipWalletCheck: true })) {
      onClose()
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Get $MAGAHOOD">
      <div className="space-y-4">
        <div className="rounded-xl border border-border bg-surface p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted">Network</span>
            <span className="text-white">{APP_CONFIG.network}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted">Ticker</span>
            <span className="text-primary font-semibold">{APP_CONFIG.ticker}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted">Your balance</span>
            <span className="text-white">{balance.toLocaleString()}</span>
          </div>
          <div className="pt-2 border-t border-border">
            <p className="text-[10px] uppercase text-muted mb-1">Contract</p>
            <div className="flex items-center gap-2">
              <code className="text-[11px] text-primary/90 break-all flex-1">
                {APP_CONFIG.contractAddress}
              </code>
              <button
                type="button"
                onClick={copyContract}
                className="shrink-0 rounded-lg border border-primary/30 p-2 text-primary hover:bg-primary/10"
                aria-label="Copy contract"
              >
                <Copy size={14} />
              </button>
            </div>
          </div>
        </div>

        <label className="block">
          <span className="text-xs text-muted mb-1.5 block">Demo amount to receive</span>
          <input
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-white outline-none focus:border-primary/50"
          />
        </label>

        <div className="grid grid-cols-3 gap-2">
          {[100, 500, 1000].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setAmount(String(n))}
              className="rounded-lg border border-border py-2 text-xs text-muted hover:border-primary/40 hover:text-primary"
            >
              {n}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={getTokens}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-bold text-void"
        >
          <Coins size={16} /> {wallet ? 'Receive Demo Tokens' : 'Connect & Get Tokens'}
        </button>

        <button
          type="button"
          onClick={() =>
            toast('Live DEX swap will open here after token launch', 'info')
          }
          className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 py-2.5 text-sm text-primary"
        >
          <ExternalLink size={14} /> Open DEX (soon)
        </button>
      </div>
    </Modal>
  )
}

function StakeModal({
  open,
  onClose,
  wallet,
  balance,
  staked,
  stakeTokens,
  unstakeTokens,
  connectWallet,
}) {
  const [amount, setAmount] = useState('100')
  const [mode, setMode] = useState('stake')

  const submit = async () => {
    if (!wallet) {
      await connectWallet()
    }
    const ok =
      mode === 'stake'
        ? stakeTokens(amount, { skipWalletCheck: true })
        : unstakeTokens(amount)
    if (ok) onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Stake $MAGAHOOD">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2 p-1 rounded-full bg-surface border border-border">
          {['stake', 'unstake'].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`rounded-full py-2 text-xs font-semibold capitalize ${
                mode === m ? 'bg-primary text-void' : 'text-muted'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
        <div className="flex justify-between text-xs text-muted">
          <span>Balance: {balance.toLocaleString()}</span>
          <span>Staked: {staked.toLocaleString()}</span>
        </div>
        <input
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-white outline-none focus:border-primary/50"
        />
        <button
          type="button"
          onClick={submit}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-bold text-void"
        >
          {mode === 'stake' ? <Lock size={16} /> : <Unlock size={16} />}
          {mode === 'stake' ? 'Stake tokens' : 'Unstake tokens'}
        </button>
        <p className="text-xs text-muted text-center">
          Staking increases governance vote power and citizenship rewards (demo).
        </p>
      </div>
    </Modal>
  )
}

function CityModal({ open, onClose, city, joinCity, joined }) {
  if (!city) return null
  return (
    <Modal open={open} onClose={onClose} title={city.name}>
      <div className="space-y-4">
        <p className="text-sm text-muted leading-relaxed">{city.desc}</p>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl border border-border bg-surface p-3">
            <p className="text-[10px] text-muted uppercase">Members</p>
            <p className="text-primary font-bold">{city.members?.toLocaleString()}</p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-3">
            <p className="text-[10px] text-muted uppercase">Focus</p>
            <p className="text-white text-xs font-medium">{city.focus}</p>
          </div>
        </div>
        {joined ? (
          <div className="rounded-xl border border-primary/30 bg-primary/10 py-3 text-center text-sm text-primary font-semibold">
            You are a member
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              if (joinCity(city.id)) onClose()
            }}
            className="w-full rounded-full bg-primary py-3 text-sm font-bold text-void"
          >
            Join {city.name}
          </button>
        )}
      </div>
    </Modal>
  )
}

function ListingModal({ open, onClose, listing, purchaseListing, owned, balance }) {
  if (!listing) return null
  return (
    <Modal open={open} onClose={onClose} title={listing.title}>
      <div className="space-y-4">
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
          <p className="text-[10px] uppercase text-primary mb-1">{listing.tag}</p>
          <p className="text-2xl font-bold text-white">
            {listing.price} <span className="text-primary text-base">$MAGAHOOD</span>
          </p>
          <p className="text-xs text-muted mt-2">Seller: {listing.seller}</p>
        </div>
        <p className="text-xs text-muted">Your balance: {balance.toLocaleString()} $MAGAHOOD</p>
        {owned ? (
          <div className="rounded-xl border border-primary/30 bg-primary/10 py-3 text-center text-sm text-primary font-semibold">
            Owned in your inventory
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              if (purchaseListing(listing)) onClose()
            }}
            className="w-full rounded-full bg-primary py-3 text-sm font-bold text-void"
          >
            Buy with $MAGAHOOD
          </button>
        )}
      </div>
    </Modal>
  )
}

function CreateCityModal({ open, onClose, toast, wallet, citizen, connectWallet }) {
  const [name, setName] = useState('')
  const [vision, setVision] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    if (!wallet) {
      await connectWallet()
      return
    }
    if (!citizen) {
      toast('Claim citizenship before proposing a city', 'info')
      return
    }
    if (!name.trim()) {
      toast('City name required', 'error')
      return
    }
    toast(`City proposal “${name.trim()}” submitted to governance (demo)`, 'success')
    setName('')
    setVision('')
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Propose a New City">
      <form onSubmit={submit} className="space-y-4">
        <p className="text-sm text-muted">
          Launch a community city proposal. Citizens and governors will vote on new territories.
        </p>
        <label className="block">
          <span className="text-xs text-muted mb-1.5 block">City name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. DeFi City"
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-white outline-none focus:border-primary/50"
          />
        </label>
        <label className="block">
          <span className="text-xs text-muted mb-1.5 block">Vision</span>
          <textarea
            value={vision}
            onChange={(e) => setVision(e.target.value)}
            rows={3}
            placeholder="What economy will this city run?"
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-white outline-none focus:border-primary/50 resize-none"
          />
        </label>
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-bold text-void"
        >
          <Building2 size={16} /> Submit proposal
        </button>
      </form>
    </Modal>
  )
}
