import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity } from "@/types"
import { ResponsivePie } from "@nivo/pie"
import { motion } from "framer-motion"
import { PieChart, Activity as ActivityIcon } from "lucide-react"

interface WorkoutDistributionProps {
  activities: Activity[]
}

export function WorkoutDistribution({ activities }: WorkoutDistributionProps) {
  const getDistributionData = () => {
    const distribution = activities.reduce((acc: Record<string, number>, activity) => {
      const type = activity.metrics?.exerciseType || 'other'
      acc[type] = (acc[type] || 0) + 1
      return acc
    }, {})

    return Object.entries(distribution).map(([id, value]) => ({
      id,
      label: id.charAt(0).toUpperCase() + id.slice(1),
      value,
      color: getColorForType(id)
    }))
  }

  const getColorForType = (type: string) => {
    const colors: Record<string, string> = {
      cardio: '#f472b6',
      strength: '#a78bfa',
      hiit: '#fb923c',
      yoga: '#4ade80',
      other: '#94a3b8'
    }
    return colors[type] || colors.other
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChart className="h-5 w-5 text-pink-dark" />
          Workout Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div 
          className="h-[300px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ResponsivePie
            data={getDistributionData()}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            innerRadius={0.6}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            colors={{ datum: 'data.color' }}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            enableArcLinkLabels={false}
            arcLabel="value"
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
            motionConfig="gentle"
            legends={[
              {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 20,
                itemsSpacing: 0,
                itemWidth: 85,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 12,
                symbolShape: 'circle'
              }
            ]}
          />
        </motion.div>
      </CardContent>
    </Card>
  )
} 