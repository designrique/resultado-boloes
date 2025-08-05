
import React, { useState, useEffect, useMemo } from 'react';
import { LotteryType, LotteryResult, Template } from '../types';
import { fetchLotteryData } from '../services/lotteryService';
import { generateLuckyPhrase } from '../services/geminiService';
import { AVAILABLE_TEMPLATES } from '../constants';
import { Loader, AlertTriangle } from 'lucide-react';

// This component is designed for headless rendering via n8n/Puppeteer.
// It reads config from URL params and renders only the final image.
export default function RenderPage() {
  const [lotteryData, setLotteryData] = useState<LotteryResult | null>(null);
  const [luckyPhrase, setLuckyPhrase] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { lotteryType, template } = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const lotteryParam = params.get('lottery') as LotteryType;
    const templateId = params.get('template') || AVAILABLE_TEMPLATES[0].id;
    const selectedTemplate = AVAILABLE_TEMPLATES.find(t => t.id === templateId) || AVAILABLE_TEMPLATES[0];
    return { lotteryType: lotteryParam, template: selectedTemplate };
  }, []);

  useEffect(() => {
    const generatePost = async () => {
      if (!lotteryType || !Object.values(LotteryType).includes(lotteryType)) {
        setError(`Loteria inválida ou não fornecida. Use o parâmetro ?lottery=... com um valor válido (${Object.values(LotteryType).join(', ')}).`);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchLotteryData(lotteryType);
        
        let phrase = "Que a sorte esteja com você!"; // Fallback
        try {
          phrase = await generateLuckyPhrase(lotteryType);
        } catch (err) {
          console.error("Could not generate lucky phrase, using fallback.", err);
        }

        setLotteryData(data);
        setLuckyPhrase(phrase);
      } catch (err: any) {
        console.error("Failed to generate post:", err);
        setError(`Erro ao gerar o post: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    generatePost();
  }, [lotteryType]);

  const SelectedTemplateComponent = template.component;

  return (
    <div className="w-screen h-screen bg-gray-200 flex items-center justify-center">
      {isLoading && (
        <div className="flex flex-col items-center gap-4 text-slate-600">
          <Loader className="animate-spin" size={48} />
          <p className="font-medium">Gerando imagem do post...</p>
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700 max-w-md">
            <div className="flex">
                <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                    <p className="text-sm font-medium">{error}</p>
                </div>
            </div>
        </div>
      )}
      {lotteryData && (
        // This is the div that Puppeteer will screenshot.
        // Fixed size for consistency. 3:4 aspect ratio.
        <div id="capture-target" style={{ width: '810px', height: '1080px' }}>
            <div className="w-full h-full bg-white p-[30px] flex flex-col items-stretch justify-center">
                <div className="flex-grow w-full h-0 shadow-lg rounded-2xl overflow-hidden">
                    <SelectedTemplateComponent data={lotteryData} luckyPhrase={luckyPhrase} />
                </div>
                <div className="flex-shrink-0 text-center pt-5">
                    <p className="text-slate-500 font-semibold text-lg tracking-wider">@loteriaencruzilhada</p>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}
