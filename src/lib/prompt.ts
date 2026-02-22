export function buildPrompt(answers: Record<string, string>): string {
  const hasToken =
    answers.token_utility &&
    !answers.token_utility.toLowerCase().includes("no token");

  return `You are a Web3 launch strategist specializing in Base L2 ecosystem launches. Generate a comprehensive, actionable launch kit based on the following project details.

PROJECT DETAILS:
- Name: ${answers.project_name}
- Description: ${answers.description}
- Target Audience: ${answers.target_audience}
- Token/Utility: ${answers.token_utility}
- Unique Problem Solved: ${answers.unique_problem}
- Initial Liquidity: ${answers.initial_liquidity}
- Target Launch Date: ${answers.launch_date}
- Current Community: ${answers.community_size}
- Key Differentiator: ${answers.differentiator}
- Revenue Model: ${answers.revenue_model}

Generate the following sections, each separated by the exact delimiter "---SECTION: [section_name]---" on its own line. Use markdown formatting within each section.

${
  hasToken
    ? `---SECTION: tokenomics---
Create a detailed tokenomics framework for ${answers.project_name}:
- Token name and ticker suggestion
- Total supply recommendation (with reasoning)
- Distribution breakdown with percentages: Team, Community/Airdrop, Liquidity, Treasury, Advisors, Public Sale
- Vesting schedule for each allocation
- Token utility mechanics (staking, governance, fee sharing, burns)
- Emission schedule recommendation
- Anti-dump mechanisms
- Supply/demand dynamics analysis
Format as a professional tokenomics document with tables where appropriate.`
    : `---SECTION: tokenomics---
Since ${answers.project_name} is not launching with a token, provide:
- Analysis of when/if a token might make sense in the future
- Alternative incentive mechanisms (points, reputation, access tiers)
- Community ownership models without tokens
- Potential airdrop strategy if token launches later`
}

---SECTION: lp_strategy---
Create LP (Liquidity Provisioning) setup recommendations for Base DEXes:
- Aerodrome Finance strategy:
  - Recommended pool type (volatile vs stable)
  - Initial liquidity deployment plan based on ${answers.initial_liquidity} budget
  - veAERO voting strategy for emissions
  - Bribe strategy recommendations
- Uniswap v3 on Base strategy:
  - Recommended fee tier (0.01%, 0.05%, 0.3%, 1%)
  - Price range recommendations (concentrated vs full range)
  - Rebalancing strategy
- Liquidity bootstrapping approach
- LP incentive program design
- Risk management (IL mitigation, diversification)
- Week-by-week liquidity scaling plan for first month

---SECTION: community_playbook---
Create a 30-day community growth playbook for ${answers.project_name}:
- Week 1: Foundation (Days 1-7)
  - Platform setup checklist (Discord, Telegram, X)
  - Initial content strategy
  - Influencer outreach list criteria
  - Community roles and moderation setup
- Week 2: Growth (Days 8-14)
  - Engagement campaigns
  - AMA schedule
  - Partnership outreach strategy
  - Content creation pipeline
- Week 3: Momentum (Days 15-21)
  - Pre-launch hype building
  - Exclusive access/whitelist strategy
  - Community challenges/quests
  - Cross-promotion tactics
- Week 4: Launch (Days 22-30)
  - Launch day community management plan
  - Post-launch engagement retention
  - Feedback collection system
  - Growth metrics to track
Include specific KPIs for each week based on starting from ${answers.community_size}.

---SECTION: launch_checklist---
Create a comprehensive 20-item launch day checklist for ${answers.project_name} on Base:
Cover these categories:
- Smart Contract (deployment, verification, audits)
- Liquidity (pool creation, initial LP)
- Frontend (dApp live, tested, mobile responsive)
- Security (multisig setup, emergency procedures)
- Marketing (announcements, threads, press)
- Community (Discord/TG prepared, mods briefed)
- Analytics (tracking setup, dashboards)
- Legal (disclaimers, terms)
- Post-launch (monitoring, support, iteration)
Each item should have a clear action and a checkbox format.

---SECTION: twitter_thread---
Create a 10-tweet X (Twitter) launch thread template for ${answers.project_name}:
- Tweet 1: Hook - attention-grabbing announcement
- Tweet 2: Problem statement
- Tweet 3: Solution introduction
- Tweet 4: How it works (simple)
- Tweet 5: Why Base (ecosystem advantages)
- Tweet 6: Key differentiator - ${answers.differentiator}
- Tweet 7: ${hasToken ? "Tokenomics teaser" : "Value proposition deep dive"}
- Tweet 8: Roadmap highlights
- Tweet 9: Community call-to-action
- Tweet 10: Launch details + links
Each tweet should be under 280 characters. Use relevant emojis sparingly. Include placeholder [links] where appropriate. Make it viral-worthy and authentic, not corporate.

---SECTION: content_calendar---
Create a detailed 1-month content calendar for ${answers.project_name}:
For each day, specify:
- Platform (X, Discord, Telegram, Blog)
- Content type (thread, meme, announcement, educational, AMA, poll)
- Topic/theme
- Key message
- Engagement tactic
Organize by weeks with clear themes:
- Week 1: "Introduction & Problem"
- Week 2: "Solution & How It Works"
- Week 3: "Community & Partnerships"
- Week 4: "Launch Week"
Include recommended posting times (UTC) and cross-posting strategy.

IMPORTANT FORMATTING RULES:
- Use markdown headers (##, ###), bold, lists, and tables
- Be specific and actionable — no generic advice
- Tailor everything to ${answers.project_name} and the Base ecosystem
- Reference real Base ecosystem projects and tools (Aerodrome, Uniswap, Warpcast, etc.)
- Include specific numbers, percentages, and timelines
- Make it feel like a premium strategy document from a top-tier Web3 advisory firm`;
}
