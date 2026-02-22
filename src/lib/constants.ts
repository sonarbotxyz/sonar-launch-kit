export const QUESTIONS = [
  {
    id: "project_name",
    question: "What's your project name?",
    placeholder: "e.g., BaseFi, Onchain Labs, Degenswap",
    type: "text" as const,
  },
  {
    id: "description",
    question: "What does it do? (2-3 sentences)",
    placeholder:
      "Describe your project's core functionality and value proposition...",
    type: "textarea" as const,
  },
  {
    id: "target_audience",
    question: "Who is it for?",
    placeholder:
      "e.g., DeFi traders, NFT collectors, DAOs, developers, retail users...",
    type: "text" as const,
  },
  {
    id: "token_utility",
    question: "Token or no token? If yes, what's the utility?",
    placeholder:
      "e.g., Governance token for protocol voting and fee sharing, or 'No token planned'",
    type: "textarea" as const,
  },
  {
    id: "unique_problem",
    question: "What problem does it solve uniquely?",
    placeholder:
      "What makes your solution different from existing alternatives?",
    type: "textarea" as const,
  },
  {
    id: "initial_liquidity",
    question: "Planned initial liquidity (in USD)",
    placeholder: "e.g., $10,000, $50,000, $100,000",
    type: "text" as const,
  },
  {
    id: "launch_date",
    question: "Target launch date",
    placeholder: "e.g., March 2026, Q2 2026, ASAP",
    type: "text" as const,
  },
  {
    id: "community_size",
    question: "Existing community size (Discord/Telegram/X followers)",
    placeholder: "e.g., 500 Discord, 1.2k X followers, starting from zero",
    type: "text" as const,
  },
  {
    id: "differentiator",
    question: "Main differentiator vs competitors",
    placeholder:
      "What's your unfair advantage? Tech, team, community, timing?",
    type: "textarea" as const,
  },
  {
    id: "revenue_model",
    question: "Revenue model",
    placeholder:
      "e.g., Trading fees, subscription, freemium, token appreciation...",
    type: "textarea" as const,
  },
];

export const SECTION_KEYS = [
  "tokenomics",
  "lp_strategy",
  "community_playbook",
  "launch_checklist",
  "twitter_thread",
  "content_calendar",
] as const;

export const SECTION_LABELS: Record<string, string> = {
  tokenomics: "Tokenomics Framework",
  lp_strategy: "LP Strategy",
  community_playbook: "Community Playbook",
  launch_checklist: "Launch Checklist",
  twitter_thread: "X Launch Thread",
  content_calendar: "Content Calendar",
};

export const SECTION_DESCRIPTIONS: Record<string, string> = {
  tokenomics: "Token distribution, vesting, and utility design",
  lp_strategy: "Liquidity provisioning on Aerodrome & Uniswap v3",
  community_playbook: "30-day community growth strategy",
  launch_checklist: "20-item launch day checklist",
  twitter_thread: "10-tweet X launch thread template",
  content_calendar: "1-month content calendar",
};
