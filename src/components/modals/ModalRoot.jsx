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
} from 'lucide-react'
import Modal from '../ui/Modal'
import { useApp } from '../../context/AppContext'
import { CITIES, APP_CONFIG } from '../../data/config'
import { LogoMark } from '../Logo'

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
}) {
  const handleConnect = async () => {
    await connectWallet()
  }

  return (
    <Modal open={open} onClose={onClose} title="Wallet">
      {!wallet ? (
        <div className="space-y-5">
          <div className="flex justify-center">
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4">
              <Wallet className="text-primary" size={32} />
            </div>
          </div>
          <p className="text-sm text-muted text-center leading-relaxed">
            Connect a demo wallet on {APP_CONFIG.network} to use citizenship, marketplace,
            staking, and governance. No real funds are used.
          </p>
          <button
            type="button"
            disabled={connecting}
            onClick={handleConnect}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-bold text-void hover:bg-primary-glow disabled:opacity-60"
          >
            {connecting ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Connecting…
              </>
            ) : (
              <>
                <Wallet size={16} /> Connect Demo Wallet
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
            <p className="text-[10px] uppercase tracking-wider text-primary mb-1">Address</p>
            <p className="font-mono text-sm text-white break-all">{wallet}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-surface p-3">
              <p className="text-[10px] text-muted uppercase">Balance</p>
              <p className="text-primary font-bold">{balance.toLocaleString()} MH</p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-3">
              <p className="text-[10px] text-muted uppercase">Staked</p>
              <p className="text-primary font-bold">{staked.toLocaleString()} MH</p>
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
            Reset demo data
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
