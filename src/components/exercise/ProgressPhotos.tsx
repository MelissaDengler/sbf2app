import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Camera, Upload, Calendar } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { useLocalStorage } from "@/hooks/useLocalStorage"

interface ProgressPhoto {
  id: string
  url: string
  date: Date
  notes?: string
  measurements?: {
    weight?: number
    chest?: number
    waist?: number
    hips?: number
    arms?: number
    legs?: number
  }
}

export function ProgressPhotos() {
  const [photos, setPhotos] = useLocalStorage<ProgressPhoto[]>("progress-photos", [])
  const [selectedPhoto, setSelectedPhoto] = useState<ProgressPhoto | null>(null)

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Convert to base64 for storage
    const reader = new FileReader()
    reader.onloadend = () => {
      const newPhoto: ProgressPhoto = {
        id: Date.now().toString(),
        url: reader.result as string,
        date: new Date(),
        measurements: {
          weight: 0,
          chest: 0,
          waist: 0,
          hips: 0,
          arms: 0,
          legs: 0
        }
      }
      setPhotos([newPhoto, ...photos])
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Progress Photos</h2>
        <Button className="bg-pink-dark hover:bg-pink-600">
          <Camera className="h-4 w-4 mr-2" />
          Add Photo
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoUpload}
          />
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {photos.map((photo, i) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="aspect-square relative overflow-hidden rounded-t-lg">
                <img
                  src={photo.url}
                  alt={`Progress photo from ${photo.date.toLocaleDateString()}`}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardContent className="p-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  {photo.date.toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Photo comparison modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Modal content */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 