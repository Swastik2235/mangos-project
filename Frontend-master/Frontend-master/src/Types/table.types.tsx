
export interface DailyMetric {
  primary: number;
  secondary: number;
  tertiary: number;
}

export interface ProductionTableRow {
  id: number;
  type: 'header' | 'subitem';
  activity: string;
  qty: number;
  rate: number;
  cumulativeValues: number;
  color?: 'blue' | 'orange' | 'green';
  progress?: {
    segments: {
      percentage: number;
      color: string;
    }[];
    trend?: 'positive' | 'negative';
    daysRemaining?: number;
  };
  dailyValues?: {
    [key: string]: string;
  };
  dailyMetrics?: {
    [key: string]: DailyMetric;
  };
}