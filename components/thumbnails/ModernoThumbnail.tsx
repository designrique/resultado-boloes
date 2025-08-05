
import React from 'react';

const ModernoThumbnail: React.FC = () => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-100 flex items-center justify-center p-2 relative overflow-hidden">
      {/* Simplified decorative spheres */}
      <div className="absolute w-8 h-8 rounded-full bg-blue-200/50 -top-2 -right-2"></div>
      <div className="absolute w-12 h-12 rounded-full bg-blue-200/50 -bottom-4 -left-3"></div>

      {/* Simplified main card */}
      <div className="w-4/5 h-3/5 bg-blue-600 rounded-2xl shadow-md flex flex-col items-center justify-center p-2">
         <div className="w-4/5 h-1/4 bg-white rounded-full mb-2"></div>
         <div className="grid grid-cols-3 gap-1 w-full px-2">
            <div className="w-4 h-4 bg-white rounded-full"></div>
            <div className="w-4 h-4 bg-white rounded-full"></div>
            <div className="w-4 h-4 bg-white rounded-full"></div>
            <div className="w-4 h-4 bg-white rounded-full"></div>
            <div className="w-4 h-4 bg-white rounded-full"></div>
            <div className="w-4 h-4 bg-white rounded-full"></div>
         </div>
      </div>
    </div>
  );
};

export default ModernoThumbnail;
