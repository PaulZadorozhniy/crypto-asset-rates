import { Controller, Get } from '@nestjs/common';
import { AssetsService } from './assets.services';

@Controller()
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Get('assets')
  getCurrentAssetRates(): any {
    return this.assetsService.getSupportedAssets();
  }
}
