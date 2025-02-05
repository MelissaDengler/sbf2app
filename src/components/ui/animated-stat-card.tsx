import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { LucideIcon } from "lucide-react"

interface AnimatedStatCardProps {
  title: string
  value: string
  description: string
  icon: LucideIcon
  progress: number
  href: string
  onClick: () => void
}

export function AnimatedStatCard({
  title,
  value,
  description,
  icon: Icon,
  progress,
  onClick
}: AnimatedStatCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className="cursor-pointer hover:shadow-lg transition-shadow"
        onClick={onClick}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            {title}
          </CardTitle>
          <motion.div
            whileHover={{ rotate: 15 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Icon className="h-4 w-4 text-pink-dark" />
          </motion.div>
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-gray-500">{description}</p>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.2 }}
            >
              <Progress 
                value={progress} 
                className="h-2 mt-4"
              />
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 