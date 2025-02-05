import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useWellness } from "@/hooks/useWellness"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import { toast } from "react-hot-toast"

const exerciseTypes = [
  "Cardio",
  "Strength Training",
  "HIIT",
  "Yoga",
  "Swimming",
  "Cycling",
  "Running",
  "Walking"
]

export function AddExerciseDialog() {
  const { addActivity } = useWellness()
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    type: "",
    duration: "",
    calories: "",
    notes: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.type || !formData.duration) {
      toast.error("Please fill in required fields")
      return
    }

    const activity = {
      id: Date.now().toString(),
      type: "exercise",
      timestamp: new Date(),
      duration: parseInt(formData.duration),
      value: parseInt(formData.calories) || 0,
      notes: formData.notes,
      metrics: {
        exerciseType: formData.type,
        duration: parseInt(formData.duration),
        calories: parseInt(formData.calories) || 0
      }
    }

    addActivity(activity)
    setOpen(false)
    toast.success("Exercise logged successfully!")
    
    setFormData({
      type: "",
      duration: "",
      calories: "",
      notes: ""
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-pink-dark hover:bg-pink-600">
          <PlusCircle className="mr-2 h-4 w-4" />
          Log Exercise
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Log Exercise</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Exercise Type</label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select exercise type" />
              </SelectTrigger>
              <SelectContent>
                {exerciseTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Duration (minutes)</label>
            <Input
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="Enter duration"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Calories Burned</label>
            <Input
              type="number"
              value={formData.calories}
              onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
              placeholder="Optional"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Notes</label>
            <Input
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Add notes about your workout"
            />
          </div>

          <Button type="submit" className="w-full bg-pink-dark hover:bg-pink-600">
            Save Exercise
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
} 