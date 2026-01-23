import { ProductionTableRow } from "../Types/table.types";

export const productionTableData: ProductionTableRow[] = [
  // ... previous data remains the same until Office section
  {
    id: 3,
    type: 'header',
    activity: 'Office',
    qty: 30,
    rate: 191,
    cumulativeValues: 191551,
    dailyValues: {
      '01': '₹10.5 L',
      '02': '₹10.5 L',
      '03': '₹10.5 L',
      '04': '₹10.5 L',
      '05': '₹10.5 L',
      '06': '₹10.5 L',
      '07': '₹10.5 L',
    }
  },
  {
    id: 31,
    type: 'subitem',
    activity: 'Methods',
    qty: 30,
    rate: 191,
    cumulativeValues: 191551,
    color: 'blue',
    dailyMetrics: {
      '01': { primary: 70, secondary: 20, tertiary: -55 },
      '02': { primary: 70, secondary: 20, tertiary: -55 },
      '03': { primary: 70, secondary: 20, tertiary: -55 },
      '04': { primary: 70, secondary: 20, tertiary: -55 },
      '05': { primary: 70, secondary: 20, tertiary: -55 },
      '06': { primary: 70, secondary: 20, tertiary: -55 },
      '07': { primary: 70, secondary: 20, tertiary: -55 }
    }
  },
  {
    id: 32,
    type: 'subitem',
    activity: 'Monetary',
    qty: 30,
    rate: 191,
    cumulativeValues: 191551,
    color: 'orange',
    dailyMetrics: {
      '01': { primary: 70, secondary: 20, tertiary: -55 },
      '02': { primary: 70, secondary: 20, tertiary: -55 },
      '03': { primary: 70, secondary: 20, tertiary: -55 },
      '04': { primary: 70, secondary: 20, tertiary: -55 },
      '05': { primary: 70, secondary: 20, tertiary: -55 },
      '06': { primary: 70, secondary: 20, tertiary: -55 },
      '07': { primary: 70, secondary: 20, tertiary: -55 }
    }
  },
  {
    id: 33,
    type: 'subitem',
    activity: 'Management',
    qty: 30,
    rate: 191,
    cumulativeValues: 191551,
    color: 'green',
    dailyMetrics: {
      '01': { primary: 70, secondary: 20, tertiary: -55 },
      '02': { primary: 70, secondary: 20, tertiary: -55 },
      '03': { primary: 70, secondary: 20, tertiary: -55 },
      '04': { primary: 70, secondary: 20, tertiary: -55 },
      '05': { primary: 70, secondary: 20, tertiary: -55 },
      '06': { primary: 70, secondary: 20, tertiary: -55 },
      '07': { primary: 70, secondary: 20, tertiary: -55 }
    }
  }
];