import { Link } from 'react-router-dom';

export const Navigation = () => {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-gray-800 hover:text-gray-600">
              Home
            </Link>
            <Link to="/services" className="text-gray-800 hover:text-gray-600">
              Services
            </Link>
            <Link to="/bookings" className="text-gray-800 hover:text-gray-600">
              Bookings
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};