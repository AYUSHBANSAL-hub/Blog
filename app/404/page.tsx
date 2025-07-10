"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // Adjust if you're using another UI lib

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6 text-center">
      <h1 className="text-6xl font-bold text-black mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">Oops! Page not found.</p>
      <p className="text-sm text-gray-500 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button onClick={() => router.push("/")}>Go Back Home</Button>
    </div>
  );
}
