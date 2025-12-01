import type { HackathonData, IdeaData } from "./types"

export const sampleHackathonData: HackathonData = {
  title: "ETH Global San Francisco 2024",
  hackathon_name: "ETH Global SF",
  tagline: "Build the future of Ethereum, together",
  description:
    "Join thousands of developers, designers, and innovators for a 36-hour hackathon focused on building the next generation of decentralized applications. This is your chance to collaborate with the best minds in Web3, learn from industry experts, and compete for substantial prizes. Whether you're a seasoned blockchain developer or just getting started, ETH Global SF offers workshops, mentorship, and resources to help you succeed. Build on Ethereum, Layer 2s, and emerging protocols while networking with leading projects and VCs in the ecosystem.",
  platform: "Devpost",
  url: "https://ethglobal.com/sf",
  startDate: "2024-12-13T09:00:00Z",
  endDate: "2024-12-15T17:00:00Z",
  deadline: "2024-12-15T14:00:00Z",
  registrationDeadline: "2024-12-10T23:59:59Z",
  duration: {
    start: "2024-12-13T09:00:00Z",
    end: "2024-12-15T17:00:00Z",
    timezone: "America/Los_Angeles",
  },
  prize_total: "$50,000",
  prizes: [
    { name: "Grand Prize", amount: "$15,000", description: "Best overall project" },
    { name: "Best DeFi Project", amount: "$10,000", description: "Most innovative DeFi solution" },
    { name: "Best NFT/Gaming", amount: "$8,000", description: "Best gaming or NFT project" },
    { name: "Best Social Impact", amount: "$7,000", description: "Project with greatest social impact" },
    { name: "Best Use of Sponsor Tech", amount: "$5,000", description: "Best integration of sponsor APIs" },
  ],
  themes: ["DeFi", "NFTs", "Gaming", "Social Impact", "Infrastructure", "Identity"],
  technologies: ["Solidity", "React", "Next.js", "IPFS", "The Graph", "Chainlink"],
  tags: ["Web3", "Blockchain", "Ethereum", "Layer2", "Smart Contracts"],
  requirements:
    "1. Projects must be started during the hackathon\n2. Teams can have 1-5 members\n3. Must use at least one sponsor technology\n4. Code must be open source on GitHub\n5. Demo video required (max 3 minutes)\n6. Project must be deployed to testnet or mainnet",
  judgingCriteria: {
    criteria: [
      { name: "Innovation", weight: "25%", description: "How novel and creative is the solution?" },
      { name: "Technical Execution", weight: "25%", description: "Code quality, architecture, and implementation" },
      { name: "User Experience", weight: "20%", description: "Design, usability, and overall polish" },
      { name: "Impact Potential", weight: "20%", description: "Real-world applicability and scalability" },
      { name: "Presentation", weight: "10%", description: "Quality of demo and pitch" },
    ],
  },
  judges: [
    "Vitalik Buterin",
    "Hayden Adams",
    "Stani Kulechov",
    "Taylor Monahan",
    "Laura Shin",
    "Robert Leshner",
    "Dan Robinson",
    "Hasu",
  ],
}

export const sampleIdeas: IdeaData[] = [
  {
    title: "ZeroAuth Bridge",
    category: "Identity / Infrastructure",
    description:
      "A cross-chain identity bridge that allows users to prove ownership of assets on Chain A to a dApp on Chain B without revealing their wallet address using Zero-Knowledge proofs.",
    briefDescription: "Cross-chain identity verification using ZK proofs without revealing wallet addresses.",
    mvpDescription:
      "Build a minimal verifier contract, ZK circuit for asset proof generation, and a simple frontend to connect wallet and generate proofs for cross-chain verification.",
    // New backend fields
    feasibilityScore: 65,
    feasibilityBreakdown: {
      technicalComplexity: 75,
      timeToMVP: 55,
      resourceRequirements: 60,
      riskLevel: 70,
    },
    noveltyScore: 88,
    noveltyExplanation:
      "Combines ZK proofs with cross-chain bridging in a unique way that hasn't been widely implemented. The privacy-preserving aspect of not revealing wallet addresses is innovative.",
    // Legacy fields for backward compatibility
    score: 92,
    novelty: "high",
    feasibility: "medium",
    xfactor: "max",
    techStack: ["Circom", "Solidity", "Next.js"],
    mvp: [
      { label: "Core", task: "Write Verifier contract" },
      { label: "Circuit", task: "Generate Proof of Assets" },
      { label: "UI", task: "Connect Wallet & Generate Proof" },
    ],
  },
  {
    title: "CarbonDAO UI",
    category: "Sustainability / DAO",
    description:
      "A gamified dashboard for tracking corporate carbon credits on-chain, utilizing NFT badges for milestones and a voting governance module for credit allocation.",
    briefDescription: "Gamified carbon credit tracking with NFT badges and DAO governance.",
    mvpDescription:
      "Create a dashboard that fetches on-chain carbon credit events, displays reduction charts over time, and implements a basic voting interface for credit allocation decisions.",
    // New backend fields
    feasibilityScore: 78,
    feasibilityBreakdown: {
      technicalComplexity: 45,
      timeToMVP: 80,
      resourceRequirements: 85,
      riskLevel: 30,
    },
    noveltyScore: 72,
    noveltyExplanation:
      "Combines carbon credits with gamification and DAO governance. While individual components exist, the combination creates a unique user experience for sustainability tracking.",
    // Legacy fields for backward compatibility
    score: 88,
    novelty: "medium",
    feasibility: "high",
    xfactor: "high",
    techStack: ["React", "Tailwind", "Graph Protocol"],
    mvp: [
      { label: "Data", task: "Fetch on-chain credit events" },
      { label: "Vis", task: "Chart carbon reduction over time" },
      { label: "Gov", task: "Simple voting interface" },
    ],
  },
]
