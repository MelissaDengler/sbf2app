import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Dumbbell, Play } from "lucide-react"
import { useWellness } from "@/hooks/useWellness"

interface WorkoutTemplate {
  id: string
  name: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: number
  exercises: {
    name: string
    sets: number
    reps: number
    rest: number
  }[]
  category: 'strength' | 'cardio' | 'hiit' | 'yoga'
  calories: number
}

export function WorkoutTemplates() {
  const { addActivity } = useWellness()

  const templates: WorkoutTemplate[] = [
    {
      id: '1',
      name: 'Full Body HIIT',
      difficulty: 'intermediate',
      duration: 30,
      exercises: [
        { name: 'Burpees', sets: 3, reps: 12, rest: 30 },
        { name: 'Mountain Climbers', sets: 3, reps: 20, rest: 30 },
        { name: 'Jump Squats', sets: 3, reps: 15, rest: 30 },
      ],
      category: 'hiit',
      calories: 300
    },
    // Add more templates...
  ]

  const startWorkout = (template: WorkoutTemplate) => {
    // Add workout to activities
    addActivity({
      id: Date.now().toString(),
      type: 'exercise',
      timestamp: new Date(),
      duration: template.duration,
      value: template.calories,
      notes: `Completed ${template.name}`,
      metrics: {
        exerciseType: template.category,
        duration: template.duration,
        calories: template.calories
      }
    })
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {templates.map((template, i) => (
        <motion.div
          key={template.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{template.name}</span>
                <Dumbbell className="h-5 w-5 text-pink-dark" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Duration</span>
                  <span>{template.duration} min</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Difficulty</span>
                  <span className="capitalize">{template.difficulty}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Est. Calories</span>
                  <span>{template.calories}</span>
                </div>
                <Button 
                  onClick={() => startWorkout(template)}
                  className="w-full bg-pink-dark hover:bg-pink-600"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start Workout
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
} 