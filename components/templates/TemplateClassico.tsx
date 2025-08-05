
import React from 'react';
import { TemplateProps, LotteryType } from '../../types';
import { CheckCircle, Clover } from 'lucide-react';

const lotteryColors: Record<LotteryType, { bg: string, text: string, border: string }> = {
    [LotteryType.MEGA_SENA]: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-600' },
    [LotteryType.QUINA]: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-600' },
    [LotteryType.LOTOFACIL]: { bg: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-600' },
    [LotteryType.MILIONARIA]: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-600' },
    [LotteryType.DIA_DE_SORTE]: { bg: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-600' },
};

const TemplateClassico: React.FC<TemplateProps> = ({ data, luckyPhrase }) => {
    const { lotteryType, contestNumber, date, numbers, extra, trevos } = data;
    const colors = lotteryColors[lotteryType];
    const numberSize = numbers.length > 7 ? 'w-12 h-12 text-lg' : 'w-14 h-14 text-xl';

    return (
        <div className={`w-full h-full bg-white text-slate-800 p-8 flex flex-col border-8 border-slate-200`}>
            <div className="flex-grow flex flex-col justify-between">
                <div className={`p-4 ${colors.bg} rounded-lg text-center`}>
                    <h1 className={`text-4xl font-bold ${colors.text}`}>{lotteryType.toUpperCase()}</h1>
                    <p className="font-semibold text-slate-600">Concurso {contestNumber} - {date}</p>
                </div>

                <div className="flex-grow flex flex-col justify-center items-center my-4">
                    <p className="text-center text-lg font-medium text-slate-600 mb-4">"{luckyPhrase}"</p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        {numbers.map(num => (
                            <div key={num} className={`${numberSize} flex items-center justify-center border-2 ${colors.border} rounded-full font-bold ${colors.text} bg-white`}>
                                {num}
                            </div>
                        ))}
                    </div>
                    {trevos && (
                        <div className={`mt-4 text-center border-t-2 pt-3 w-full max-w-xs ${colors.border}`}>
                            <p className={`font-bold ${colors.text} flex items-center justify-center gap-2`}><Clover size={16}/> Trevos da Sorte</p>
                            <div className="flex flex-wrap gap-3 justify-center mt-2">
                                {trevos.map(trevo => (
                                    <div key={trevo} className={`w-12 h-12 flex items-center justify-center border-2 ${colors.border} rounded-full font-bold ${colors.text} bg-white`}>
                                        {trevo}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {extra && (
                        <div className={`mt-4 text-center border-2 ${colors.border} ${colors.bg} rounded-lg px-4 py-2`}>
                            <p className={`font-bold ${colors.text}`}>{extra.name}</p>
                            <p className={`text-xl font-bold ${colors.text}`}>{extra.value}</p>
                        </div>
                    )}
                </div>
                
                <div className="text-center border-t-2 border-slate-200 pt-4">
                     {data.accumulated ? (
                        <p className="text-2xl font-bold text-red-600">ACUMULOU!</p>
                    ) : (
                        <div className="flex items-center justify-center gap-2 text-green-700">
                            <CheckCircle size={24}/>
                            <p className="text-xl font-bold">HOUVE GANHADORES!</p>
                        </div>
                    )}
                    <p className="text-slate-600">Estimativa para o próximo concurso:</p>
                    <p className={`text-2xl font-bold ${colors.text}`}>{data.nextContestEstimate}</p>
                </div>
            </div>
        </div>
    );
};

export default TemplateClassico;
