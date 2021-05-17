import { Injectable } from '@nestjs/common';
import { Coincap } from '../helpers/coincap/coincap';
import { Coingecko } from '../helpers/coingecko/coingecko';

@Injectable()
export class ExchangeRatesService {
  constructor(
    private readonly coingecko: Coingecko,
    private readonly coincap: Coincap,
  ) {}

  async getCurrentAssetRates(
    sources: string[] = ['coincap', 'coingecko'],
  ): Promise<any> {
    const result: any = {};
    if (sources.find((value) => value === 'coincap')) {
      result.coincap = await this.coincap.getCurrentAssetRates();
    }

    if (sources.find((value) => value === 'coingecko')) {
      result.coingecko = await this.coingecko.getCurrentAssetRates();
    }
    return result;
  }

  async getHistoricatAssetRates(
    date: string,
    sources: string[] = ['coincap', 'coingecko'],
  ): Promise<any> {
    const result: any = {};
    if (sources.find((value) => value === 'coincap')) {
      result.coincap = await this.coincap.getHistoricatAssetRates(date);
    }

    if (sources.find((value) => value === 'coingecko')) {
      result.coingecko = await this.coingecko.getHistoricatAssetRates(date);
    }
    return result;
  }
}
