
import { LotteryType, LotteryResult } from '../types';
import { getSampleData } from './sampleData';

// API Configuration for the official Caixa Econômica Federal endpoint
const API_BASE_URL = 'https://servicebus2.caixa.gov.br/portaldeloterias/api';

// Slugs for the official Caixa API
const lotterySlugs: Record<LotteryType, string> = {
  [LotteryType.MEGA_SENA]: 'megasena',
  [LotteryType.QUINA]: 'quina',
  [LotteryType.LOTOFACIL]: 'lotofacil',
  [LotteryType.MILIONARIA]: 'maismilionaria',
  [LotteryType.DIA_DE_SORTE]: 'diadesorte',
};

// Helper to format currency values
const formatCurrency = (value: number): string => {
    if (typeof value !== 'number') return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};

export const fetchLotteryData = async (lotteryType: LotteryType): Promise<LotteryResult> => {
  const slug = lotterySlugs[lotteryType];
  const targetUrl = `${API_BASE_URL}/${slug}`;

  try {
    const response = await fetch(targetUrl);
    
    if (!response.ok) {
      throw new Error(`A API da Caixa respondeu com o status ${response.status}.`);
    }
    
    const apiResult = await response.json();

    // Map the Caixa API response to our internal LotteryResult type
    const result: LotteryResult = {
        lotteryType: lotteryType,
        contestNumber: apiResult.numero,
        date: apiResult.dataApuracao,
        numbers: apiResult.listaDezenas.map((n: string) => n.padStart(2, '0')), // Ensure two digits
        accumulated: apiResult.acumulado,
        nextContestEstimate: formatCurrency(apiResult.valorEstimadoProximoConcurso),
        isSampleData: false,
    };

    // Handle specific fields for certain lotteries
    if (lotteryType === LotteryType.MILIONARIA && Array.isArray(apiResult.listaTrevos)) {
        result.trevos = apiResult.listaTrevos.map((t: any) => String(t));
    }
    
    if (lotteryType === LotteryType.DIA_DE_SORTE && apiResult.mesSorte) {
        result.extra = {
            name: 'Mês da Sorte',
            value: apiResult.mesSorte,
        };
    }
    
    return result;
  } catch (error) {
    console.warn(`Falha ao buscar dados da API oficial da Caixa para ${lotteryType}. Retornando dados de exemplo. Erro:`, error);
    // On any failure, return sample data gracefully.
    return getSampleData(lotteryType);
  }
};
