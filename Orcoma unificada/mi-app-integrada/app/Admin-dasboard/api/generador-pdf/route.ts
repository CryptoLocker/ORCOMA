import { NextResponse } from "next/server"
import puppeteer from "puppeteer"

export async function POST(req: Request) {
  try {
    const data = await req.json()

    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    const content = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; }
            h1 { color: #ff6600; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Supabase Dashboard Report</h1>
          <h2>Total Views: ${data.viewCount}</h2>
          <h2>Question Quality</h2>
          <p>Good Questions: ${data.goodPercentage.toFixed(1)}%</p>
          <p>Bad Questions: ${data.badPercentage.toFixed(1)}%</p>
          <h2>Top Videos</h2>
          <table>
            <tr>
              <th>Title</th>
              <th>Views</th>
            </tr>
            ${data.topVideos
              .map(
                (video: any) => `
              <tr>
                <td>${video.title}</td>
                <td>${video.views}</td>
              </tr>
            `,
              )
              .join("")}
          </table>
          <h2>Video Viewers</h2>
          <ul>
            ${data.people
              .map(
                (person: any) => `
              <li>${person.nombre} ${person.apellido}</li>
            `,
              )
              .join("")}
          </ul>
        </body>
      </html>
    `

    await page.setContent(content)
    const pdf = await page.pdf({ format: "A4" })

    await browser.close()

    return new NextResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=dashboard-report.pdf",
      },
    })
  } catch (error) {
    console.error("Error generating PDF:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

