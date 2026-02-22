import Link from "next/link";
import { Rocket } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-base-dark-3 bg-base-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-base-blue flex items-center justify-center">
                <Rocket className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Sonar<span className="text-base-blue">Launch</span>
              </span>
            </div>
            <p className="text-sm text-base-gray max-w-xs">
              AI-powered launch kit generator for Base ecosystem projects.
              Everything you need to launch in 24 hours.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Product
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/generate"
                  className="text-sm text-base-gray hover:text-white transition-colors"
                >
                  Generate Kit
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-base-gray hover:text-white transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <a
                  href="https://www.sonarbot.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-base-gray hover:text-white transition-colors"
                >
                  List on Sonarbot
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Ecosystem
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://base.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-base-gray hover:text-white transition-colors"
                >
                  Base
                </a>
              </li>
              <li>
                <a
                  href="https://aerodrome.finance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-base-gray hover:text-white transition-colors"
                >
                  Aerodrome
                </a>
              </li>
              <li>
                <a
                  href="https://app.uniswap.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-base-gray hover:text-white transition-colors"
                >
                  Uniswap
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-base-dark-3 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-base-gray">
            &copy; {new Date().getFullYear()} SonarLaunch. Built for the Base
            ecosystem.
          </p>
          <p className="text-xs text-base-gray">
            Powered by{" "}
            <a
              href="https://www.sonarbot.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base-blue hover:text-base-blue-light transition-colors"
            >
              Sonarbot
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
