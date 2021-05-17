export default interface ExchangeRates {
  getCurrentAssetRates(): Promise<AssetRate[]>;
  getHistoricatAssetRates(date: string): Promise<HistoricalAssetRate[]>;
}

export interface AssetRate {
  ticker: string;
  usdRate: number;
}

export interface HistoricalAssetRate extends AssetRate {
  date: string;
}
