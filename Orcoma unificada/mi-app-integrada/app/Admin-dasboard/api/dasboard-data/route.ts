import { NextResponse } from "next/server"
//import { supabase } from "@/lib/supabase"

/*export async function GET() {
  try {
    const [viewsResponse, videosResponse, peopleResponse] = await Promise.all([
      supabase.from("views").select("*", { count: "exact" }),
      supabase.from("videos").select("id, title, views").order("views", { ascending: false }).limit(10),
      supabase.from("views").select("nombre, apellido").distinct(),
    ])
    if (viewsResponse.error) throw new Error(viewsResponse.error.message)
    if (videosResponse.error) throw new Error(videosResponse.error.message)
    if (peopleResponse.error) throw new Error(peopleResponse.error.message)

    const viewCount = viewsResponse.count || 0
    const topVideos = videosResponse.data || []
    const people = peopleResponse.data || []

    return NextResponse.json({
      viewCount,
      topVideos,
      people,
    })
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}*/