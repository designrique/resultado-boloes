import React from 'react';

export enum LotteryType {
  MEGA_SENA = 'Mega-Sena',
  QUINA = 'Quina',
  LOTOFACIL = 'Lotofácil',
  MILIONARIA = '+Milionária',
  DIA_DE_SORTE = 'Dia de Sorte',
}

export interface LotteryResult {
  lotteryType: LotteryType;
  contestNumber: number;
  date: string;
  numbers: string[];
  accumulated: boolean;
  nextContestEstimate: string;
  trevos?: string[];
  extra?: {
    name: string;
    value: string;
  };
  isSampleData?: boolean;
}

// NextDrawInfo has been removed as we now always fetch the latest result.
// LotteryFetchResponse is now an alias for LotteryResult for clarity in components.
export type LotteryFetchResponse = LotteryResult;

// This function is now mainly a type guard for null/undefined values.
export function isLotteryResult(data: LotteryFetchResponse | null | undefined): data is LotteryResult {
    return !!data;
}

export interface TemplateProps {
  data: LotteryFetchResponse;
  luckyPhrase: string;
}

export interface Template {
  id: string;
  name: string;
  thumbnail: React.FC;
  component: React.FC<TemplateProps>;
}
