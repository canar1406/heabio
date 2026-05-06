import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default function TrueFalse({ data, selectedAnswers, onChange, isSubmitted }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 transition-all duration-300 hover:shadow-md">
      <div className="text-lg font-semibold text-gray-800 mb-4 prose prose-slate max-w-none">
        <ReactMarkdown 
          remarkPlugins={[remarkBreaks, remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {data.question}
        </ReactMarkdown>
      </div>
      
      <div className="space-y-4">
        {data.statements.map((stmt) => {
          const answer = selectedAnswers?.[stmt.id];
          const isCorrect = answer === stmt.isTrue;
          
          let containerClass = "p-4 rounded-lg border-2 transition-all duration-200 ";
          
          if (!isSubmitted) {
             containerClass += answer !== undefined ? "border-blue-200 bg-blue-50/30" : "border-gray-100";
          } else {
             if (answer === undefined) {
                 containerClass += "border-red-200 bg-red-50/50";
             } else if (isCorrect) {
                 containerClass += "border-green-500 bg-green-50";
             } else {
                 containerClass += "border-red-500 bg-red-50";
             }
          }

          return (
            <div key={stmt.id} className={containerClass}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1 flex items-start">
                    <span className="font-bold mr-2 mt-1">{stmt.id})</span>
                    <div className="text-gray-700 prose prose-slate inline-block max-w-none">
                        <ReactMarkdown 
                          remarkPlugins={[remarkBreaks, remarkGfm, remarkMath]}
                          rehypePlugins={[rehypeKatex]}
                          components={{ p: 'span' }}
                        >
                          {stmt.text}
                        </ReactMarkdown>
                    </div>
                </div>
                
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    disabled={isSubmitted}
                    onClick={() => onChange(data.id, stmt.id, true)}
                    className={`px-4 py-2 rounded-md font-medium text-sm transition-colors border ${
                      answer === true
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    } ${isSubmitted ? 'opacity-80 cursor-not-allowed' : ''}`}
                  >
                    Đúng
                  </button>
                  <button
                    type="button"
                    disabled={isSubmitted}
                    onClick={() => onChange(data.id, stmt.id, false)}
                    className={`px-4 py-2 rounded-md font-medium text-sm transition-colors border ${
                      answer === false
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    } ${isSubmitted ? 'opacity-80 cursor-not-allowed' : ''}`}
                  >
                    Sai
                  </button>
                </div>
              </div>
              
              {isSubmitted && (
                <div className="mt-2 text-sm font-medium">
                  {answer === undefined && <span className="text-red-500">Chưa trả lời. </span>}
                  {answer !== undefined && (
                      isCorrect 
                      ? <span className="text-green-600 flex items-center gap-1">✓ Trả lời đúng</span>
                      : <span className="text-red-600 flex items-center gap-1">✗ Trả lời sai</span>
                  )}
                  <span className="text-gray-600 ml-2">
                      (Đáp án: <span className="font-bold text-green-600">{stmt.isTrue ? "Đúng" : "Sai"}</span>)
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
