import React from 'react';
import { Link } from 'react-router-dom';

export default function Home({ quizzes }) {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4 tracking-tight">
            HeaBio
          </h1>
          <p className="text-lg text-gray-600">Nền tảng làm bài tập trắc nghiệm trực tuyến</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quizzes.map(quiz => (
            <Link 
              to={`/quiz/${quiz.slug}`}
              key={quiz.id} 
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col"
            >
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight flex-1">{quiz.title}</h3>
              <div className="flex items-center text-sm font-medium text-blue-600 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                Bắt đầu làm bài
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
          {quizzes.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              Đang tải dữ liệu hoặc không có bài thi nào...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
