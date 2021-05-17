import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import axios from 'axios';
import { config } from '../../config';

@Injectable()
export default class CoincapSdk {
  private url = config.sdk.coincap.baseUrl;

  async exchangeRatesForDate(assetId: string, date: Date) {
    const path = `${this.url}/assets/${assetId}/history`;

    const params: any = {
      interval: 'd1',
      start: date.getTime(),
      end: moment(date).add(1, 'days').valueOf(),
    };

    const response = await axios.get(path, { params });

    return response.data.data[0] as CoincapRateDate;
  }

  async exchangeRates(assetId: string): Promise<CoincapRate> {
    const path = `${this.url}/assets/${assetId}`;

    const response = await axios.get(path);

    return response.data.data as CoincapRate;
  }
}

export interface CoincapRate {
  id: string;
  symbol: string;
  priceUsd: string;
}

export interface CoincapRateDate {
  priceUsd: string;
  time: string;
  date: string;
}
