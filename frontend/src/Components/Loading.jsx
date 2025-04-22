import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Glassmorphism card */}
      <div className="relative p-10 rounded-2xl backdrop-blur-xl bg-white/40 shadow-xl border border-white/30">
        {/* Glowing Spinner */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
          <div className="absolute inset-0 w-20 h-20 rounded-full bg-blue-300 opacity-30 blur-2xl animate-ping"></div>
        </div>

        {/* Loading Text */}
        <p className="mt-6 text-lg font-semibold text-blue-700 animate-pulse tracking-wide">
          Loading, please wait...
        </p>
      </div>

      {/* Optional shimmer light effect */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-[-50%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_2s_infinite]"></div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
