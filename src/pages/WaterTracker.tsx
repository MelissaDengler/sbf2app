import { Navigation } from "@/components/layout/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Droplets, Plus, Minus } from "lucide-react"
import { motion } from "framer-motion"
import { useStatsStore } from "@/lib/stores/stats.store"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { useState } from "react"
import { Progress } from "@/components/ui/progress"

interface WaterLog {
  id: string
  amount: number
  timestamp: string
}

export function WaterTracker() {
  const { dailyStats, updateStat } = useStatsStore()
  const [waterLogs, setWaterLogs] = useLocalStorage<WaterLog[]>('water-logs', [])
  const [goal] = useState(2500) // 2.5L daily goal

  const addWater = (amount: number) => {
    const newAmount = Math.max(0, dailyStats.water + amount)
    updateStat('water', newAmount)
    
    if (amount > 0) {
      const newLog: WaterLog = {
        id: Date.now().toString(),
        amount,
        timestamp: new Date().toISOString()
      }
      setWaterLogs([newLog, ...waterLogs])
    }
  }

  const progress = (dailyStats.water / goal) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-gray-900">Water Tracker</h1>
          <p className="mt-1 text-gray-500">Track your daily water intake</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Today's Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="relative"
                >
                  <Droplets className="w-32 h-32 text-blue-500/20" />
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-3xl font-bold text-blue-500">
                      {dailyStats.water}
                    </span>
                    <span className="text-sm text-gray-500">ml</span>
                  </div>
                </motion.div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-center text-gray-500">
                  Goal: {goal}ml
                </p>
              </div>

              <div className="flex gap-4 justify-center">
                {[100, 250, 500].map((amount) => (
                  <motion.div
                    key={amount}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => addWater(amount)}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      {amount}ml
                    </Button>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center">
                <Button
                  variant="outline"
                  className="text-red-500 hover:text-red-600"
                  onClick={() => addWater(-250)}
                >
                  <Minus className="mr-2 h-4 w-4" />
                  Undo (250ml)
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Today's Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {waterLogs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Droplets className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">{log.amount}ml</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </motion.div>
                ))}
                {waterLogs.length === 0 && (
                  <p className="text-center text-gray-500 py-4">
                    No water intake logged today
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
} 