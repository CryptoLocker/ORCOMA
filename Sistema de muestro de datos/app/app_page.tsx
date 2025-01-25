"use client"

import { useEffect, useState } from "react"
import { ViewCount } from "@/components/view-count"
import { TopVideos } from "@/components/top-videos"
import { QuestionPercentages } from "@/components/question-percentages"
import { ViewerList } from "@/components/viewer-list"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export default function Home() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/dashboard-data")
        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error("Error fetching data:", error)
        setError("Failed to load dashboard data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleDownloadPDF = async () => {
    try {
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error("Failed to generate PDF")
      }
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.style.display = "none"
      a.href = url
      a.download = "dashboard-report.pdf"
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error downloading PDF:", error)
      alert("Failed to download PDF. Please try again later.")
    }
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="mb-8 text-center text-4xl font-bold">Supabase Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            <>
              <Skeleton className="h-[100px]" />
              <Skeleton className="h-[100px]" />
              <Skeleton className="h-[300px] md:col-span-2" />
              <Skeleton className="h-[300px] md:col-span-2" />
            </>
          ) : (
            <>
              <ViewCount count={data.viewCount} />
              <QuestionPercentages goodPercentage={data.goodPercentage} badPercentage={data.badPercentage} />
              <TopVideos videos={data.topVideos} />
              <ViewerList people={data.people} />
            </>
          )}
        </div>
        <div className="mt-8 flex justify-center">
          <Button onClick={handleDownloadPDF} disabled={loading}>
            Download PDF Report
          </Button>
        </div>
      </div>
    </main>
  )
}

