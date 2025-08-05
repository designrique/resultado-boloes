
import React from 'react';
import { TemplateProps, LotteryType, LotteryResult } from '../../types';
import { Clover } from 'lucide-react';

const lotteryStyles: Record<LotteryType, {
    cardBg: string;
    textColor: string;
    sphereColor: string;
    spherePositions: React.CSSProperties[];
}> = {
    [LotteryType.MEGA_SENA]: {
        cardBg: 'bg-green-600',
        textColor: 'text-green-600',
        sphereColor: 'text-green-300',
        spherePositions: [ { top: '-10%', right: '-10%' }, { bottom: '-10%', left: '-10%' } ],
    },
    [LotteryType.QUINA]: {
        cardBg: 'bg-indigo-700',
        textColor: 'text-indigo-700',
        sphereColor: 'text-indigo-300',
        spherePositions: [ { top: '15%', right: '-15%' }, { bottom: '-10%', left: '5%' } ],
    },
    [LotteryType.LOTOFACIL]: {
        cardBg: 'bg-purple-700',
        textColor: 'text-purple-700',
        sphereColor: 'text-purple-300',
        spherePositions: [ { top: '50%', right: '-15%', transform: 'translateY(-50%)' }, { bottom: '-15%', left: '20%' } ],
    },
    [LotteryType.MILIONARIA]: {
        cardBg: 'bg-blue-700',
        textColor: 'text-blue-700',
        sphereColor: 'text-blue-300',
        spherePositions: [ { top: '5%', left: '5%' }, { bottom: '5%', right: '5%' } ],
    },
    [LotteryType.DIA_DE_SORTE]: {
        cardBg: 'bg-amber-500',
        textColor: 'text-amber-600',
        sphereColor: 'text-amber-200',
        spherePositions: [ { top: '-5%', left: '20%' }, { bottom: '-15%', right: '-5%' } ],
    },
};

const Sphere: React.FC<{ color: string; style?: React.CSSProperties }> = ({ color, style }) => (
  <div
    className="absolute w-28 h-28 rounded-full bg-gradient-to-br from-white/30 to-transparent backdrop-blur-[2px] border border-white/20 flex items-center justify-center"
    style={style}
  >
    <Clover size={60} className={`${color} opacity-40`} />
  </div>
);

const ResultTemplate: React.FC<{ result: LotteryResult }> = ({ result }) => {
    const { lotteryType, contestNumber, date, numbers, extra, trevos } = result;
    const styles = lotteryStyles[lotteryType];

    const gridCols = numbers.length > 10 ? 'grid-cols-5' : (numbers.length > 6 ? 'grid-cols-4' : 'grid-cols-3');
    const numberGap = numbers.length > 6 ? 'gap-2 md:gap-2' : 'gap-3 md:gap-4';
    const numberSize = numbers.length > 10 ? 'w-12 h-12 text-xl md:w-14 md:h-14 md:text-2xl' : (numbers.length > 6 ? 'w-14 h-14 text-2xl md:w-16 md:h-16 md:text-3xl' : 'w-16 h-16 text-3xl md:w-20 md:h-20 md:text-4xl');

    return (
        <div className={`w-full h-full ${styles.cardBg} rounded-[2.5rem] shadow-2xl flex flex-col items-center justify-between p-8 text-white relative`}>
            <div className="bg-white rounded-full px-6 py-2 text-center shadow-lg">
                <h1 className={`font-bold text-2xl md:text-3xl uppercase ${styles.textColor}`}>
                    {lotteryType}
                </h1>
                <p className="text-xs md:text-sm font-semibold text-slate-500 tracking-wider">
                    CONCURSO {contestNumber} • {date}
                </p>
            </div>
            
            <div className="flex flex-col items-center justify-center">
                <div className={`grid ${gridCols} ${numberGap} place-items-center px-2`}>
                    {numbers.map(num => (
                        <div key={num} className={`bg-white rounded-full flex items-center justify-center font-bold shadow-inner ${numberSize}`}>
                            <span className={styles.textColor}>{num}</span>
                        </div>
                    ))}
                </div>

                {trevos && (
                    <div className="mt-6 text-center">
                        <p className="text-sm font-bold uppercase opacity-80 tracking-widest">Trevos da Sorte</p>
                        <div className="flex justify-center gap-3 mt-2">
                            {trevos.map(trevo => (
                                <div key={trevo} className="w-14 h-14 bg-white rounded-full flex items-center justify-center font-bold shadow-inner">
                                    <Clover size={20} className={`${styles.textColor} absolute opacity-20`} />
                                    <span className={styles.textColor}>{trevo}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {extra && (
                    <div className="mt-4 bg-white/20 rounded-xl px-4 py-2 text-center shadow-inner">
                        <p className="text-xs font-bold uppercase opacity-80">{extra.name}</p>
                        <p className="text-xl font-bold uppercase">{extra.value}</p>
                    </div>
                )}
            </div>
            <div className="h-4" />
        </div>
    );
};

const TemplateModerno: React.FC<TemplateProps> = ({ data }) => {
    const styles = lotteryStyles[data.lotteryType];
    
    return (
        <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-100 flex items-center justify-center p-4 relative font-sans overflow-hidden">
            {styles.spherePositions.map((pos, index) => (
              <Sphere key={index} color={styles.sphereColor} style={pos} />
            ))}
            
            <ResultTemplate result={data} />
        </div>
    );
};

export default TemplateModerno;
