import ExchangeRates, { AssetRate, HistoricalAssetRate } from '../interfaces';
import CoincapSdk, { CoincapRate, CoincapRateDate } from './coincap-sdk';
import { config } from '../../config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Coincap implements ExchangeRates {
  public currencies = config.supportedCurrencies;
  public usdTicker = config.usdTicker;

  constructor(private readonly coincapSdk: CoincapSdk) {}

  private currenciesMapper = {
    BTC: 'bitcoin',
    ETH: 'ethereum',
    ADA: 'cardano',
    LTC: 'litecoin',
  };

  async getCurrentAssetRates(): Promise<AssetRate[]> {
    const sdkRates = await Promise.all(
      this.currencies.map((currency) =>
        this.coincapSdk.exchangeRates(this.currenciesMapper[currency.ticker]),
      ),
    );

    return sdkRates.map(this.mapSdkRate);
  }

  async getHistoricatAssetRates(date: string): Promise<HistoricalAssetRate[]> {
    const sdkRates = await Promise.all(
      this.currencies.map((currency) =>
        this.coincapSdk.exchangeRatesForDate(
          this.currenciesMapper[currency.ticker],
          new Date(date),
        ),
      ),
    );

    return sdkRates.map((sdkRate, index) => ({
      ...this.mapSdkRateAtDate({
        ...sdkRate,
        ticker: this.currencies[index].ticker,
      }),
      date,
    }));
  }

  private mapSdkRate(sdkRate: CoincapRate): AssetRate {
    return {
      ticker: sdkRate.symbol,
      usdRate: +sdkRate.priceUsd,
    };
  }

  private mapSdkRateAtDate(
    sdkRate: CoincapRateDate & { ticker: string },
  ): AssetRate {
    return {
      ticker: sdkRate.ticker,
      usdRate: +sdkRate.priceUsd,
    };
  }
}
