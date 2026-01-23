export interface BranchItem {
    label: string;
    value: number;
    percentage: number;
  }
  
  export interface FinancialData {
    title: string;
    centerValue: number;
    branches: {
      left?: BranchItem[];
      right?: BranchItem[];
    };
  }
  
  export interface StockData {
    title: string;
    totalValue: number;
    categories: {
      opening: BranchItem[];
      closing: BranchItem[];
    };
  }