import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockUsers } from "@/lib/mock/users";

export function ProfilePage() {
  const user = mockUsers[0];

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-pink-dark mb-6">My Profile</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-gray-500">Name</label>
              <p className="font-medium">{user.firstName} {user.lastName}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Email</label>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Phone</label>
              <p className="font-medium">{user.phoneNumber}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Goals & Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Your Goals</label>
                <ul className="list-disc list-inside mt-2">
                  {user.goals?.map((goal) => (
                    <li key={goal} className="text-gray-600">{goal}</li>
                  ))}
                </ul>
              </div>
              <div>
                <label className="text-sm text-gray-500">Preferences</label>
                <div className="mt-2 space-y-2">
                  <p className="text-gray-600">
                    Language: {user.preferences.language.toUpperCase()}
                  </p>
                  <p className="text-gray-600">
                    Measurement Unit: {user.preferences.measurementUnit}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}