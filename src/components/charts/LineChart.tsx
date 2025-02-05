import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

interface LineChartProps {
  data: Array<{
    id: string
    data: Array<{ x: string | number; y: number }>
  }>
  title: string
}

export function LineChart({ data, title }: LineChartProps) {
  const maxValue = Math.max(...data[0].data.map(d => d.y))
  const points = data[0].data.map((d, i) => ({
    x: (i / (data[0].data.length - 1)) * 100,
    y: 100 - ((d.y / maxValue) * 80) // 80% of height to leave room for labels
  }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] relative">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full w-12 flex flex-col justify-between text-sm text-gray-500">
              <span>{maxValue}</span>
              <span>{Math.round(maxValue / 2)}</span>
              <span>0</span>
            </div>

            {/* Chart area */}
            <div className="absolute left-12 right-4 top-4 bottom-4">
              {/* Grid lines */}
              <div className="absolute inset-0 grid grid-rows-4 gap-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="border-t border-gray-200"
                    style={{ top: `${(i / 4) * 100}%` }}
                  />
                ))}
              </div>

              {/* Line */}
              <svg className="absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  d={`M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`}
                  fill="none"
                  stroke="rgb(236, 72, 153)"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {/* Data points */}
              {points.map((point, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-pink-dark rounded-full -ml-1.5 -mt-1.5"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    left: `${point.x}%`,
                    top: `${point.y}%`
                  }}
                >
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white px-2 py-1 rounded shadow text-sm opacity-0 hover:opacity-100 transition-opacity">
                    {data[0].data[i].y}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* X-axis labels */}
            <div className="absolute left-12 right-4 bottom-0 flex justify-between text-sm text-gray-500">
              {data[0].data.map((d, i) => (
                <span key={i}>{d.x}</span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 