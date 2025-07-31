import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center px-4">
      <h1 className="text-6xl font-bold text-emerald-600 mb-4">404</h1>
      <p className="text-xl mb-6">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="text-emerald-500 hover:text-emerald-700 font-semibold"
      >
        Go back to Home
      </Link>
    </div>
  );
}
