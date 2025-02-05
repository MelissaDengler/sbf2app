import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Clock } from "lucide-react"
import toast from "react-hot-toast"

const AVAILABLE_TIMES = [
  "09:00 AM", "10:00 AM", "11:00 AM",
  "02:00 PM", "03:00 PM", "04:00 PM"
]

const SERVICES = [
  { id: 1, name: "Wellness Consultation", duration: "1 hour", price: "$120" },
  { id: 2, name: "Massage Therapy", duration: "1.5 hours", price: "$150" },
  { id: 3, name: "Nutrition Consultation", duration: "45 mins", price: "$90" },
]

export function BookingDialog() {
  const [date, setDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>()
  const [selectedService, setSelectedService] = useState<number>()

  const handleBooking = () => {
    if (!date || !selectedTime || !selectedService) {
      toast.error("Please select all booking details")
      return
    }

    // Mock booking creation
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: 'Creating your appointment...',
        success: 'Appointment booked successfully!',
        error: 'Could not book appointment.',
      }
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-pink-dark hover:bg-pink-600">
          Book New Appointment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book an Appointment</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <h3 className="font-medium">Select Service</h3>
            <div className="grid gap-2">
              {SERVICES.map((service) => (
                <div
                  key={service.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedService === service.id
                      ? "border-pink-dark bg-pink-50"
                      : "hover:border-gray-400"
                  }`}
                  onClick={() => setSelectedService(service.id)}
                >
                  <div className="flex justify-between">
                    <span className="font-medium">{service.name}</span>
                    <span className="text-pink-dark">{service.price}</span>
                  </div>
                  <span className="text-sm text-gray-500">{service.duration}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Select Date</h3>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              disabled={(date) => date < new Date() || date.getDay() === 0}
            />
          </div>

          {date && (
            <div className="space-y-2">
              <h3 className="font-medium">Select Time</h3>
              <div className="grid grid-cols-3 gap-2">
                {AVAILABLE_TIMES.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    className={selectedTime === time ? "bg-pink-dark" : ""}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <Button
            className="w-full mt-4 bg-pink-dark hover:bg-pink-600"
            onClick={handleBooking}
            disabled={!date || !selectedTime || !selectedService}
          >
            Confirm Booking
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 