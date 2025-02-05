export const mockUsers = [
  {
    id: '1',
    email: 'jane@example.com',
    firstName: 'Jane',
    lastName: 'Doe',
    phoneNumber: '+27123456789',
    goals: ['Weight Loss', 'Toning', 'Wellness'],
    preferences: {
      notifications: true,
      language: 'en',
      darkMode: false,
      measurementUnit: 'metric',
      emailNotifications: {
        appointments: true,
        promotions: true,
        newsletter: true
      }
    },
    paymentMethods: [
      {
        id: 'pm_1',
        type: 'card',
        lastFour: '4242',
        isDefault: true,
        brand: 'Visa',
        expiryMonth: 12,
        expiryYear: 2025
      }
    ],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-02-15')
  }
];