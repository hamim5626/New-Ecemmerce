"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      // Check if user exists in localStorage
      const stored = localStorage.getItem("auth_user");
      console.log("ProtectedRoute - stored user:", stored);
      console.log("ProtectedRoute - context user:", user);
      console.log("ProtectedRoute - isLoading:", isLoading);
      
      // Only proceed if AuthContext has finished loading
      if (!isLoading) {
        if (!stored && !user) {
          console.log("ProtectedRoute - No user found, redirecting to home");
          router.push("/");
        }
        setIsChecking(false);
      }
    };

    // Check auth when loading state changes
    if (!isLoading) {
      checkAuth();
    }
  }, [user, isLoading, router]);

  // Show loading while checking authentication
  if (isChecking || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If no user, show access denied message
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to access this page.</p>
          <button
            onClick={() => router.push("/")}
            className="bg-heading text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute; 