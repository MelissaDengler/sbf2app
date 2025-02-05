import { Navigation } from "@/components/layout/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { PlusCircle, Target, Trophy, TrendingUp, Calendar } from "lucide-react"
import { AddGoalDialog } from "@/components/goals/AddGoalDialog"
import { useState } from "react"

type Goal = {
  id: string
  title: string
  category: 'fitness' | 'nutrition' | 'mindfulness' | 'sleep'
  target: number
  current: number
  unit: string
  deadline: Date
  createdAt: Date
}

export function WellnessGoals() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Daily Steps',
      category: 'fitness',
      target: 10000,
      current: 7500,
      unit: 'steps',
      deadline: new Date('2024-03-30'),
      createdAt: new Date('2024-01-01')
    },
    {
      id: '2',
      title: 'Meditation',
      category: 'mindfulness',
      target: 30,
      current: 20,
      unit: 'minutes',
      deadline: new Date('2024-03-30'),
      createdAt: new Date('2024-01-01')
    },
    // Add more sample goals
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Wellness Goals</h1>
            <p className="mt-1 text-gray-500">Track your progress and achieve your wellness goals</p>
          </div>
          <AddGoalDialog onAddGoal={(goal) => setGoals([...goals, goal])} />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal) => (
            <Card key={goal.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {goal.title}
                </CardTitle>
                <Target className="h-4 w-4 text-pink-dark" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Progress 
                    value={(goal.current / goal.target) * 100} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{goal.current} {goal.unit}</span>
                    <span>{goal.target} {goal.unit}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>Due {new Date(goal.deadline).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      <span>{Math.round((goal.current / goal.target) * 100)}% Complete</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
} 