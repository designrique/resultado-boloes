
import { LotteryType, LotteryResult } from '../types';

const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};

// Data manually updated from API to be more recent
const sampleResults: Record<LotteryType, Omit<LotteryResult, 'lotteryType' | 'isSampleData'>> = {
    [LotteryType.MEGA_SENA]: {
        contestNumber: 2743,
        date: '29/06/2024',
        numbers: ['23', '26', '37', '39', '45', '53'],
        accumulated: true,
        nextContestEstimate: formatCurrency(48000000),
    },
    [LotteryType.QUINA]: {
        contestNumber: 6479,
        date: '29/06/2024',
        numbers: ['21', '32', '42', '55', '78'],
        accumulated: true,
        nextContestEstimate: formatCurrency(9800000),
    },
    [LotteryType.LOTOFACIL]: {
        contestNumber: 3142,
        date: '29/06/2024',
        numbers: ['02', '04', '05', '06', '07', '09', '10', '11', '14', '16', '18', '19', '20', '21', '25'],
        accumulated: false,
        nextContestEstimate: formatCurrency(1700000),
    },
    [LotteryType.MILIONARIA]: {
        contestNumber: 158,
        date: '29/06/2024',
        numbers: ['11', '14', '28', '31', '38', '44'],
        trevos: ['2', '6'],
        accumulated: true,
        nextContestEstimate: formatCurrency(240000000),
    },
    [LotteryType.DIA_DE_SORTE]: {
        contestNumber: 932,
        date: '29/06/2024',
        numbers: ['01', '02', '09', '10', '16', '18', '20'],
        extra: {
            name: 'Mês da Sorte',
            value: 'Fevereiro',
        },
        accumulated: false,
        nextContestEstimate: formatCurrency(150000),
    },
};

export const getSampleData = (lotteryType: LotteryType): LotteryResult => {
    return {
        ...sampleResults[lotteryType],
        lotteryType: lotteryType,
        isSampleData: true,
    };
};
