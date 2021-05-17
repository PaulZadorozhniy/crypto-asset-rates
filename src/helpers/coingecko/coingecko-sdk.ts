import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import axios from 'axios';
import { config } from '../../config';

@Injectable()
export default class CoingeckoSdk {
  private url = config.sdk.coingecko.baseUrl;

  async exchangeRates(
    assetId: string,
    vsCrrency: string,
  ): Promise<CoingeckoSimpleRate> {
    const path = `${this.url}/simple/price`;

    const params: any = {
      ids: assetId,
      vs_currencies: vsCrrency,
    };

    const response = await axios.get(path, { params });

    return response.data[assetId] as CoingeckoSimpleRate;
  }

  async exchangeRatesForDate(
    assetId: string,
    date: Date,
  ): Promise<CoingeckoRateHistory> {
    const path = `${this.url}/coins/${assetId}/history`;

    const params: any = {
      date: moment(date).format('DD-MM-YYYY'),
    };

    const response = await axios.get(path, { params });

    return response.data as CoingeckoRateHistory;
  }
}

export interface CoingeckoSimpleRate {
  usd: number;
}

export interface CoingeckoRateHistory {
  id: string;
  symbol: string;
  name: string;
  market_data: {
    current_price: {
      usd: number;
    };
  };
}
