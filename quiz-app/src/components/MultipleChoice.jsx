import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

export default function MultipleChoice({ data, selectedAnswer, onChange, isSubmitted }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 transition-all duration-300 hover:shadow-md">
      <div className="text-lg font-semibold text-gray-800 mb-4 prose prose-slate">
        <ReactMarkdown remarkPlugins={[remarkBreaks, remarkGfm]}>{data.question}</ReactMarkdown>
      </div>
      <div className="space-y-3">
        {data.options.map((option) => {
          const isSelected = selectedAnswer === option.key;
          let baseClass = "flex items-start p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ";
          
          if (!isSubmitted) {
            baseClass += isSelected 
              ? "border-blue-500 bg-blue-50" 
              : "border-gray-200 hover:border-blue-300 hover:bg-gray-50";
          } else {
            // Submitted state logic
            if (option.isCorrect) {
              baseClass += "border-green-500 bg-green-50";
            } else if (isSelected && !option.isCorrect) {
              baseClass += "border-red-500 bg-red-50";
            } else {
              baseClass += "border-gray-200 opacity-50";
            }
          }

          return (
            <label key={option.key} className={baseClass}>
              <div className="flex items-center h-5 mt-1">
                <input
                  type="radio"
                  name={data.id}
                  value={option.key}
                  checked={isSelected}
                  onChange={() => !isSubmitted && onChange(data.id, option.key)}
                  disabled={isSubmitted}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
              </div>
              <div className="ml-3 flex-1 flex items-start">
                <span className="font-bold mr-2 mt-[2px]">{option.key}.</span>
                <div className="text-gray-700 prose prose-slate flex-1">
                  <ReactMarkdown 
                    remarkPlugins={[remarkBreaks, remarkGfm]}
                    components={{ p: 'span' }}
                  >
                    {option.text}
                  </ReactMarkdown>
                  
                  {isSubmitted && option.isCorrect && (
                    <span className="ml-2 text-green-600 font-bold inline-block">✓</span>
                  )}
                  {isSubmitted && isSelected && !option.isCorrect && (
                    <span className="ml-2 text-red-600 font-bold inline-block">✗</span>
                  )}
                </div>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
