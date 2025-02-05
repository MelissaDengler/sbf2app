import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Save, Trash2, Dumbbell } from "lucide-react"
import { useState } from "react"
import { useWellness } from "@/hooks/useWellness"

interface ExerciseSet {
  id: string
  exercise: string
  sets: number
  reps: number
  weight: number
  restTime: number
}

interface CustomWorkout {
  id: string
  name: string
  description: string
  exercises: ExerciseSet[]
  estimatedDuration: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  targetMuscleGroups: string[]
}

const exerciseDatabase = {
  "Push-up": { category: "upper", equipment: "none" },
  "Squat": { category: "lower", equipment: "none" },
  "Deadlift": { category: "compound", equipment: "barbell" },
  // Add more exercises...
}

export function WorkoutBuilder() {
  const [workout, setWorkout] = useState<CustomWorkout>({
    id: Date.now().toString(),
    name: "",
    description: "",
    exercises: [],
    estimatedDuration: 0,
    difficulty: "intermediate",
    targetMuscleGroups: []
  })

  const addExercise = () => {
    const newExercise: ExerciseSet = {
      id: Date.now().toString(),
      exercise: "",
      sets: 3,
      reps: 12,
      weight: 0,
      restTime: 60
    }
    setWorkout(prev => ({
      ...prev,
      exercises: [...prev.exercises, newExercise]
    }))
  }

  const updateExercise = (id: string, updates: Partial<ExerciseSet>) => {
    setWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.map(ex => 
        ex.id === id ? { ...ex, ...updates } : ex
      )
    }))
  }

  const removeExercise = (id: string) => {
    setWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.filter(ex => ex.id !== id)
    }))
  }

  const saveWorkout = () => {
    // Save to local storage or backend
    console.log('Saving workout:', workout)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Dumbbell className="h-5 w-5 text-pink-dark" />
          Create Custom Workout
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Workout Name</label>
              <Input
                value={workout.name}
                onChange={e => setWorkout(prev => ({ ...prev, name: e.target.value }))}
                placeholder="My Custom Workout"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Difficulty</label>
              <Select
                value={workout.difficulty}
                onValueChange={value => setWorkout(prev => ({ ...prev, difficulty: value as any }))}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <Input
              value={workout.description}
              onChange={e => setWorkout(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your workout"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Exercises</h3>
              <Button onClick={addExercise} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Exercise
              </Button>
            </div>

            <AnimatePresence>
              {workout.exercises.map((exercise, index) => (
                <motion.div
                  key={exercise.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid gap-4 md:grid-cols-6 items-end border p-4 rounded-lg"
                >
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium">Exercise</label>
                    <Select
                      value={exercise.exercise}
                      onValueChange={value => updateExercise(exercise.id, { exercise: value })}
                    >
                      {Object.keys(exerciseDatabase).map(ex => (
                        <option key={ex} value={ex}>{ex}</option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Sets</label>
                    <Input
                      type="number"
                      value={exercise.sets}
                      onChange={e => updateExercise(exercise.id, { sets: +e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Reps</label>
                    <Input
                      type="number"
                      value={exercise.reps}
                      onChange={e => updateExercise(exercise.id, { reps: +e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Weight (kg)</label>
                    <Input
                      type="number"
                      value={exercise.weight}
                      onChange={e => updateExercise(exercise.id, { weight: +e.target.value })}
                    />
                  </div>
                  <div className="flex items-center justify-end">
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeExercise(exercise.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <Button onClick={saveWorkout} className="w-full bg-pink-dark hover:bg-pink-600">
            <Save className="h-4 w-4 mr-2" />
            Save Workout
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 