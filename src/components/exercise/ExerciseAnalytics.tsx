import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useWellness } from "@/hooks/useWellness"
import { motion } from "framer-motion"
import { Activity } from "@/types"
import { LineChart } from "@/components/charts/LineChart"
import { StatCard } from "@/components/ui/stat-card"
import { Dumbbell, Flame, Timer, TrendingUp, Target } from "lucide-react"

export function ExerciseAnalytics() {
  const { activities } = useWellness()
  const exerciseActivities = activities.filter(a => a.type === 'exercise')

  const getWeeklyData = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return date
    }).reverse()

    return [{
      id: "calories",
      data: last7Days.map(date => ({
        x: date.toLocaleDateString('en-US', { weekday: 'short' }),
        y: getDayCalories(date, exerciseActivities)
      }))
    }]
  }

  const getMonthlyStats = () => {
    const now = new Date()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    const monthActivities = exerciseActivities.filter(
      a => new Date(a.timestamp) >= monthStart
    )

    return {
      totalWorkouts: monthActivities.length,
      totalCalories: monthActivities.reduce((sum, a) => sum + (a.metrics?.calories || 0), 0),
      totalMinutes: monthActivities.reduce((sum, a) => sum + (a.duration || 0), 0),
      avgIntensity: calculateIntensity(monthActivities)
    }
  }

  const monthlyStats = getMonthlyStats()

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          title="Monthly Workouts"
          value={monthlyStats.totalWorkouts}
          icon={Dumbbell}
          trend={12}
        />
        <StatCard
          title="Calories Burned"
          value={monthlyStats.totalCalories}
          icon={Flame}
          trend={8}
        />
        <StatCard
          title="Active Minutes"
          value={monthlyStats.totalMinutes}
          icon={Timer}
          trend={-5}
        />
        <StatCard
          title="Avg Intensity"
          value={`${monthlyStats.avgIntensity}%`}
          icon={TrendingUp}
          trend={3}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Calories Burned Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart data={getWeeklyData()} title="Weekly Calories" />
          </CardContent>
        </Card>

        <WorkoutDistribution activities={exerciseActivities} />
      </div>

      <ExerciseRecommendations activities={exerciseActivities} />
    </div>
  )
}

function getDayCalories(date: Date, activities: Activity[]): number {
  return activities
    .filter(a => isSameDay(new Date(a.timestamp), date))
    .reduce((sum, a) => sum + (a.metrics?.calories || 0), 0)
}

function calculateIntensity(activities: Activity[]): number {
  if (!activities.length) return 0
  const avgCaloriesPerMinute = activities.reduce((sum, a) => {
    const calories = a.metrics?.calories || 0
    const duration = a.duration || 1
    return sum + (calories / duration)
  }, 0) / activities.length

  return Math.round((avgCaloriesPerMinute / 10) * 100)
}

function isSameDay(d1: Date, d2: Date): boolean {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
} 