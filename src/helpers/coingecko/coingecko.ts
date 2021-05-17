import ExchangeRates, { AssetRate, HistoricalAssetRate } from '../interfaces';
import CoingeckoSdk, {
  CoingeckoRateHistory,
  CoingeckoSimpleRate,
} from './coingecko-sdk';
import { config } from '../../config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Coingecko implements ExchangeRates {
  public currencies = config.supportedCurrencies;
  public usdTicker = config.usdTicker;

  constructor(private readonly coingeckoSdk: CoingeckoSdk) {}

  private currenciesMapper = {
    BTC: 'bitcoin',
    ETH: 'ethereum',
    ADA: 'cardano',
    LTC: 'litecoin',
  };

  async getCurrentAssetRates(): Promise<AssetRate[]> {
    const sdkRates = await Promise.all(
      this.currencies.map((currency) =>
        this.coingeckoSdk.exchangeRates(
          this.currenciesMapper[currency.ticker],
          this.usdTicker,
        ),
      ),
    );

    return sdkRates.map((sdkRate, index) => this.mapSdkRate(sdkRate, index));
  }

  async getHistoricatAssetRates(date: string): Promise<HistoricalAssetRate[]> {
    const sdkRates = await Promise.all(
      this.currencies.map((currency) =>
        this.coingeckoSdk.exchangeRatesForDate(
          this.currenciesMapper[currency.ticker],
          new Date(date),
        ),
      ),
    );

    return sdkRates.map((sdkRate, index) => ({
      ...this.mapSdkRateHistory(sdkRate, index),
      date,
    }));
  }

  private mapSdkRate(sdkRate: CoingeckoSimpleRate, index: number): AssetRate {
    return {
      ticker: this.currencies[index].ticker,
      usdRate: sdkRate.usd,
    };
  }

  private mapSdkRateHistory(
    sdkRate: CoingeckoRateHistory,
    index: number,
  ): AssetRate {
    return {
      ticker: this.currencies[index].ticker,
      usdRate: sdkRate.market_data.current_price.usd,
    };
  }
}
