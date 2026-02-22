"use client";

import Link from "next/link";
import { Rocket, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-base-blue flex items-center justify-center group-hover:animate-pulse-glow transition-all">
              <Rocket className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white">
              Sonar<span className="text-base-blue">Launch</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/generate"
              className="text-sm text-base-gray-light hover:text-white transition-colors"
            >
              Generate Kit
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-base-gray-light hover:text-white transition-colors"
            >
              Pricing
            </Link>
            <a
              href="https://www.sonarbot.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-base-gray-light hover:text-white transition-colors"
            >
              Sonarbot
            </a>
            <Link
              href="/generate"
              className="px-4 py-2 bg-base-blue hover:bg-base-blue-light text-white text-sm font-medium rounded-lg transition-all hover:shadow-lg hover:shadow-base-blue/25"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-base-dark-3 py-4 animate-fade-in">
            <nav className="flex flex-col gap-3">
              <Link
                href="/generate"
                className="text-sm text-base-gray-light hover:text-white transition-colors py-2"
                onClick={() => setMobileOpen(false)}
              >
                Generate Kit
              </Link>
              <Link
                href="/pricing"
                className="text-sm text-base-gray-light hover:text-white transition-colors py-2"
                onClick={() => setMobileOpen(false)}
              >
                Pricing
              </Link>
              <a
                href="https://www.sonarbot.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-base-gray-light hover:text-white transition-colors py-2"
              >
                Sonarbot
              </a>
              <Link
                href="/generate"
                className="px-4 py-2 bg-base-blue hover:bg-base-blue-light text-white text-sm font-medium rounded-lg transition-all text-center"
                onClick={() => setMobileOpen(false)}
              >
                Get Started
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
