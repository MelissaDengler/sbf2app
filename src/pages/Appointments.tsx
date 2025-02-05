import { Navigation } from "@/components/layout/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User as UserIcon } from "lucide-react"
import { BookingDialog } from "@/components/appointments/BookingDialog"
import toast from "react-hot-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function Appointments() {
  const appointments = [
    {
      id: 1,
      title: "Wellness Consultation",
      date: "2024-02-28",
      time: "10:00 AM",
      therapist: "Dr. Sarah Johnson",
      status: "upcoming",
    },
    {
      id: 2,
      title: "Massage Therapy",
      date: "2024-02-28",
      time: "2:30 PM",
      therapist: "John Smith",
      status: "upcoming",
    },
    {
      id: 3,
      title: "Nutrition Consultation",
      date: "2024-02-25",
      time: "11:00 AM",
      therapist: "Dr. Emily Chen",
      status: "completed",
    },
  ]

  const handleCancel = (appointmentId: number) => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: 'Cancelling appointment...',
        success: 'Appointment cancelled successfully!',
        error: 'Could not cancel appointment.',
      }
    )
  }

  const handleReschedule = (appointmentId: number) => {
    toast.success("Opening reschedule calendar...")
    // Implement reschedule logic
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
            <p className="mt-1 text-gray-500">Manage your appointments</p>
          </div>
          <BookingDialog />
        </div>

        <div className="grid gap-6">
          {appointments.map((appointment) => (
            <Card key={appointment.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-pink-dark" />
                    {appointment.title}
                  </span>
                  <span className={`text-sm px-3 py-1 rounded-full ${
                    appointment.status === 'upcoming' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {appointment.date} at {appointment.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UserIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {appointment.therapist}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleReschedule(appointment.id)}
                    >
                      Reschedule
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" className="flex-1 hover:bg-red-50 hover:text-red-600">
                          Cancel
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to cancel this appointment? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Keep Appointment</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700"
                            onClick={() => handleCancel(appointment.id)}
                          >
                            Cancel Appointment
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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