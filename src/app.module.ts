import { Module } from '@nestjs/common';
import { AssetsController } from './api/assets.controller';
import { AssetsService } from './api/assets.services';
import { ExchangeRatesController } from './api/exchange-rates.controller';
import { ExchangeRatesService } from './api/exchange-rates.service';
import { Coingecko } from './helpers/coingecko/coingecko';
import CoingeckoSdk from './helpers/coingecko/coingecko-sdk';
import { Coincap } from './helpers/coincap/coincap';
import CoincapSdk from './helpers/coincap/coincap-sdk';

@Module({
  imports: [],
  controllers: [ExchangeRatesController, AssetsController],
  providers: [
    ExchangeRatesService,
    AssetsService,
    Coingecko,
    CoingeckoSdk,
    Coincap,
    CoincapSdk,
  ],
})
export class AppModule {}
