"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Twitter,
  Rocket,
  ArrowLeft,
  ExternalLink,
  Loader2,
} from "lucide-react";
import ResultTabs from "@/components/ResultTabs";
import CopyButton from "@/components/CopyButton";
import type { Kit } from "@/lib/supabase";

export default function ResultsPage() {
  const params = useParams();
  const id = params.id as string;
  const [kit, setKit] = useState<Kit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadKit() {
      if (id === "session") {
        // Load from session storage (fallback when Supabase save fails)
        const stored = sessionStorage.getItem("kit-result");
        if (stored) {
          const parsed = JSON.parse(stored);
          setKit({
            id: "session",
            project_name: parsed.project_name,
            answers: parsed.answers,
            sections: parsed.sections,
            is_premium: false,
            created_at: new Date().toISOString(),
          });
        } else {
          setError("No kit data found. Please generate a new kit.");
        }
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/kits/${id}`);
        if (!response.ok) {
          throw new Error("Kit not found");
        }
        const data = await response.json();
        setKit(data);
      } catch {
        setError("This kit could not be found. It may have been deleted.");
      } finally {
        setLoading(false);
      }
    }

    loadKit();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-base-blue animate-spin" />
          <span className="text-base-gray-light">Loading kit...</span>
        </div>
      </div>
    );
  }

  if (error || !kit) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-white mb-3">Kit Not Found</h2>
          <p className="text-base-gray-light mb-6">{error}</p>
          <Link
            href="/generate"
            className="inline-flex items-center gap-2 px-6 py-3 bg-base-blue hover:bg-base-blue-light text-white font-medium rounded-xl transition-all"
          >
            <Rocket className="w-4 h-4" />
            Generate a New Kit
          </Link>
        </div>
      </div>
    );
  }

  const appUrl = typeof window !== "undefined" ? window.location.origin : "";
  const shareUrl = id !== "session" ? `${appUrl}/results/${id}` : "";
  const shareText = `Just generated a complete launch kit for ${kit.project_name} on @base using @soaborbot Launch Kit Generator!`;

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText
  )}${shareUrl ? `&url=${encodeURIComponent(shareUrl)}` : ""}`;

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <Link
              href="/generate"
              className="inline-flex items-center gap-1 text-sm text-base-gray hover:text-white transition-colors mb-3"
            >
              <ArrowLeft className="w-4 h-4" />
              Generate another
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              {kit.project_name}{" "}
              <span className="text-base-blue">Launch Kit</span>
            </h1>
            <p className="text-sm text-base-gray mt-1">
              Generated on{" "}
              {new Date(kit.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {shareUrl && (
              <CopyButton text={shareUrl} className="!px-4 !py-2" />
            )}
            {shareUrl && (
              <a
                href={twitterShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white text-sm font-medium rounded-lg transition-all"
              >
                <Twitter className="w-4 h-4" />
                Share on X
              </a>
            )}
            <a
              href="https://www.sonarbot.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-base-black text-sm font-medium rounded-lg hover:bg-gray-100 transition-all"
            >
              <Rocket className="w-4 h-4" />
              <span className="hidden sm:inline">List on Sonarbot</span>
              <ExternalLink className="w-3 h-3 sm:hidden" />
            </a>
          </div>
        </div>

        {/* Result tabs */}
        <ResultTabs sections={kit.sections} />

        {/* Bottom CTA */}
        <div className="mt-12 p-6 bg-base-dark-1 rounded-xl border border-base-dark-3 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">
              Ready to launch {kit.project_name}?
            </h3>
            <p className="text-sm text-base-gray">
              Get discovered by the Base community on Sonarbot.
            </p>
          </div>
          <a
            href="https://www.sonarbot.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-base-blue hover:bg-base-blue-light text-white font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-base-blue/25"
          >
            <Rocket className="w-4 h-4" />
            List on Sonarbot
          </a>
        </div>
      </div>
    </div>
  );
}
