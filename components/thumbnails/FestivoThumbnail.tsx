
import React from 'react';

const FestivoThumbnail: React.FC = () => {
  return (
    <div className="w-full h-full bg-slate-800 p-2 flex flex-col justify-around items-center relative overflow-hidden">
        {/* Simplified Confetti */}
        <div className="absolute w-5 h-5 bg-slate-700 rounded-sm -top-1 -left-1"></div>
        <div className="absolute w-8 h-8 bg-slate-700 rounded-sm -bottom-2 -right-2 transform rotate-12"></div>
        
        {/* Simplified Header */}
        <div className="w-3/4 h-1/4 bg-green-400/20 rounded-md flex justify-center items-center">
            <div className="w-4/5 h-1/2 bg-green-400/50 rounded-sm"></div>
        </div>

        {/* Simplified Numbers */}
        <div className="grid grid-cols-3 gap-1">
            <div className="w-5 h-5 bg-slate-700 border border-slate-600 rounded-sm"></div>
            <div className="w-5 h-5 bg-slate-700 border border-slate-600 rounded-sm"></div>
            <div className="w-5 h-5 bg-slate-700 border border-slate-600 rounded-sm"></div>
            <div className="w-5 h-5 bg-slate-700 border border-slate-600 rounded-sm"></div>
            <div className="w-5 h-5 bg-slate-700 border border-slate-600 rounded-sm"></div>
            <div className="w-5 h-5 bg-slate-700 border border-slate-600 rounded-sm"></div>
        </div>

        {/* Simplified Footer */}
        <div className="w-full h-1/5 bg-slate-900/50 rounded-md"></div>
    </div>
  );
};

export default FestivoThumbnail;
