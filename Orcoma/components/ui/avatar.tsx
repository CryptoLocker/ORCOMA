"use client"

import * as React from "react"
import { User } from "lucide-react"
import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600",
          className,
        )}
        {...props}
      >
        <User className="h-5 w-5" />
      </div>
    )
  },
)
Avatar.displayName = "Avatar"

// Keep these for compatibility
const AvatarImage = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => <Avatar ref={ref} className={className} {...props} />,
)
AvatarImage.displayName = "AvatarImage"

const AvatarFallback = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => <Avatar ref={ref} className={className} {...props} />,
)
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarImage, AvatarFallback }
