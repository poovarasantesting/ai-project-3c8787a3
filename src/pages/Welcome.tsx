import { useAuth } from "../context/AuthContext";
import { LogOut } from "lucide-react";

export default function Welcome() {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 text-center">
        <div>
          <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Welcome, {user?.name}!
          </h1>
          <p className="mt-2 text-gray-600">
            You have successfully logged in.
          </p>
        </div>
        
        <div className="flex justify-center">
          <img 
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDE1ZTRxbmw0OTg0cjlkZ3Q3Y3VyNnd0am05dGIwYjgzcnJ1OHA1NCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/3oz8xUK8V7suY7W9SE/giphy.gif" 
            alt="Welcome celebration" 
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>
        
        <button
          onClick={logout}
          className="mt-4 inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}