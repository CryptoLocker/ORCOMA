import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    const [viewsResponse, videosResponse, questionsResponse, peopleResponse] = await Promise.all([
      supabase.from("views").select("*", { count: "exact" }),
      supabase.from("videos").select("id, title, views").order("views", { ascending: false }).limit(10),
      supabase.from("questions").select("id, status"),
      supabase.from("views").select("nombre, apellido").distinct(),
    ])

    const viewCount = viewsResponse.count
    const topVideos = videosResponse.data
    const questions = questionsResponse.data
    const people = peopleResponse.data

    const goodQuestions = questions?.filter((q) => q.status === "buena").length || 0
    const badQuestions = questions?.filter((q) => q.status === "mala").length || 0
    const totalQuestions = questions?.length || 0

    const goodPercentage = (goodQuestions / totalQuestions) * 100
    const badPercentage = (badQuestions / totalQuestions) * 100

    return NextResponse.json({
      viewCount,
      topVideos,
      goodPercentage,
      badPercentage,
      people,
    })
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

