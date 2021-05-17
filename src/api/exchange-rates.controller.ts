import { Controller, Get, Query } from '@nestjs/common';
import { ExchangeRatesService } from './exchange-rates.service';

import { IsDateString, IsNotEmpty } from 'class-validator';

export class QueryParams {
  sources?: string;
}
export class HistoricalQueryParams extends QueryParams {
  @IsNotEmpty()
  @IsDateString()
  date: string;
}

@Controller()
export class ExchangeRatesController {
  constructor(private readonly appService: ExchangeRatesService) {}

  @Get('current')
  getCurrentAssetRates(@Query() params: QueryParams): any {
    return this.appService.getCurrentAssetRates(params?.sources?.split(','));
  }

  @Get('historical')
  getHistoricatAssetRates(@Query() params: HistoricalQueryParams): any {
    return this.appService.getHistoricatAssetRates(
      params.date,
      params.sources?.split(','),
    );
  }
}
