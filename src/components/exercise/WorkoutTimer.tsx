import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, RotateCcw, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

interface Exercise {
  name: string
  duration: number
  type: 'work' | 'rest'
}

interface WorkoutTimerProps {
  exercises: Exercise[]
  onComplete?: () => void
}

export function WorkoutTimer({ exercises, onComplete }: WorkoutTimerProps) {
  const [currentExercise, setCurrentExercise] = useState(0)
  const [timeLeft, setTimeLeft] = useState(exercises[0].duration)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      if (currentExercise < exercises.length - 1) {
        setCurrentExercise(curr => curr + 1)
        setTimeLeft(exercises[currentExercise + 1].duration)
      } else {
        onComplete?.()
      }
    }

    return () => clearInterval(interval)
  }, [isRunning, timeLeft, currentExercise, exercises, onComplete])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progress = (timeLeft / exercises[currentExercise].duration) * 100

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="text-center">
            <AnimatePresence mode="wait">
              <motion.h2
                key={exercises[currentExercise].name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-2xl font-bold"
              >
                {exercises[currentExercise].name}
              </motion.h2>
            </AnimatePresence>
            <p className="text-gray-500">
              {exercises[currentExercise].type === 'work' ? 'Work' : 'Rest'}
            </p>
          </div>

          <div className="relative h-48 w-48 mx-auto">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-gray-200"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="42"
                cx="50"
                cy="50"
              />
              <motion.circle
                className="text-pink-dark"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="42"
                cx="50"
                cy="50"
                strokeDasharray={264}
                strokeDashoffset={264 - (progress / 100) * 264}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold">{formatTime(timeLeft)}</span>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setIsRunning(!isRunning)}
              className="bg-pink-dark hover:bg-pink-600"
            >
              {isRunning ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </Button>
            <Button
              onClick={() => {
                setTimeLeft(exercises[currentExercise].duration)
                setIsRunning(false)
              }}
              variant="outline"
            >
              <RotateCcw className="h-6 w-6" />
            </Button>
            <Button
              onClick={() => {
                if (currentExercise < exercises.length - 1) {
                  setCurrentExercise(curr => curr + 1)
                  setTimeLeft(exercises[currentExercise + 1].duration)
                }
              }}
              variant="outline"
              disabled={currentExercise === exercises.length - 1}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 