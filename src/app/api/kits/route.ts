import { getSupabase } from "@/lib/supabase";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { project_name, answers, sections, is_premium = false } = body;

    if (!project_name || !answers || !sections) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("kits")
      .insert({
        project_name,
        answers,
        sections,
        is_premium,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return Response.json(
        { error: "Failed to save kit" },
        { status: 500 }
      );
    }

    return Response.json({ id: data.id });
  } catch (error) {
    console.error("Save kit error:", error);
    return Response.json(
      { error: "Failed to save kit" },
      { status: 500 }
    );
  }
}
