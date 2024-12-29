import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Missing id parameter" },
      { status: 400 },
    );
  }

  try {
    let { data, error } = await supabase
      .from("page_stats")
      .select("views, likes")
      .eq("id", id)
      .single();

    if (error) throw error;

    if (!data) {
      const { data: newData, error: insertError } = await supabase
        .from("page_stats")
        .insert([{ id, views: 0, likes: 0 }])
        .select()
        .single();

      if (insertError) throw insertError;
      data = newData;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ views: 0, likes: 0 });
  }
}

export async function POST(request) {
  const { id, type } = await request.json();

  if (!id || !type) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  try {
    const { data, error } = await supabase.rpc(
      type === "view" ? "increment_views" : "increment_likes",
      { row_id: id },
    );

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
