import React from 'react'
import { Link } from "react-router-dom";

const PageNotFound = () => {
 
     return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-7xl font-extrabold text-red-500">404</h1>
      <p className="mt-4 text-xl text-gray-700">Page Not Found</p>
      <Link
        to="/"
        className="mt-6 rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
      >
        Go Home
      </Link>
    </div>
  );
  
}

export default PageNotFound