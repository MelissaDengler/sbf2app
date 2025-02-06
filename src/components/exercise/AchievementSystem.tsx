import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { Trophy, Medal, Star, Award } from "lucide-react"
import { useWellness } from "@/hooks/useWellness"
import { Achievement } from "@/types"

const exerciseAchievements: Achievement[] = [
  {
    id: 'first-workout',
    title: 'First Step',
    description: 'Complete your first workout',
    icon: 'trophy',
    category: 'exercise',
    progress: 0,
    requirement: 1,
    completed: false
  },
  {
    id: 'workout-streak',
    title: 'Consistency King',
    description: 'Complete workouts 5 days in a row',
    icon: 'medal',
    category: 'exercise',
    progress: 0,
    requirement: 5,
    completed: false
  },
  // Add more achievements...
]

export function AchievementSystem() {
  const { activities } = useWellness()

  const getProgress = (achievement: Achievement) => {
    switch (achievement.id) {
      case 'first-workout':
        return activities.filter(a => a.type === 'exercise').length >= 1 ? 100 : 0
      case 'workout-streak':
        // Calculate streak logic here
        return 0
      default:
        return 0
    }
  }

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'trophy': return Trophy
      case 'medal': return Medal
      case 'star': return Star
      default: return Award
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {exerciseAchievements.map((achievement, i) => {
        const progress = getProgress(achievement)
        const Icon = getIcon(achievement.icon)

        return (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className={achievement.completed ? 'border-pink-dark' : ''}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon className={`h-5 w-5 ${achievement.completed ? 'text-pink-dark' : 'text-gray-400'}`} />
                  {achievement.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">{achievement.description}</p>
                <Progress value={progress} />
                <p className="text-xs text-gray-400 mt-2 text-right">
                  {Math.round(progress)}% Complete
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
} 