import Link from "next/link";
import { Check, Sparkles, Rocket, X } from "lucide-react";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "",
    description: "Perfect for exploring what's possible",
    cta: "Generate Free Kit",
    ctaHref: "/generate",
    highlight: false,
    features: [
      { text: "1 launch kit generation", included: true },
      { text: "All 6 sections included", included: true },
      { text: "Copy & share results", included: true },
      { text: "Shareable link", included: true },
      { text: "Detailed tokenomics analysis", included: false },
      { text: "PDF export", included: false },
      { text: "Custom branding", included: false },
      { text: "Priority generation", included: false },
    ],
  },
  {
    name: "Premium",
    price: "$49",
    period: "one-time",
    description: "For serious builders ready to launch",
    cta: "Get Premium Kit",
    ctaHref: "#",
    highlight: true,
    features: [
      { text: "Unlimited kit generations", included: true },
      { text: "All 6 sections — extra detail", included: true },
      { text: "Copy & share results", included: true },
      { text: "Shareable link", included: true },
      { text: "Detailed tokenomics analysis", included: true },
      { text: "PDF export", included: true },
      { text: "Custom branding on exports", included: true },
      { text: "Priority generation (faster)", included: true },
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen py-20 sm:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-base-blue/10 border border-base-blue/20 text-base-blue text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Simple Pricing
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            Choose your <span className="gradient-text">launch plan</span>
          </h1>
          <p className="text-lg text-base-gray-light max-w-xl mx-auto">
            Start free. Upgrade when you&apos;re ready to go deeper.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 ${
                plan.highlight
                  ? "bg-gradient-to-b from-base-blue/10 to-base-dark-1 border-2 border-base-blue/30 shadow-xl shadow-base-blue/10"
                  : "bg-base-dark-1 border border-base-dark-3"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-base-blue text-white text-xs font-bold rounded-full uppercase tracking-wider">
                    Recommended
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm text-base-gray">{plan.description}</p>
              </div>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-bold text-white">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-base-gray text-sm">
                    /{plan.period}
                  </span>
                )}
              </div>

              {plan.ctaHref === "#" ? (
                <button
                  disabled
                  className={`w-full py-3 px-6 rounded-xl font-medium text-sm transition-all mb-8 ${
                    plan.highlight
                      ? "bg-base-blue/50 text-white/50 cursor-not-allowed"
                      : "bg-base-dark-3 text-base-gray cursor-not-allowed"
                  }`}
                >
                  Coming Soon
                </button>
              ) : (
                <Link
                  href={plan.ctaHref}
                  className={`block w-full py-3 px-6 rounded-xl font-medium text-sm text-center transition-all mb-8 ${
                    plan.highlight
                      ? "bg-base-blue hover:bg-base-blue-light text-white hover:shadow-lg hover:shadow-base-blue/25"
                      : "bg-white text-base-black hover:bg-gray-100"
                  }`}
                >
                  {plan.cta}
                </Link>
              )}

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature.text}
                    className="flex items-start gap-3 text-sm"
                  >
                    {feature.included ? (
                      <Check className="w-4 h-4 text-base-blue mt-0.5 shrink-0" />
                    ) : (
                      <X className="w-4 h-4 text-base-dark-3 mt-0.5 shrink-0" />
                    )}
                    <span
                      className={
                        feature.included
                          ? "text-base-gray-light"
                          : "text-base-gray/50"
                      }
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Sonarbot CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 bg-base-dark-1 rounded-2xl border border-base-dark-3">
            <Rocket className="w-10 h-10 text-base-blue mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              Already launched?
            </h3>
            <p className="text-base-gray mb-6 max-w-md">
              List your project on Sonarbot to get discovered by the Base
              community.
            </p>
            <a
              href="https://www.sonarbot.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-base-black font-medium rounded-xl hover:bg-gray-100 transition-all"
            >
              <Rocket className="w-4 h-4" />
              List on Sonarbot
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
