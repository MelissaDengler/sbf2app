import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity } from "@/types"
import { motion } from "framer-motion"
import { TrendingUp } from "lucide-react"
import { useState } from "react"

interface ExerciseChartProps {
  activities: Activity[]
}

export function ExerciseChart({ activities }: ExerciseChartProps) {
  const [timeframe, setTimeframe] = useState<'week' | 'month'>('week')

  const getChartData = () => {
    const now = new Date()
    const daysToShow = timeframe === 'week' ? 7 : 30
    const data = Array.from({ length: daysToShow }, (_, i) => {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      date.setHours(0, 0, 0, 0)

      const dayActivities = activities.filter(activity => {
        const activityDate = new Date(activity.timestamp)
        activityDate.setHours(0, 0, 0, 0)
        return activityDate.getTime() === date.getTime()
      })

      return {
        date,
        calories: dayActivities.reduce((sum, a) => sum + (a.metrics?.calories || 0), 0),
        duration: dayActivities.reduce((sum, a) => sum + (a.duration || 0), 0)
      }
    }).reverse()

    const maxCalories = Math.max(...data.map(d => d.calories))
    const maxDuration = Math.max(...data.map(d => d.duration))

    return data.map(d => ({
      ...d,
      caloriesHeight: (d.calories / maxCalories) * 100,
      durationHeight: (d.duration / maxDuration) * 100
    }))
  }

  const chartData = getChartData()

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Activity Trends</CardTitle>
          <div className="flex gap-2">
            <button
              onClick={() => setTimeframe('week')}
              className={`px-3 py-1 rounded-md text-sm ${
                timeframe === 'week' 
                  ? 'bg-pink-100 text-pink-dark' 
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setTimeframe('month')}
              className={`px-3 py-1 rounded-md text-sm ${
                timeframe === 'month' 
                  ? 'bg-pink-100 text-pink-dark' 
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              Month
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] flex items-end gap-1">
          {chartData.map((day, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${day.caloriesHeight}%` }}
                className="w-full bg-pink-400 rounded-t"
                transition={{ delay: i * 0.05 }}
              />
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${day.durationHeight}%` }}
                className="w-full bg-pink-200 rounded-t"
                transition={{ delay: i * 0.05 + 0.1 }}
              />
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-pink-400" />
            <span className="text-sm text-gray-500">Calories Burned</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-pink-200" />
            <span className="text-sm text-gray-500">Active Minutes</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 