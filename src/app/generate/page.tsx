"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Loader2, Sparkles } from "lucide-react";
import StepIndicator from "@/components/StepIndicator";
import { QUESTIONS } from "@/lib/constants";

export default function GeneratePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentQuestion = QUESTIONS[currentStep];
  const currentAnswer = answers[currentQuestion.id] || "";
  const isLastStep = currentStep === QUESTIONS.length - 1;
  const canProceed = currentAnswer.trim().length > 0;

  const updateAnswer = useCallback(
    (value: string) => {
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    },
    [currentQuestion.id]
  );

  const handleNext = () => {
    if (!canProceed) return;
    if (isLastStep) {
      handleGenerate();
    } else {
      setCurrentStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && currentQuestion.type !== "textarea") {
      e.preventDefault();
      handleNext();
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      // Start streaming generation
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to generate kit");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response stream");

      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value, { stream: true });
      }

      // Parse sections from the full text
      const sections = parseSections(fullText);

      // Save to Supabase
      const saveResponse = await fetch("/api/kits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project_name: answers.project_name,
          answers,
          sections,
        }),
      });

      if (saveResponse.ok) {
        const { id } = await saveResponse.json();
        router.push(`/results/${id}`);
      } else {
        // Still show results even if save fails, using session storage
        sessionStorage.setItem(
          "kit-result",
          JSON.stringify({ project_name: answers.project_name, answers, sections })
        );
        router.push("/results/session");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsGenerating(false);
    }
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="relative w-20 h-20 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full bg-base-blue/20 animate-ping" />
            <div className="relative w-20 h-20 rounded-full bg-base-blue/10 flex items-center justify-center">
              <Loader2 className="w-10 h-10 text-base-blue animate-spin" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">
            Generating your launch kit
          </h2>
          <p className="text-base-gray-light mb-2">
            Building a comprehensive strategy for{" "}
            <span className="text-white font-medium">
              {answers.project_name}
            </span>
          </p>
          <p className="text-sm text-base-gray">
            This usually takes 30-60 seconds...
          </p>

          {error && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-sm text-red-400">{error}</p>
              <button
                onClick={() => {
                  setIsGenerating(false);
                  setError(null);
                }}
                className="mt-2 text-sm text-red-400 underline hover:text-red-300"
              >
                Try again
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Step indicator */}
        <div className="mb-12">
          <StepIndicator
            currentStep={currentStep}
            totalSteps={QUESTIONS.length}
          />
        </div>

        {/* Question */}
        <div className="animate-fade-in" key={currentStep}>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {currentQuestion.question}
          </h2>
          <p className="text-sm text-base-gray mb-8">
            Question {currentStep + 1} of {QUESTIONS.length}
          </p>

          {currentQuestion.type === "textarea" ? (
            <textarea
              value={currentAnswer}
              onChange={(e) => updateAnswer(e.target.value)}
              placeholder={currentQuestion.placeholder}
              rows={4}
              autoFocus
              className="w-full px-4 py-3 bg-base-dark-1 border border-base-dark-3 rounded-xl text-white placeholder-base-gray focus:outline-none focus:border-base-blue focus:ring-1 focus:ring-base-blue transition-all resize-none"
            />
          ) : (
            <input
              type="text"
              value={currentAnswer}
              onChange={(e) => updateAnswer(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={currentQuestion.placeholder}
              autoFocus
              className="w-full px-4 py-3 bg-base-dark-1 border border-base-dark-3 rounded-xl text-white placeholder-base-gray focus:outline-none focus:border-base-blue focus:ring-1 focus:ring-base-blue transition-all"
            />
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all ${
              currentStep === 0
                ? "text-base-dark-3 cursor-not-allowed"
                : "text-base-gray-light hover:text-white border border-base-dark-3 hover:border-base-gray/50"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all ${
              canProceed
                ? "bg-base-blue hover:bg-base-blue-light text-white hover:shadow-lg hover:shadow-base-blue/25"
                : "bg-base-dark-3 text-base-gray cursor-not-allowed"
            }`}
          >
            {isLastStep ? (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Kit
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Keyboard hint */}
        {currentQuestion.type !== "textarea" && (
          <p className="text-xs text-base-gray text-center mt-4">
            Press <kbd className="px-1.5 py-0.5 bg-base-dark-3 rounded text-base-gray-light">Enter</kbd> to continue
          </p>
        )}
      </div>
    </div>
  );
}

function parseSections(text: string): Record<string, string> {
  const sections: Record<string, string> = {};
  const sectionRegex = /---SECTION:\s*(\w+)---/g;
  const matches = Array.from(text.matchAll(sectionRegex));

  for (let i = 0; i < matches.length; i++) {
    const key = matches[i][1];
    const start = matches[i].index! + matches[i][0].length;
    const end = i + 1 < matches.length ? matches[i + 1].index! : text.length;
    sections[key] = text.slice(start, end).trim();
  }

  return sections;
}
