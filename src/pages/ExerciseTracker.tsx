import { Navigation } from "@/components/layout/Navigation"
import { StatCard } from "@/components/ui/stat-card"
import { useWellness } from "@/hooks/useWellness"
import { motion } from "framer-motion"
import { Dumbbell, Flame, TrendingUp, Timer, Calendar } from "lucide-react"
import { AddExerciseDialog } from "@/components/exercise/AddExerciseDialog"
import { ExerciseCalendar } from "@/components/exercise/ExerciseCalendar"
import { ExerciseChart } from "@/components/exercise/ExerciseChart"
import { useState } from "react"

export function ExerciseTracker() {
  const { activities, stats: wellnessStats } = useWellness()
  const [selectedView, setSelectedView] = useState<'calendar' | 'chart'>('calendar')

  const exerciseActivities = activities.filter(a => a.type === 'exercise')
  const weeklyWorkouts = exerciseActivities.filter(
    a => new Date(a.timestamp) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length

  const statCards = [
    {
      title: "Weekly Workouts",
      value: weeklyWorkouts,
      description: "Out of 5 target workouts",
      icon: Dumbbell,
      progress: (weeklyWorkouts / 5) * 100,
    },
    {
      title: "Calories Burned",
      value: wellnessStats.daily.calories,
      description: "Today's total",
      icon: Flame,
      trend: 12, // Calculate from historical data
    },
    {
      title: "Active Minutes",
      value: "45",
      description: "Today's active time",
      icon: Timer,
      trend: -5,
    },
    {
      title: "Current Streak",
      value: "5 days",
      description: "Personal best: 14 days",
      icon: TrendingUp,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl font-bold text-gray-900">Exercise Tracker</h1>
            <p className="mt-1 text-gray-500">Track your fitness journey</p>
          </motion.div>
          <AddExerciseDialog />
        </div>

        <div className="grid gap-6 md:grid-cols-4 mb-8">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <StatCard {...stat} />
            </motion.div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ExerciseCalendar activities={exerciseActivities} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ExerciseChart activities={exerciseActivities} />
          </motion.div>
        </div>
      </main>
    </div>
  )
} 