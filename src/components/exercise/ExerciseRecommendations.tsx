import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity } from "@/types"
import { motion } from "framer-motion"
import { Brain, Target, Zap } from "lucide-react"

interface ExerciseRecommendationsProps {
  activities: Activity[]
}

export function ExerciseRecommendations({ activities }: ExerciseRecommendationsProps) {
  const getRecommendations = () => {
    const recentActivities = activities.slice(0, 10)
    const workoutTypes = recentActivities.reduce((types: Record<string, number>, activity) => {
      const type = activity.metrics?.exerciseType || 'unknown'
      types[type] = (types[type] || 0) + 1
      return types
    }, {})

    // Simple recommendation logic based on workout history
    const recommendations = []

    // Check if user needs cardio
    if (!workoutTypes['cardio'] || workoutTypes['cardio'] < 2) {
      recommendations.push({
        type: 'cardio',
        title: 'Add More Cardio',
        description: 'Try adding 2-3 cardio sessions this week for better endurance',
        intensity: 'moderate'
      })
    }

    // Check if user needs strength training
    if (!workoutTypes['strength'] || workoutTypes['strength'] < 2) {
      recommendations.push({
        type: 'strength',
        title: 'Include Strength Training',
        description: 'Add resistance training to build muscle and boost metabolism',
        intensity: 'high'
      })
    }

    // Check workout frequency
    if (recentActivities.length < 3) {
      recommendations.push({
        type: 'frequency',
        title: 'Increase Workout Frequency',
        description: 'Aim for at least 3-4 workouts per week',
        intensity: 'low'
      })
    }

    return recommendations
  }

  const recommendations = getRecommendations()

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-pink-dark" />
            Smart Recommendations
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          {recommendations.map((rec, i) => (
            <motion.div
              key={rec.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-pink-dark" />
                      <h3 className="font-medium">{rec.title}</h3>
                    </div>
                    <p className="text-sm text-gray-500">{rec.description}</p>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm capitalize">{rec.intensity} intensity</span>
                    </div>
                    <Button className="w-full bg-pink-dark hover:bg-pink-600">
                      View Workouts
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 