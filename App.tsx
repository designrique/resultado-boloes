
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
      // fetchLotteryData is now resilient and returns sample data on failure.
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
        // Append to warning if one already exists from phrase generation
        setWarning(prev => {
            const dataWarning = 'Atenção: Não foi possível buscar o resultado mais recente. Estamos exibindo um exemplo.';
            return prev ? `${dataWarning} ${prev}` : dataWarning;
        });
      }

    } catch (err) {
      // This catch is now for truly unexpected errors, as the two main async calls are handled internally.
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
  }, [lotteryData, selectedLottery]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls Column */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl font-bold text-slate-700 mb-1 flex items-center">
                <span className="bg-brand-primary text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 font-bold text-lg">1</span>
                Escolha a Loteria
              </h2>
              <p className="text-slate-500 mb-4 ml-11">Selecione para qual loteria deseja gerar o post.</p>
              <LotterySelector selected={selectedLottery} onSelect={(l) => {
                setSelectedLottery(l);
                setLotteryData(null); // Reset preview when lottery changes
                setWarning(null);
              }} />
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl font-bold text-slate-700 mb-1 flex items-center">
                <span className="bg-brand-primary text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 font-bold text-lg">2</span>
                Escolha o Template
              </h2>
              <p className="text-slate-500 mb-4 ml-11">Selecione o visual do seu post.</p>
              <TemplateSelector templates={AVAILABLE_TEMPLATES} selected={selectedTemplate} onSelect={setSelectedTemplate} />
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl font-bold text-slate-700 mb-1 flex items-center">
                <span className="bg-brand-primary text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 font-bold text-lg">3</span>
                Gere o Post
              </h2>
              <p className="text-slate-500 mb-4 ml-11">Tudo pronto? Clique para gerar a imagem.</p>
              <button
                onClick={handleGenerate}
                disabled={isLoading || !selectedLottery}
                className="w-full flex items-center justify-center gap-2 bg-brand-secondary hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed transform hover:scale-105"
              >
                {isLoading ? (
                  <>
                    <Loader className="animate-spin" size={20} />
                    Gerando...
                  </>
                ) : (
                  <>
                    <Zap size={20} />
                    Gerar Post
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Canvas Preview Column */}
          <div className="lg:col-span-8">
            <div className="sticky top-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <ImageIcon className="text-brand-primary" /> Pré-visualização
              </h2>
              <div className="aspect-[3/4] bg-white rounded-2xl shadow-lg p-4 flex items-center justify-center overflow-hidden">
                {isLoading ? (
                    <div className="flex flex-col items-center gap-4 text-slate-500">
                        <Loader className="animate-spin" size={48} />
                        <p className="font-medium">Buscando resultado mais recente...</p>
                    </div>
                ) : lotteryData ? (
                    <div className="w-full">
                        <CanvasPreview ref={canvasRef} template={selectedTemplate} data={lotteryData} luckyPhrase={luckyPhrase} />
                        
                        <div className="space-y-4 mt-4">
                          {warning && (
                              <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded-r-lg" role="alert">
                                  <div className="flex">
                                      <div className="flex-shrink-0">
                                          <AlertTriangle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                                      </div>
                                      <div className="ml-3">
                                          <p className="text-sm font-medium">{warning}</p>
                                      </div>
                                  </div>
                              </div>
                          )}

                          <button
                              onClick={handleDownload}
                              disabled={isDownloading}
                              className="w-full flex items-center justify-center gap-2 bg-brand-primary hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed transform hover:scale-105"
                          >
                              {isDownloading ? (
                                  <>
                                      <Loader className="animate-spin" size={20} />
                                      Baixando...
                                  </>
                              ) : (
                                  <>
                                      <Download size={20} />
                                      Baixar como PNG
                                  </>
                              )}
                          </button>
                        </div>
                        <p className="text-center text-sm text-slate-500 mt-2">
                          Post referente ao sorteio de: {lotteryData.date}
                          {lotteryData.isSampleData && <span className="font-bold text-amber-600"> (Resultado de Exemplo)</span>}
                        </p>
                    </div>
                ) : (
                  <div className="text-center text-slate-500 flex flex-col items-center gap-4">
                    <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center">
                        <ImageIcon size={48} className="text-slate-400"/>
                    </div>
                    <p className="max-w-xs whitespace-pre-line">{error || "Selecione uma loteria e um template, e clique em 'Gerar Post' para começar."}</p>
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
