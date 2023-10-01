import { Injectable } from '@nestjs/common';
import {
  ScannerBaseProvider,
  ScannerBaseProviderInput,
  ScannerBaseProviderScanResult,
} from './scanner.base-provider';
import { SlitherProvider } from './providers/slither.provider';
import { TronConstantsProvider } from './providers/tron-constants.provider';

interface ScannerResult {
  providers: {
    name: string;
    result: ScannerBaseProviderScanResult;
  }[];
}

const PROVIDERS: { [name: string]: typeof ScannerBaseProvider } = {
  slither: SlitherProvider,
  tron_constants: TronConstantsProvider,
};

@Injectable()
export class ScannerService {
  async scan(input: ScannerBaseProviderInput): Promise<ScannerResult> {
    const providers = await Promise.all(
      Object.keys(PROVIDERS).map(async (providerName) => {
        const provider = new PROVIDERS[providerName](input);
        return {
          name: providerName,
          result: await provider.scan(),
        };
      }),
    );
    return {
      providers,
    };
  }
}
