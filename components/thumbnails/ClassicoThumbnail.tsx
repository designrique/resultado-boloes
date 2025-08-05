
import React from 'react';

const ClassicoThumbnail: React.FC = () => {
  return (
    <div className="w-full h-full bg-white p-1 flex flex-col border-4 border-slate-200">
      {/* Simplified Header */}
      <div className="h-1/5 bg-green-100 rounded-sm mb-2 flex items-center justify-center">
        <div className="w-3/4 h-3/4 bg-green-200 rounded-sm"></div>
      </div>
      
      {/* Simplified Numbers */}
      <div className="flex-grow flex flex-wrap gap-1 justify-center items-center">
        <div className="w-4 h-4 border-2 border-green-500 rounded-full"></div>
        <div className="w-4 h-4 border-2 border-green-500 rounded-full"></div>
        <div className="w-4 h-4 border-2 border-green-500 rounded-full"></div>
        <div className="w-4 h-4 border-2 border-green-500 rounded-full"></div>
        <div className="w-4 h-4 border-2 border-green-500 rounded-full"></div>
        <div className="w-4 h-4 border-2 border-green-500 rounded-full"></div>
      </div>
      
      {/* Simplified Footer */}
      <div className="h-1/5 border-t-2 border-slate-200 mt-2 pt-1 flex items-center justify-center">
          <div className="w-3/4 h-3/4 bg-red-200 rounded-sm"></div>
      </div>
    </div>
  );
};

export default ClassicoThumbnail;
