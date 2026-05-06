import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
                H
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                HeaBio
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link 
              to="/"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Trang Chủ
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
