import { getSupabase } from "@/lib/supabase";
import { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id || id === "session") {
      return Response.json(
        { error: "Invalid kit ID" },
        { status: 400 }
      );
    }

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("kits")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return Response.json(
        { error: "Kit not found" },
        { status: 404 }
      );
    }

    return Response.json(data);
  } catch (error) {
    console.error("Fetch kit error:", error);
    return Response.json(
      { error: "Failed to fetch kit" },
      { status: 500 }
    );
  }
}
