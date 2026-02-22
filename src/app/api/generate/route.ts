import Anthropic from "@anthropic-ai/sdk";
import { buildPrompt } from "@/lib/prompt";
import { NextRequest } from "next/server";

export const maxDuration = 120;

export async function POST(req: NextRequest) {
  try {
    const { answers } = await req.json();

    if (!answers || !answers.project_name) {
      return Response.json(
        { error: "Missing required answers" },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "Server configuration error: missing API key" },
        { status: 500 }
      );
    }

    const client = new Anthropic({ apiKey });
    const prompt = buildPrompt(answers);

    const stream = await client.messages.stream({
      model: "claude-3-5-sonnet-latest",
      max_tokens: 8192,
      messages: [{ role: "user", content: prompt }],
    });

    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Generate error:", error);
    return Response.json(
      { error: "Failed to generate kit" },
      { status: 500 }
    );
  }
}
