
import React from 'react';
import { LotteryType } from '../types';

interface LotterySelectorProps {
  selected: LotteryType | null;
  onSelect: (lottery: LotteryType) => void;
}

const lotteryOptions = [
    { type: LotteryType.MEGA_SENA, color: 'bg-brand-green' },
    { type: LotteryType.QUINA, color: 'bg-brand-dark-blue' },
    { type: LotteryType.LOTOFACIL, color: 'bg-brand-dark-purple' },
    { type: LotteryType.MILIONARIA, color: 'bg-brand-primary' },
    { type: LotteryType.DIA_DE_SORTE, color: 'bg-amber-500' },
];

const LotterySelector: React.FC<LotterySelectorProps> = ({ selected, onSelect }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
      {Object.values(LotteryType).map(lotteryType => {
          const option = lotteryOptions.find(opt => opt.type === lotteryType);
          if (!option) return null;
          
          return (
            <button
              key={option.type}
              onClick={() => onSelect(option.type)}
              aria-label={`Selecionar loteria ${option.type}`}
              className={`px-4 py-3 font-bold text-white rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50
                ${option.color} 
                ${selected === option.type ? 'ring-4 ring-blue-400' : 'ring-0'}`}
            >
              {option.type}
            </button>
          )
        })}
    </div>
  );
};

export default LotterySelector;