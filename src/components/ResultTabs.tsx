"use client";

import { useState, useMemo } from "react";
import DOMPurify from "dompurify";
import {
  Coins,
  Droplets,
  Users,
  CheckSquare,
  Twitter,
  Calendar,
} from "lucide-react";
import CopyButton from "./CopyButton";

const TAB_CONFIG = [
  { key: "tokenomics", label: "Tokenomics", icon: Coins },
  { key: "lp_strategy", label: "LP Strategy", icon: Droplets },
  { key: "community_playbook", label: "Community", icon: Users },
  { key: "launch_checklist", label: "Checklist", icon: CheckSquare },
  { key: "twitter_thread", label: "X Thread", icon: Twitter },
  { key: "content_calendar", label: "Calendar", icon: Calendar },
];

interface ResultTabsProps {
  sections: Record<string, string>;
  isStreaming?: boolean;
}

export default function ResultTabs({
  sections,
  isStreaming = false,
}: ResultTabsProps) {
  const [activeTab, setActiveTab] = useState("tokenomics");

  const availableTabs = TAB_CONFIG.filter(
    (tab) => sections[tab.key] && sections[tab.key].trim().length > 0
  );

  const currentContent = sections[activeTab] || "";

  const sanitizedHtml = useMemo(() => {
    if (!currentContent) return "";
    const rawHtml = markdownToHtml(currentContent);
    return DOMPurify.sanitize(rawHtml, {
      ALLOWED_TAGS: [
        "h1", "h2", "h3", "h4", "p", "ul", "ol", "li", "strong", "em",
        "code", "pre", "blockquote", "hr", "table", "thead", "tbody",
        "tr", "th", "td", "br", "span",
      ],
      ALLOWED_ATTR: ["class"],
    });
  }, [currentContent]);

  return (
    <div className="w-full">
      {/* Tab navigation */}
      <div className="flex overflow-x-auto gap-1 p-1 bg-base-dark-1 rounded-xl mb-6 scrollbar-hide">
        {TAB_CONFIG.map((tab) => {
          const isAvailable = sections[tab.key]?.trim().length > 0;
          const isActive = activeTab === tab.key;
          const Icon = tab.icon;

          return (
            <button
              key={tab.key}
              onClick={() => isAvailable && setActiveTab(tab.key)}
              disabled={!isAvailable}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                isActive
                  ? "bg-base-blue text-white shadow-lg shadow-base-blue/25"
                  : isAvailable
                  ? "text-base-gray-light hover:text-white hover:bg-base-dark-3"
                  : "text-base-dark-3 cursor-not-allowed"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="bg-base-dark-1 rounded-xl border border-base-dark-3">
        <div className="flex items-center justify-between px-6 py-4 border-b border-base-dark-3">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-white">
              {TAB_CONFIG.find((t) => t.key === activeTab)?.label}
            </h3>
            {isStreaming && activeTab === availableTabs[availableTabs.length - 1]?.key && (
              <span className="flex items-center gap-1 text-xs text-base-blue">
                <span className="w-1.5 h-1.5 bg-base-blue rounded-full animate-pulse" />
                Generating...
              </span>
            )}
          </div>
          {currentContent && <CopyButton text={currentContent} />}
        </div>

        <div className="p-6 prose-kit min-h-[400px] max-h-[600px] overflow-y-auto tab-content">
          {sanitizedHtml ? (
            <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
          ) : (
            <div className="flex items-center justify-center h-[400px] text-base-gray">
              {isStreaming ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-base-blue rounded-full animate-bounce [animation-delay:0ms]" />
                    <div className="w-2 h-2 bg-base-blue rounded-full animate-bounce [animation-delay:150ms]" />
                    <div className="w-2 h-2 bg-base-blue rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                  <span className="text-sm">Generating this section...</span>
                </div>
              ) : (
                <span className="text-sm">
                  This section will be generated shortly.
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function markdownToHtml(md: string): string {
  const html = md
    // Headers
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    // Bold and italic
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Code blocks
    .replace(/```[\w]*\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    // Inline code
    .replace(/`(.*?)`/g, '<code>$1</code>')
    // Blockquotes
    .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
    // Horizontal rules
    .replace(/^---$/gm, '<hr>')
    // Checkboxes
    .replace(/^- \[x\] (.*$)/gm, '<li>&#9745; $1</li>')
    .replace(/^- \[ \] (.*$)/gm, '<li>&#9744; $1</li>')
    // Unordered lists
    .replace(/^[\-\*] (.*$)/gm, '<li>$1</li>')
    // Ordered lists
    .replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
    // Tables
    .replace(/^\|(.+)\|$/gm, (match) => {
      const cells = match
        .split("|")
        .filter((c) => c.trim())
        .map((c) => c.trim());
      if (cells.every((c) => /^[-:]+$/.test(c))) return "";
      const tag = "td";
      return `<tr>${cells.map((c) => `<${tag}>${c}</${tag}>`).join("")}</tr>`;
    })
    // Wrap consecutive <li> in <ul>
    .replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>')
    // Wrap consecutive <tr> in <table>
    .replace(/((?:<tr>.*<\/tr>\n?)+)/g, '<table>$1</table>')
    // Paragraphs (lines that aren't already wrapped)
    .replace(/^(?!<[a-z])((?!<\/)[^\n]+)$/gm, '<p>$1</p>')
    // Clean up empty paragraphs
    .replace(/<p>\s*<\/p>/g, '')
    // Line breaks
    .replace(/\n\n/g, "");

  return html;
}
