
import React, { useState, useCallback, useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import { LotteryType, LotteryResult, Template } from './types';
import { fetchLotteryData } from './services/lotteryService';
import { generateLuckyPhrase } from './services/geminiService';
import { AVAILABLE_TEMPLATES } from './constants';
import Header from './components/Header';
import LotterySelector from './components/LotterySelector';
import TemplateSelector from './components/TemplateSelector';
import CanvasPreview from './components/CanvasPreview';
import { Download, Zap, Loader, Image as ImageIcon, AlertTriangle } from 'lucide-react';

export default function App() {
  const [selectedLottery, setSelectedLottery] = useState<LotteryType | null>(LotteryType.MEGA_SENA);
  const [lotteryData, setLotteryData] = useState<LotteryResult | null>(null);
  const [luckyPhrase, setLuckyPhrase] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(AVAILABLE_TEMPLATES[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);

  const handleGenerate = useCallback(async () => {
    if (!selectedLottery) return;

    setIsLoading(true);
    setError(null);
    setWarning(null);
    setLotteryData(null);

    try {
      const data = await fetchLotteryData(selectedLottery);
      
      let phrase: string;
      try {
        phrase = await generateLuckyPhrase(selectedLottery);
      } catch (err) {
        console.error("Error generating lucky phrase:", err);
        phrase = "Que a sorte esteja com você! Confira o resultado."; // Fallback phrase
        setWarning('Não foi possível gerar a frase da sorte.');
      }

      setLotteryData(data);
      setLuckyPhrase(phrase);

      if (data.isSampleData) {
        setWarning(prev => {
            const dataWarning = 'Atenção: Não foi possível buscar o resultado mais recente. Estamos exibindo um exemplo.';
            return prev ? `${dataWarning} ${prev}` : dataWarning;
        });
      }

    } catch (err) {
      console.error(err);
      const errorMessage = 'Ocorreu um erro inesperado. Tente novamente.';
      setError(errorMessage);
      setLuckyPhrase('A sorte está a caminho, tente novamente!');
    } finally {
      setIsLoading(false);
    }
  }, [selectedLottery]);


  const handleDownload = useCallback(() => {
    if (!canvasRef.current || !lotteryData) return;
    setIsDownloading(true);
    htmlToImage.toPng(canvasRef.current, { cacheBust: true, pixelRatio: 2 })
      .then((dataUrl: string) => {
        const link = document.createElement('a');
        const lotteryName = selectedLottery?.replace(/\s+/g, '-') || 'loteria';
        const fileNamePart = lotteryData.contestNumber;

        link.download = `${lotteryName}-${fileNamePart}${lotteryData.isSampleData ? '-exemplo' : ''}.png`;
        link.href = dataUrl;
        link.click();
        setIsDownloading(false);
      })
      .catch((err: any) => {
        console.error('oops, something went wrong!', err);
        setError('Não foi possível gerar a imagem. Tente novamente.');
        setIsDownloading(false);
      });
  }, [canvasRef, lotteryData, selectedLottery]);

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls Column */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg h-fit space-y-8">
            <div>
              <h2 className="text-xl font-bold text-slate-700 mb-4">1. Escolha a Loteria</h2>
              <LotterySelector selected={selectedLottery} onSelect={setSelectedLottery} />
            </div>

            <div className="w-full">
              <button
                onClick={handleGenerate}
                disabled={isLoading || !selectedLottery}
                className="w-full flex items-center justify-center gap-3 bg-brand-primary text-white font-bold py-4 px-4 rounded-xl hover:bg-blue-800 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-slate-400 disabled:scale-100 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader className="animate-spin" size={24} />
                    Gerando...
                  </>
                ) : (
                  <>
                    <Zap size={24} />
                    Gerar Post do Resultado
                  </>
                )}
              </button>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-700 mb-4">2. Selecione o Template</h2>
              <TemplateSelector templates={AVAILABLE_TEMPLATES} selected={selectedTemplate} onSelect={setSelectedTemplate} />
            </div>
          </div>

          {/* Preview Column */}
          <div className="lg:col-span-2">
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg sticky top-8">
                {error && (
                    <div role="alert" className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-r-lg">
                        <div className="flex">
                            <div className="flex-shrink-0 pt-0.5">
                                <AlertTriangle className="h-5 w-5 text-red-400" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-bold text-red-800">Erro na Geração</p>
                                <p className="text-sm text-red-700 mt-1">{error}</p>
                            </div>
                        </div>
                    </div>
                )}
                {warning && !error && (
                    <div role="alert" className="mb-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 rounded-r-lg">
                       <div className="flex">
                            <div className="flex-shrink-0 pt-0.5">
                                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-bold text-yellow-800">Aviso</p>
                                <p className="text-sm text-yellow-700 mt-1">{warning}</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="w-full max-w-[550px] mx-auto">
                    {lotteryData ? (
                        <>
                            <div className="aspect-[3/4] border border-slate-200 rounded-2xl overflow-hidden shadow-inner bg-slate-50">
                                <CanvasPreview ref={canvasRef} template={selectedTemplate} data={lotteryData} luckyPhrase={luckyPhrase} />
                            </div>
                            <div className="mt-6 flex justify-center">
                                <button
                                    onClick={handleDownload}
                                    disabled={isDownloading}
                                    className="w-full max-w-md flex items-center justify-center gap-3 bg-brand-green text-white font-bold py-4 px-4 rounded-xl hover:bg-green-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:bg-slate-400 disabled:scale-100"
                                >
                                    {isDownloading ? (
                                        <>
                                            <Loader className="animate-spin" size={24} />
                                            Baixando...
                                        </>
                                    ) : (
                                        <>
                                            <Download size={24} />
                                            Baixar Imagem PNG
                                        </>
                                    )}
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="aspect-[3/4] border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center bg-slate-50/80 text-slate-500 p-8">
                            <ImageIcon size={64} className="mb-4 opacity-50" />
                            <h3 className="text-xl font-bold">Aguardando Geração</h3>
                            <p className="text-base text-center max-w-xs mt-2">Escolha uma loteria e clique em "Gerar Post do Resultado" para visualizar a arte final aqui.</p>
                        </div>
                    )}
                </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}