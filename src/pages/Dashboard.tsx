import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/lib/stores/auth.store"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { Navigation } from "@/components/layout/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Dumbbell, 
  Moon, 
  Utensils, 
  Trophy,
  BookOpen,
  Droplets,
  TrendingUp,
  Calendar
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { AnimatedStatCard } from "@/components/ui/animated-stat-card"
import { LineChart } from "@/components/charts/LineChart"
import { ProgressRing } from "@/components/charts/ProgressRing"
import { useAchievements } from '@/hooks/useAchievements'
import { useStatsStore } from '@/lib/stores/stats.store'
import { AchievementNotification } from '@/components/achievements/AchievementNotification'

export function Dashboard() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const { notification, dismissNotification } = useAchievements()
  const dailyStats = useStatsStore((state) => state.dailyStats)

  const stats = [
    {
      title: "Today's Workouts",
      value: "2/3",
      description: "Daily goal progress",
      icon: Dumbbell,
      progress: 66,
      href: '/exercise'
    },
    {
      title: "Sleep Quality",
      value: "7.5h",
      description: "Last night's sleep",
      icon: Moon,
      progress: 85,
      href: '/sleep'
    },
    {
      title: "Meal Plan",
      value: "1,850",
      description: "Calories today",
      icon: Utensils,
      progress: 75,
      href: '/meals'
    },
    {
      title: "Achievements",
      value: "12/20",
      description: "Goals completed",
      icon: Trophy,
      progress: 60,
      href: '/achievements'
    },
    {
      title: "Journal Entries",
      value: "15",
      description: "This month",
      icon: BookOpen,
      progress: 70,
      href: '/journal'
    },
    {
      title: "Water Intake",
      value: "1.8/2.5L",
      description: "Daily progress",
      icon: Droplets,
      progress: 72,
      href: '/water'
    }
  ]

  const upcomingSessions = [
    {
      id: 1,
      title: "Wellness Consultation",
      date: "Tomorrow",
      time: "10:00 AM",
      therapist: "Dr. Sarah Johnson",
    },
    {
      id: 2,
      title: "Massage Therapy",
      date: "Feb 28",
      time: "2:30 PM",
      therapist: "John Smith",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const wellnessData = [
    {
      id: "wellness",
      data: [
        { x: "Mon", y: 85 },
        { x: "Tue", y: 78 },
        { x: "Wed", y: 82 },
        { x: "Thu", y: 88 },
        { x: "Fri", y: 85 },
        { x: "Sat", y: 90 },
        { x: "Sun", y: 92 },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="mt-1 text-gray-500">
            Here's your wellness overview
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {stats.map((stat) => (
            <AnimatedStatCard
              key={stat.title}
              {...stat}
              onClick={() => navigate(stat.href)}
            />
          ))}
        </motion.div>

        {/* Summary Reports Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="text-lg font-semibold mb-6">Weekly Summary</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Activity Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: 'Exercise', value: 68 },
                    { label: 'Sleep', value: 85 },
                    { label: 'Nutrition', value: 72 },
                    { label: 'Hydration', value: 65 }
                  ].map((item) => (
                    <div key={item.label} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{item.label}</span>
                        <span className="font-medium">{item.value}%</span>
                      </div>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ delay: 0.5 }}
                      >
                        <Progress value={item.value} className="h-2" />
                      </motion.div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Wellness Score Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 mt-8">
                  <LineChart 
                    data={wellnessData} 
                    title="Weekly Wellness Score"
                  />
                  <Card>
                    <CardHeader>
                      <CardTitle>Today's Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <ProgressRing progress={75} label="Daily Goals" />
                        <ProgressRing progress={68} label="Activity" />
                        <ProgressRing progress={85} label="Sleep" />
                        <ProgressRing progress={72} label="Nutrition" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Quick Actions with animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { label: 'Log Workout', icon: Dumbbell, href: '/exercise' },
              { label: 'Add Meal', icon: Utensils, href: '/meals' },
              { label: 'Write Journal', icon: BookOpen, href: '/journal' },
              { label: 'Book Appointment', icon: Calendar, href: '/appointments' }
            ].map((action) => (
              <motion.div
                key={action.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate(action.href)}
                >
                  <action.icon className="mr-2 h-4 w-4" />
                  {action.label}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Add achievement celebrations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-r from-pink-50 to-pink-100 border-none">
            <CardContent className="flex items-center gap-4 py-6">
              <div className="p-3 bg-pink-dark rounded-full">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">New Achievement Unlocked!</h3>
                <p className="text-sm text-gray-600">
                  You've completed 7 days of consistent exercise tracking
                </p>
              </div>
              <Button variant="outline" className="ml-auto">
                View All
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      {notification.achievement && (
        <AchievementNotification
          title={notification.achievement.title}
          description={notification.achievement.description}
          isVisible={notification.isVisible}
          onClose={dismissNotification}
        />
      )}
    </div>
  )
} 