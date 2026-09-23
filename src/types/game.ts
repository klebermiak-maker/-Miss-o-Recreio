export type GameTab = 'campaign' | 'codelab' | 'financelab' | 'encoder' | 'teacher';

export interface CampaignStage {
  id: number;
  title: string;
  subtitle: string;
  category: 'informatica' | 'financas' | 'misto';
  skillCode: string;
  story: string;
  instruction: string;
  type: 'symbol_cipher' | 'canteen_cash' | 'binary_pixel' | 'conscious_consumption' | 'morse_code' | 'piggy_budget';
  data: any;
}

export interface MoneyValue {
  id: string;
  label: string;
  value: number; // in Reais (e.g. 2.0, 0.50)
  type: 'bill' | 'coin';
  color: string;
  accent: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}
