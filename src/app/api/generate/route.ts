import { GoogleGenerativeAI } from "@google/generative-ai";
import { withX402 } from "x402-next";
import { buildPrompt } from "@/lib/prompt";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 120;

const payTo = (process.env.X402_PAYTO_ADDRESS || "0x0000000000000000000000000000000000000000") as `0x${string}`;

async function handler(req: NextRequest) {
  try {
    const { answers } = await req.json();

    if (!answers || !answers.project_name) {
      return NextResponse.json(
        { error: "Missing required answers" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server configuration error: missing API key" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-3.1-pro-preview" });
    const prompt = buildPrompt(answers);

    const result = await model.generateContentStream(prompt);

    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new NextResponse(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: "Failed to generate kit" },
      { status: 500 }
    );
  }
}

export const POST = withX402(
  handler,
  payTo,
  {
    price: "$49.00",
    network: "base",
    config: { description: "Full Launch Kit Generation" },
  },
  { url: "https://x402.org/facilitator" }
);
