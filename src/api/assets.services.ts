import { Injectable } from '@nestjs/common';
import { config } from '../config';

@Injectable()
export class AssetsService {
  getSupportedAssets(): any {
    return config.supportedCurrencies;
  }
}
