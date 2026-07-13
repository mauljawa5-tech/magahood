/** Site-wide config — update social URLs when official channels go live */
export const APP_CONFIG = {
  name: 'MAGAHOOD',
  ticker: '$MAGAHOOD',
  network: 'Robinhood Chain',
  chainId: 4663,
  totalSupply: '1,000,000,000',
  /** Placeholder contract — replace after deploy */
  contractAddress: '0xMAGAHOOD0000000000000000000000000000DEMO',
  /** App features use local demo $MAGAHOOD until token is deployed */
  demoTokenMode: true,
  social: {
    twitter: 'https://x.com/magahood',
    telegram: 'https://t.me/magahood',
    discord: 'https://discord.gg/magahood',
  },
  buyLinks: {
    // Demo placeholders — wire real DEX when live
    swap: null,
    chart: null,
  },
}

export const CITIES = [
  {
    id: 'creator',
    icon: 'Palette',
    name: 'Creator City',
    desc: 'NFT launches, content studios, and independent creator businesses.',
    members: 12840,
    focus: 'NFTs · Content · Brands',
  },
  {
    id: 'gaming',
    icon: 'Gamepad2',
    name: 'Gaming City',
    desc: 'Play-to-own worlds, tournaments, and player-driven economies.',
    members: 9420,
    focus: 'Games · P2E · Esports',
  },
  {
    id: 'ai',
    icon: 'Cpu',
    name: 'AI Research City',
    desc: 'Agent labs, automation markets, and open AI experiments.',
    members: 7650,
    focus: 'Agents · Automation · R&D',
  },
  {
    id: 'investor',
    icon: 'LineChart',
    name: 'Investor City',
    desc: 'Deal flow, DAO funds, and on-chain treasury coordination.',
    members: 5210,
    focus: 'Funds · Deals · Treasury',
  },
  {
    id: 'builder',
    icon: 'Hammer',
    name: 'Builder City',
    desc: 'Dev hubs, hackathons, and infrastructure for the digital nation.',
    members: 6890,
    focus: 'Dev · Infra · Hackathons',
  },
]

export const MARKET_LISTINGS = [
  {
    id: 'nft-1',
    category: 'nfts',
    title: 'Citizen Passport #08421',
    price: 250,
    seller: '0x7a…c2f1',
    tag: 'Identity',
  },
  {
    id: 'nft-2',
    category: 'nfts',
    title: 'Nation Genesis Badge',
    price: 120,
    seller: '0x3b…91aa',
    tag: 'Collectible',
  },
  {
    id: 'product-1',
    category: 'products',
    title: 'City Branding Pack',
    price: 45,
    seller: 'CreatorHub',
    tag: 'Digital Product',
  },
  {
    id: 'agent-1',
    category: 'agents',
    title: 'Market Scout AI',
    price: 180,
    seller: 'AgentLabs',
    tag: 'AI Agent',
  },
  {
    id: 'agent-2',
    category: 'agents',
    title: 'Community Mod Bot',
    price: 95,
    seller: 'CityOps',
    tag: 'AI Agent',
  },
  {
    id: 'land-1',
    category: 'land',
    title: 'Creator Plaza Plot A-12',
    price: 1500,
    seller: 'LandDAO',
    tag: 'Land',
  },
  {
    id: 'asset-1',
    category: 'assets',
    title: 'Event Stage Module',
    price: 75,
    seller: '0x9e…44b0',
    tag: 'Virtual Asset',
  },
  {
    id: 'academy-1',
    category: 'academy',
    title: 'Web3 Builder Path',
    price: 30,
    seller: 'Academy',
    tag: 'Course',
  },
]

export const PROPOSALS = [
  {
    id: 'prop-1',
    title: 'Fund AI Citizen Network Phase 1',
    category: 'Ecosystem Development',
    description:
      'Allocate 2% of treasury toward AI agent infrastructure, marketplace listings, and personal assistant pilots.',
    forVotes: 68,
    againstVotes: 22,
    abstainVotes: 10,
    endsIn: '3 days',
    status: 'active',
  },
  {
    id: 'prop-2',
    title: 'Open New Gaming City District',
    category: 'New Digital Cities',
    description:
      'Approve a new gaming territory with tournament rewards funded from Community Growth allocation.',
    forVotes: 54,
    againstVotes: 31,
    abstainVotes: 15,
    endsIn: '5 days',
    status: 'active',
  },
  {
    id: 'prop-3',
    title: 'Academy Reward Boost Q3',
    category: 'Treasury Usage',
    description:
      'Increase MAGAHOOD Academy completion rewards by 20% for the next quarter to drive onboarding.',
    forVotes: 81,
    againstVotes: 12,
    abstainVotes: 7,
    endsIn: '1 day',
    status: 'active',
  },
]

export function shortAddress(addr) {
  if (!addr) return ''
  if (addr.length < 12) return addr
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`
}

export function generateDemoWallet() {
  const hex = '0123456789abcdef'
  let a = '0x'
  for (let i = 0; i < 40; i++) a += hex[Math.floor(Math.random() * 16)]
  return a
}

export function generateCitizenId() {
  return String(Math.floor(10000 + Math.random() * 90000))
}
