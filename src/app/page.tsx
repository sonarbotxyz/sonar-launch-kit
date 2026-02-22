import Link from "next/link";

const SECTIONS = [
  {
    title: "Tokenomics Framework",
    preview:
      "Total Supply: 100,000,000 $SNR\n\nDistribution:\n- Community & Airdrops: 40%\n- Liquidity: 20%\n- Team (4yr vest, 1yr cliff): 15%\n- Treasury: 15%\n- Advisors: 5%\n- Public Sale: 5%\n\nUtility: Promoted listings, governance voting, staking rewards...",
  },
  {
    title: "LP Strategy",
    preview:
      "Aerodrome (Primary):\n- Volatile pool: SNR/WETH\n- Initial: $5,000 SNR + $5,000 ETH\n- veAERO voting: lock 10k AERO for emissions\n\nUniswap v3:\n- Fee tier: 1% (new token)\n- Range: full range first 2 weeks\n- Rebalance at ±30% deviation...",
  },
  {
    title: "Community Playbook",
    preview:
      "Week 1 — Foundation:\n- Set up Discord with roles: Builder, OG, Mod\n- Launch X account, pin thread\n- Target: 200 Discord, 500 X followers\n\nWeek 2 — Growth:\n- AMA with Base ecosystem builder\n- Meme contest: $500 in SNR prizes\n- Target: 500 Discord, 1.5k X...",
  },
  {
    title: "X Launch Thread",
    preview:
      '1/ We built the thing nobody asked for but everyone needed.\n\n@sonarbot_xyz is the first launchpad built specifically for AI agents on Base.\n\nHere\'s why it matters 🧵\n\n2/ The problem: there are 500+ AI agents on Base. Zero discovery layer...',
  },
  {
    title: "Launch Checklist",
    preview:
      "Smart Contract:\n[ ] Deploy to Base mainnet\n[ ] Verify on Basescan\n[ ] Multisig ownership transfer\n[ ] Emergency pause tested\n\nLiquidity:\n[ ] Aerodrome pool created\n[ ] Initial LP deposited\n[ ] LP tokens locked 6 months...",
  },
  {
    title: "Content Calendar",
    preview:
      "Day 1 (Mon) — X Thread: \"What we're building\"\nDay 2 (Tue) — Discord: Welcome message + rules\nDay 3 (Wed) — X Post: Problem statement meme\nDay 4 (Thu) — Blog: Deep dive on tokenomics\nDay 5 (Fri) — X Thread: Team intro...",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <div className="relative max-w-3xl mx-auto px-6 pt-24 sm:pt-32 pb-20">
        {/* Subtle glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[500px] -translate-x-1/2 rounded-full bg-base-blue/6 blur-[100px]" />

        <div className="relative">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Ship your Base launch in 24 hours
          </h1>
          <p className="mt-4 text-lg text-base-gray-light max-w-xl">
            Answer 10 questions. Get a full launch package: tokenomics, LP
            strategy, community playbook, X thread, and launch checklist.
          </p>

          {/* Pricing */}
          <div className="mt-6 flex items-center gap-4 text-sm">
            <span className="text-base-gray">Free preview</span>
            <span className="text-base-dark-3">·</span>
            <span className="text-white font-medium">
              Full kit $49 in USDC
            </span>
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/generate"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-base-blue hover:bg-base-blue-light text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-base-blue/20"
            >
              Generate Your Kit
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <a
              href="https://www.sonarbot.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-base-dark-3 text-base-gray-light hover:text-white hover:border-base-gray/50 rounded-xl transition-all"
            >
              List on Sonarbot after launch &rarr;
            </a>
          </div>

          {/* What's Included — Accordion Previews */}
          <div className="mt-16">
            <h2 className="text-sm font-medium uppercase tracking-wider text-base-gray mb-4">
              What&apos;s in the kit
            </h2>
            <div className="space-y-2">
              {SECTIONS.map((section) => (
                <Accordion
                  key={section.title}
                  title={section.title}
                  preview={section.preview}
                />
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-20 text-center text-sm text-base-gray">
            by{" "}
            <a
              href="https://twitter.com/0xsonarbot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base-gray-light hover:text-white transition-colors"
            >
              @0xsonarbot
            </a>{" "}
            on Base
          </div>
        </div>
      </div>
    </div>
  );
}

function Accordion({ title, preview }: { title: string; preview: string }) {
  return (
    <details className="group rounded-xl border border-base-dark-3 bg-base-dark-1">
      <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-white select-none">
        {title}
        <svg
          className="h-4 w-4 text-base-gray transition-transform group-open:rotate-180"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </summary>
      <div className="px-5 pb-4">
        <pre className="whitespace-pre-wrap text-xs leading-relaxed text-base-gray-light font-mono">
          {preview}
        </pre>
      </div>
    </details>
  );
}
