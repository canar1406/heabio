import React, { useEffect, useState } from 'react';

export default function Sidebar({ score, stats, onSubmit, isSubmitted, onRetake, onBack }) {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (!isSubmitted) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSubmitted]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="w-full lg:w-80 shrink-0">
      <div className="sticky top-6 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-20 h-20 bg-white opacity-10 rounded-full blur-xl"></div>
            
            <h3 className="text-sm font-medium opacity-90 uppercase tracking-wider mb-2">
                {isSubmitted ? 'Điểm của bạn' : 'Thời gian làm bài'}
            </h3>
            
            {isSubmitted ? (
                <div className="text-5xl font-black tabular-nums tracking-tight">
                    {score.toFixed(2)}<span className="text-2xl text-blue-200 font-medium">/10</span>
                </div>
            ) : (
                <div className="text-4xl font-mono font-bold tabular-nums">
                    {formatTime(timer)}
                </div>
            )}
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
            <div className="space-y-3">
                <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Tình trạng:</span>
                    <span className={`font-semibold px-2 py-1 rounded-full text-xs ${isSubmitted ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                        {isSubmitted ? 'Đã nộp bài' : 'Đang làm bài'}
                    </span>
                </div>
                {isSubmitted && (
                    <>
                        <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                            <span className="text-gray-500">Thời gian nộp:</span>
                            <span className="font-semibold text-gray-800">{formatTime(timer)} phút</span>
                        </div>
                        <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                            <span className="text-gray-500">Số thao tác đúng:</span>
                            <span className="font-semibold text-gray-800">{stats.correctOperations} / {stats.totalOperations}</span>
                        </div>
                    </>
                )}
            </div>

            {!isSubmitted ? (
                <button
                    onClick={() => {
                        if (window.confirm('Bạn có chắc chắn muốn nộp bài?')) {
                            onSubmit();
                        }
                    }}
                    className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-500/30 transition-all active:scale-[0.98] flex justify-center items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Nộp Bài
                </button>
            ) : (
                <div className="space-y-3">
                    <button
                        onClick={onRetake}
                        className="w-full py-3 px-4 bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-100 font-bold rounded-xl transition-all active:scale-[0.98] flex justify-center items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                        </svg>
                        Làm Lại Bài Này
                    </button>
                    <button
                        onClick={onBack}
                        className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all active:scale-[0.98] flex justify-center items-center gap-2"
                    >
                        Trở Về Trang Chủ
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
