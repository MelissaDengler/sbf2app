import { Navigation } from "@/components/layout/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Mail, Phone, Calendar } from "lucide-react"
import { useAuthStore } from "@/lib/stores/auth.store"

export function Profile() {
  const user = useAuthStore((state) => state.user)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="mt-1 text-gray-500">Manage your personal information</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-pink-dark" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <img
                    className="h-20 w-20 rounded-full"
                    src={`https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=ff69b4&color=fff&size=80`}
                    alt="Profile"
                  />
                  <Button variant="outline">Change Photo</Button>
                </div>
                <div className="grid gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Name</label>
                    <p className="mt-1">{user?.firstName} {user?.lastName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1">{user?.email}</p>
                  </div>
                </div>
                <Button className="w-full">Edit Profile</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-pink-dark" />
                Membership Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Member Since</label>
                  <p className="mt-1">{new Date(user?.createdAt || '').toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Membership Status</label>
                  <p className="mt-1">Active</p>
                </div>
                <Button variant="outline" className="w-full">View Membership Options</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
} 