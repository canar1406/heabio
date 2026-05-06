import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

export default function ShortAnswer({ data, selectedAnswer, onChange, isSubmitted }) {
  const isCorrect = isSubmitted && selectedAnswer?.trim().toLowerCase() === data.correctAnswer?.trim().toLowerCase();
  
  let inputClass = "w-full md:w-1/2 px-4 py-3 rounded-lg border-2 outline-none transition-all duration-200 ";
  
  if (!isSubmitted) {
      inputClass += "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200";
  } else {
      if (isCorrect) {
          inputClass += "border-green-500 bg-green-50 text-green-900";
      } else {
          inputClass += "border-red-500 bg-red-50 text-red-900";
      }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 transition-all duration-300 hover:shadow-md">
      <div className="text-lg font-semibold text-gray-800 mb-4 prose prose-slate">
        <ReactMarkdown remarkPlugins={[remarkBreaks, remarkGfm]}>{data.question}</ReactMarkdown>
      </div>
      
      <div className="mt-4">
        <input
          type="text"
          value={selectedAnswer || ''}
          onChange={(e) => !isSubmitted && onChange(data.id, e.target.value)}
          disabled={isSubmitted}
          placeholder="Nhập câu trả lời của bạn..."
          className={inputClass}
        />
        
        {isSubmitted && (
          <div className="mt-3 text-sm font-medium">
            {isCorrect ? (
              <span className="text-green-600 flex items-center gap-1">✓ Trả lời chính xác</span>
            ) : (
              <div className="text-red-600 flex flex-col gap-1">
                <span className="flex items-center gap-1">✗ Trả lời chưa chính xác</span>
                <span className="text-gray-700">Đáp án đúng: <strong className="text-green-600 bg-green-50 px-2 py-1 rounded">{data.correctAnswer}</strong></span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
