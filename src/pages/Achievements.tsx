import { Navigation } from "@/components/layout/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Star, Target, Brain, Heart } from "lucide-react"
import { Progress } from "@/components/ui/progress"

type Achievement = {
  id: string
  title: string
  description: string
  progress: number
  total: number
  category: 'fitness' | 'wellness' | 'nutrition' | 'mindfulness'
  icon: keyof typeof categoryIcons
  unlockedAt?: Date
}

const categoryIcons = {
  trophy: Trophy,
  star: Star,
  target: Target,
  brain: Brain,
  heart: Heart,
}

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'Early Bird',
    description: 'Complete 5 morning workouts',
    progress: 3,
    total: 5,
    category: 'fitness',
    icon: 'trophy'
  },
  {
    id: '2',
    title: 'Mindfulness Master',
    description: 'Meditate for 10 days straight',
    progress: 7,
    total: 10,
    category: 'mindfulness',
    icon: 'brain'
  },
  {
    id: '3',
    title: 'Wellness Warrior',
    description: 'Track all wellness goals for 30 days',
    progress: 25,
    total: 30,
    category: 'wellness',
    icon: 'heart',
    unlockedAt: new Date('2024-02-15')
  },
  // Add more achievements
]

export function Achievements() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Achievements</h1>
          <p className="mt-1 text-gray-500">Track your wellness milestones and earn achievements</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement) => {
            const Icon = categoryIcons[achievement.icon]
            const isUnlocked = achievement.unlockedAt || achievement.progress >= achievement.total
            
            return (
              <Card 
                key={achievement.id}
                className={`transition-all duration-200 ${
                  isUnlocked ? 'bg-gradient-to-br from-pink-50 to-white' : ''
                }`}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {achievement.title}
                  </CardTitle>
                  <Icon 
                    className={`h-5 w-5 ${
                      isUnlocked ? 'text-pink-dark' : 'text-gray-400'
                    }`} 
                  />
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-3">
                    {achievement.description}
                  </p>
                  <div className="space-y-2">
                    <Progress 
                      value={(achievement.progress / achievement.total) * 100}
                      className="h-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{achievement.progress} / {achievement.total}</span>
                      {isUnlocked && (
                        <span className="text-pink-dark">
                          Unlocked {achievement.unlockedAt?.toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
} 