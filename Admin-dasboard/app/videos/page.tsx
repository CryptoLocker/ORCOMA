"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Edit, Trash, FileIcon } from "lucide-react"
import { VideoManagement } from "@/components/video-management"

export default function VideosPage() {
  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-orange-50">
        <CardTitle className="text-2xl text-orange-700">Gestión de Videos</CardTitle>
      </CardHeader>
      <CardContent className="mt-6">
        <VideoManagement />
      </CardContent>
    </Card>
  )
}

