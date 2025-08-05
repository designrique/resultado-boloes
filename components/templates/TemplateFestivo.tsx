
import React from 'react';
import { TemplateProps, LotteryType } from '../../types';
import { PartyPopper, Clover } from 'lucide-react';

const lotteryColors: Record<LotteryType, { text: string }> = {
    [LotteryType.MEGA_SENA]: { text: 'text-green-400' },
    [LotteryType.QUINA]: { text: 'text-purple-400' },
    [LotteryType.LOTOFACIL]: { text: 'text-indigo-400' },
    [LotteryType.MILIONARIA]: { text: 'text-blue-400' },
    [LotteryType.DIA_DE_SORTE]: { text: 'text-amber-400' },
};

const FestiveWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="w-full h-full bg-slate-800 text-white p-8 flex flex-col justify-between relative overflow-hidden font-sans">
        <div className="absolute -top-10 -left-10 text-slate-700">
            <PartyPopper size={120} />
        </div>
        <div className="absolute -bottom-10 -right-10 text-slate-700 transform rotate-12">
            <PartyPopper size={120} />
        </div>
        {children}
    </div>
);

const TemplateFestivo: React.FC<TemplateProps> = ({ data, luckyPhrase }) => {
    const { lotteryType, contestNumber, date, numbers, extra, trevos } = data;
    const colors = lotteryColors[lotteryType];

    return (
        <FestiveWrapper>
            <div className="text-center z-10">
                <p className="font-light">Resultado Oficial</p>
                <h1 className={`text-5xl font-extrabold ${colors.text}`}>{lotteryType}</h1>
                <p className="font-semibold text-slate-300">Concurso {contestNumber} ({date})</p>
            </div>

            <div className="my-4 z-10">
                <div className="flex flex-wrap gap-x-2 gap-y-3 justify-center">
                    {numbers.map(num => (
                        <div key={num} className="w-14 h-14 flex items-center justify-center bg-slate-700 border-2 border-slate-600 rounded-lg text-2xl font-bold text-white shadow-lg">
                            {num}
                        </div>
                    ))}
                </div>
                {trevos && (
                    <div className="mt-4 text-center bg-slate-900/50 rounded-lg py-2">
                        <p className={`font-bold uppercase ${colors.text} flex items-center justify-center gap-2`}><Clover size={16}/> Trevos da Sorte</p>
                        <div className="flex flex-wrap gap-x-2 gap-y-3 justify-center mt-2">
                            {trevos.map(trevo => (
                                <div key={trevo} className="w-14 h-14 flex items-center justify-center bg-slate-700 border-2 border-slate-600 rounded-lg text-2xl font-bold text-yellow-300 shadow-lg">
                                    {trevo}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                 {extra && (
                    <div className="mt-4 text-center bg-slate-900/50 rounded-lg py-2">
                        <p className={`font-bold uppercase ${colors.text}`}>{extra.name}</p>
                        <p className="text-2xl font-bold text-yellow-300 tracking-widest">{extra.value}</p>
                    </div>
                )}
            </div>

            <div className="text-center bg-slate-900/50 p-4 rounded-lg z-10">
                <p className="text-lg font-semibold text-yellow-300">"{luckyPhrase}"</p>
            </div>
        </FestiveWrapper>
    );
};

export default TemplateFestivo;
