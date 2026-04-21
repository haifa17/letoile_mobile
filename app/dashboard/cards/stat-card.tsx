"use client"

import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  icon: ReactNode
  description?: string
  trend?: {
    value: number
    isPositive: boolean
  }
}

export function StatCard({ title, value, icon, description, trend }: StatCardProps) {
  return (
    <Card className="bg-card border-border hover:cursor-pointer hover:border-primary/50 transition-colors duration-200">
      <CardContent className="">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-bold text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground ">{value}</p>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
            {trend && (
              <p className={cn("text-xs font-medium", trend.isPositive ? "text-primary" : "text-destructive")}>
                {trend.isPositive ? "+" : "-"}
                {Math.abs(trend.value)}% de la semaine dernière
              </p>
            )}
          </div>
          <div className="p-3 rounded-lg bg-linear-to-r from-red-500 to-red-700 text-white">{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}
