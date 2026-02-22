import Link from "next/link";
import {
  Rocket,
  Coins,
  Droplets,
  Users,
  CheckSquare,
  Twitter,
  Calendar,
  ArrowRight,
  Zap,
  Shield,
  Clock,
} from "lucide-react";

const FEATURES = [
  {
    icon: Coins,
    title: "Tokenomics Framework",
    desc: "Token distribution, vesting schedules, and utility design tailored to your project",
  },
  {
    icon: Droplets,
    title: "LP Strategy",
    desc: "Aerodrome & Uniswap v3 liquidity provisioning plan with risk management",
  },
  {
    icon: Users,
    title: "Community Playbook",
    desc: "30-day growth strategy with weekly milestones and engagement tactics",
  },
  {
    icon: CheckSquare,
    title: "Launch Checklist",
    desc: "20-item comprehensive checklist covering smart contracts to marketing",
  },
  {
    icon: Twitter,
    title: "X Thread Template",
    desc: "10-tweet viral launch thread ready to customize and post",
  },
  {
    icon: Calendar,
    title: "Content Calendar",
    desc: "Full month of daily content mapped across platforms with posting times",
  },
];

const STEPS = [
  { num: "01", title: "Answer 10 Questions", desc: "Tell us about your project, token, and goals" },
  { num: "02", title: "AI Generates Your Kit", desc: "Claude crafts a comprehensive launch strategy" },
  { num: "03", title: "Launch with Confidence", desc: "Execute your plan and ship on Base" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-base-blue/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-base-blue/10 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 sm:pt-32 sm:pb-28">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-base-blue/10 border border-base-blue/20 text-base-blue text-sm font-medium mb-8 animate-fade-in">
              <Zap className="w-4 h-4" />
              Built for the Base Ecosystem
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight animate-slide-up">
              Launch on Base
              <br />
              <span className="gradient-text">in 24 hours</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-base-gray-light max-w-2xl mx-auto animate-slide-up">
              Answer 10 questions, get a complete builder launch kit.
              Tokenomics, LP strategy, community playbook, launch timeline,
              and social kit — all generated in minutes.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
              <Link
                href="/generate"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-base-blue hover:bg-base-blue-light text-white font-semibold rounded-xl transition-all hover:shadow-xl hover:shadow-base-blue/25 hover:scale-[1.02]"
              >
                Generate Your Kit
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border border-base-dark-3 hover:border-base-gray/50 text-base-gray-light hover:text-white rounded-xl transition-all"
              >
                View Pricing
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-base-gray">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-base-blue" />
                <span>No signup required</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-base-blue" />
                <span>Ready in 2 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Rocket className="w-4 h-4 text-base-blue" />
                <span>First kit free</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 sm:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Everything you need to{" "}
              <span className="gradient-text">ship</span>
            </h2>
            <p className="mt-4 text-base-gray-light text-lg max-w-2xl mx-auto">
              Your launch kit includes six comprehensive documents, each
              tailored to your project and the Base ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group p-6 bg-base-dark-1 rounded-xl border border-base-dark-3 hover:border-base-blue/30 transition-all hover:shadow-lg hover:shadow-base-blue/5"
                >
                  <div className="w-12 h-12 rounded-lg bg-base-blue/10 flex items-center justify-center mb-4 group-hover:bg-base-blue/20 transition-colors">
                    <Icon className="w-6 h-6 text-base-blue" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-base-gray leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 sm:py-28 bg-base-dark-1/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Three steps to{" "}
              <span className="gradient-text">launch</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <div key={step.num} className="relative">
                <div className="text-6xl font-bold text-base-dark-3 mb-4">
                  {step.num}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-base-gray">{step.desc}</p>
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-8 right-0 translate-x-1/2">
                    <ArrowRight className="w-6 h-6 text-base-dark-3" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 px-8 py-4 bg-base-blue hover:bg-base-blue-light text-white font-semibold rounded-xl transition-all hover:shadow-xl hover:shadow-base-blue/25"
            >
              Start Building Your Kit
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-8 sm:p-12 bg-gradient-to-br from-base-blue/10 to-base-dark-1 rounded-2xl border border-base-blue/20">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to launch?
            </h2>
            <p className="text-base-gray-light text-lg mb-8 max-w-xl mx-auto">
              Already have a project on Base? List it on Sonarbot to get
              discovered by the community.
            </p>
            <a
              href="https://www.sonarbot.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-base-black font-semibold rounded-xl hover:bg-gray-100 transition-all"
            >
              <Rocket className="w-5 h-5" />
              List on Sonarbot
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
