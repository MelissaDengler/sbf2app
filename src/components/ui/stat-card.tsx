import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  progress?: number
  trend?: number
  onClick?: () => void
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  progress,
  trend,
  onClick
}: StatCardProps) {
  return (
    <motion.div
      whileHover={{ scale: onClick ? 1.02 : 1 }}
      whileTap={{ scale: onClick ? 0.98 : 1 }}
    >
      <Card 
        className={onClick ? "cursor-pointer hover:shadow-lg transition-shadow" : ""}
        onClick={onClick}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            {title}
          </CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          {progress !== undefined && (
            <div className="mt-4">
              <Progress value={progress} />
            </div>
          )}
          {trend !== undefined && (
            <div className={`mt-1 text-xs ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% vs last week
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
} 