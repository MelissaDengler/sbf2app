import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockServices } from "@/lib/mock/services";
import { mockUsers } from "@/lib/mock/users";

export function DashboardPage() {
  const user = mockUsers[0];
  
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-pink-dark">Welcome Back, {user.firstName}!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Your next appointment is tomorrow at 2:00 PM</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-pink-dark">Your Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {user.goals?.map((goal) => (
                <li key={goal} className="text-gray-600">{goal}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-pink-dark">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <button className="w-full p-2 bg-pink-light hover:bg-pink text-gray-700 rounded-md transition-colors">
              Book Appointment
            </button>
            <button className="w-full p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors">
              View Progress
            </button>
          </CardContent>
        </Card>
      </div>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-pink-dark">Our Services</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockServices.map((service) => (
            <Card key={service.id}>
              <CardHeader>
                <CardTitle className="text-lg">{service.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">R{service.price}</span>
                  <span className="text-sm text-gray-500">{service.duration} mins</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}