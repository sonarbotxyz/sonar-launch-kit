"use client";

import { useState } from "react";

export default function Page() {
  const [openStates, setOpenStates] = useState<boolean[]>([true, false, false, false]);

  const toggleAccordion = (index: number) => {
    setOpenStates((prev) => prev.map((state, i) => (i === index ? !state : state)));
  };

  const sections = [
    {
      title: "Tokenomics Framework",
      preview: `Total Supply: 1,000,000,000
Initial LP: 80% (Locked 12mo)
Team/Contributors: 10% (6mo cliff, 18mo vest)
Marketing/Ecosystem: 10%

Smart Contract: 0/0 tax, immutable, ownership renounced post-launch.`,
    },
    {
      title: "LP Setup on Aerodrome",
      preview: `DEX: Aerodrome Finance (Base)
Pair: TICKER / WETH
Pool Type: Volatile (0.3% fee tier)
Initial Position: 2 WETH + 800M TICKER
Security: LP tokens locked via Team Finance / UNCx`,
    },
    {
      title: "X Launch Thread",
      preview: `1/ Building on Base is fast. Launching properly is hard.
Today, we change that. Introducing $TICKER. 🧵

2/ The problem: [Your specific pain point]
3/ The solution: [Your protocol/token utility]
4/ Tokenomics: Zero tax. Fair launch. Transparent.
5/ Contract + Aerodrome LP: [TBA at launch]`,
    },
    {
      title: "30-Day Playbook",
      preview: `Day -7: Teaser campaign & contract audit publish
Day -3: Tokenomics reveal, contract address published
Day 0: LP live, contract verified, main thread posted
Day +7: First partnership announcement + community AMA
Day +14: Aerodrome voting incentives established
Day +30: Roadmap V2 + contributor rewards`,
    },
  ];

  return (
    <div className="min-h-screen bg-[#080810] text-gray-300 font-sans selection:bg-[#0052FF] selection:text-white flex flex-col">
      <main className="flex-grow flex flex-col items-center px-6 py-24 w-full max-w-4xl mx-auto">
        <div className="text-center mb-20 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#0052FF]/30 bg-[#0052FF]/5 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-[#0052FF]" />
            <span className="font-mono text-xs text-[#0052FF] uppercase tracking-wide">Powered by Gemini 3.1 Pro</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-8">
            Your Base launch.<br />
            <span className="text-gray-400">Engineered, not improvised.</span>
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Answer 10 questions. Get tokenomics, LP strategy, community playbook, X launch thread, and 30-day calendar.
          </p>
        </div>

        <div className="w-full mb-24 flex flex-col gap-3">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-widest mb-4 px-2">Example Kit Output</p>
          {sections.map((section, index) => (
            <div key={index} className="bg-[#0d0d16] border border-white/5 rounded-xl overflow-hidden">
              <button onClick={() => toggleAccordion(index)} className="w-full px-6 py-5 flex justify-between items-center hover:bg-white/[0.02] transition-colors">
                <span className="text-white font-medium">{section.title}</span>
                <span className="text-gray-500 text-xl font-light">{openStates[index] ? "−" : "+"}</span>
              </button>
              {openStates[index] && (
                <div className="px-6 pb-6 pt-2 border-t border-white/5">
                  <pre className="text-sm text-gray-400 font-mono whitespace-pre-wrap leading-relaxed">{section.preview}</pre>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mb-16">
          <div className="bg-[#0d0d16] border border-white/5 p-8 rounded-2xl flex flex-col">
            <h3 className="text-white font-medium text-xl mb-2">Preview Kit</h3>
            <div className="text-3xl font-bold text-white mb-4">Free</div>
            <p className="text-sm text-gray-400 mb-8 flex-grow">Basic tokenomics validation and standard templates.</p>
            <ul className="text-sm text-gray-500 space-y-3">
              <li className="flex items-center gap-2"><span className="text-gray-400">✓</span> Basic token breakdown</li>
              <li className="flex items-center gap-2"><span className="text-gray-400">✓</span> Standard thread outline</li>
            </ul>
          </div>
          <div className="bg-[#0d0d16] border border-[#0052FF]/30 p-8 rounded-2xl flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#0052FF]/10 text-[#0052FF] text-xs font-bold px-3 py-1 rounded-bl-lg">RECOMMENDED</div>
            <h3 className="text-white font-medium text-xl mb-2">Full Kit</h3>
            <div className="text-3xl font-bold text-white mb-1">$49 <span className="text-lg text-gray-500 font-normal">USDC</span></div>
            <div className="text-xs text-gray-600 font-mono mb-4">via x402 · pay on Base</div>
            <p className="text-sm text-gray-400 mb-8 flex-grow">Complete strategy. Custom LP params, bespoke copy, strict launch timeline.</p>
            <ul className="text-sm text-gray-300 space-y-3">
              <li className="flex items-center gap-2"><span className="text-[#0052FF]">✓</span> Custom LP sizing & tick math</li>
              <li className="flex items-center gap-2"><span className="text-[#0052FF]">✓</span> 30-day actionable playbook</li>
              <li className="flex items-center gap-2"><span className="text-[#0052FF]">✓</span> Ready-to-post X copy</li>
              <li className="flex items-center gap-2"><span className="text-[#0052FF]">✓</span> PDF export</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6">
          <a href="/generate" className="bg-[#0052FF] hover:bg-[#0040D0] text-white px-10 py-4 rounded-full font-medium transition-all shadow-lg shadow-[#0052FF]/20 flex items-center gap-2">
            Start your launch kit →
          </a>
          <a href="https://www.sonarbot.xyz" target="_blank" rel="noreferrer" className="text-sm text-gray-500 hover:text-white transition-colors underline decoration-white/20 underline-offset-4">
            List your project on Sonarbot after launch →
          </a>
        </div>
      </main>

      <footer className="py-8 text-center border-t border-white/5">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <span>by @0xsonarbot on Base</span>
          <div className="w-2 h-2 rounded-full bg-[#0052FF] shadow-[0_0_8px_#0052FF]" />
        </div>
      </footer>
    </div>
  );
}
