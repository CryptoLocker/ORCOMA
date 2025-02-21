"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function NotificationBell() {
  const router = useRouter()
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    setIsClicked(true)
    setTimeout(() => {
      router.push("/mensajes-evaluacion")
    }, 300)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("relative transition-transform duration-300", isClicked && "scale-95")}
      onClick={handleClick}
    >
      <Bell className={cn("h-5 w-5 transition-colors", isClicked && "text-orange-500")} />
      <Badge
        className={cn(
          "absolute -top-1 -right-1 h-5 min-w-[1.25rem] px-1 bg-red-500 text-white",
          "animate-in fade-in-0 duration-300",
          isClicked && "animate-out fade-out-0 duration-300",
        )}
      >
        1 nuevo
      </Badge>
      <span className="sr-only">Ver notificaciones</span>
    </Button>
  )
}

