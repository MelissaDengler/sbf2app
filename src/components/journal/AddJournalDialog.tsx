import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import toast from "react-hot-toast"

const moods = [
  "Happy",
  "Calm",
  "Anxious",
  "Energetic",
  "Tired",
  "Stressed",
  "Grateful",
  "Motivated"
]

interface JournalEntry {
  id: string
  title: string
  content: string
  mood: string
  date: string
  tags: string[]
}

interface AddJournalDialogProps {
  onAddEntry: (entry: JournalEntry) => void
}

export function AddJournalDialog({ onAddEntry }: AddJournalDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    mood: "",
    tags: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.content || !formData.mood) {
      toast.error("Please fill in all required fields")
      return
    }

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      ...formData,
      date: new Date().toISOString(),
      tags: formData.tags.split(",").map(tag => tag.trim()).filter(Boolean)
    }

    onAddEntry(newEntry)
    setOpen(false)
    toast.success("Journal entry added successfully!")
    
    setFormData({
      title: "",
      content: "",
      mood: "",
      tags: ""
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-pink-dark hover:bg-pink-600">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Entry
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Journal Entry</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="How are you feeling today?"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Mood</label>
            <Select
              value={formData.mood}
              onValueChange={(value) => setFormData({ ...formData, mood: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your mood" />
              </SelectTrigger>
              <SelectContent>
                {moods.map((mood) => (
                  <SelectItem key={mood} value={mood}>
                    {mood}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Content</label>
            <Textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Write your thoughts..."
              className="h-32"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tags</label>
            <Input
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="Enter tags separated by commas"
            />
          </div>

          <Button type="submit" className="w-full bg-pink-dark hover:bg-pink-600">
            Save Entry
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
} 