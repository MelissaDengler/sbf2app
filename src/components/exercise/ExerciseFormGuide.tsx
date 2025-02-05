import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Video, ChevronRight, ChevronLeft } from "lucide-react"
import { useState } from "react"

interface ExerciseForm {
  name: string
  steps: string[]
  tips: string[]
  videoUrl: string
  muscleGroups: string[]
  common_mistakes: string[]
}

const exerciseForms: Record<string, ExerciseForm> = {
  squat: {
    name: "Squat",
    steps: [
      "Stand with feet shoulder-width apart",
      "Keep your chest up and core engaged",
      "Lower your body as if sitting back into a chair",
      "Keep knees in line with toes",
      "Push through heels to return to starting position"
    ],
    tips: [
      "Keep your weight in your heels",
      "Don't let knees cave inward",
      "Maintain neutral spine throughout"
    ],
    videoUrl: "/exercises/squat.mp4",
    muscleGroups: ["Quadriceps", "Hamstrings", "Glutes", "Core"],
    common_mistakes: [
      "Knees caving inward",
      "Rounding the back",
      "Rising on toes"
    ]
  },
  // Add more exercises...
}

export function ExerciseFormGuide() {
  const [currentExercise, setCurrentExercise] = useState<string>("squat")
  const [currentStep, setCurrentStep] = useState(0)

  const exercise = exerciseForms[currentExercise]

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="h-5 w-5 text-pink-dark" />
          {exercise.name} Form Guide
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
            <video
              src={exercise.videoUrl}
              loop
              muted
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3 className="font-medium">Step {currentStep + 1}</h3>
                <p className="text-gray-600">{exercise.steps[currentStep]}</p>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-4">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrentStep(s => Math.min(exercise.steps.length - 1, s + 1))}
                disabled={currentStep === exercise.steps.length - 1}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-medium mb-2">Key Tips</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                {exercise.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Common Mistakes</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                {exercise.common_mistakes.map((mistake, i) => (
                  <li key={i}>{mistake}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 