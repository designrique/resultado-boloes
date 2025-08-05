import React, { forwardRef } from 'react';
import { Template, LotteryFetchResponse } from '../types';

interface CanvasPreviewProps {
  template: Template;
  data: LotteryFetchResponse;
  luckyPhrase: string;
}

const CanvasPreview = forwardRef<HTMLDivElement, CanvasPreviewProps>(
  ({ template: SelectedTemplate, data, luckyPhrase }, ref) => {
    return (
      <div ref={ref} className="w-full aspect-[3/4] bg-white p-6 flex flex-col items-stretch justify-center">
        {/* Main content box */}
        <div className="flex-grow w-full h-0 shadow-lg rounded-2xl overflow-hidden">
          <SelectedTemplate.component data={data} luckyPhrase={luckyPhrase} />
        </div>
        
        {/* Watermark/Handle */}
        <div className="flex-shrink-0 text-center pt-5">
            <p className="text-slate-500 font-semibold text-lg tracking-wider">@loteriaencruzilhada</p>
        </div>
      </div>
    );
  }
);

CanvasPreview.displayName = 'CanvasPreview';

export default CanvasPreview;
