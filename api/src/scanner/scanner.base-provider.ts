import { InternalServerErrorException } from '@nestjs/common';

export type ScannerBaseProviderImpact =
  | 'OPTIMIZATION'
  | 'INFORMATIONAL'
  | 'LOW'
  | 'MEDIUM'
  | 'HIGH';

export interface ScannerBaseProviderInput {
  scanId: string;
  solcVersion: string;
  files: {
    path: string;
    source: string;
  }[];
}

export interface ScannerBaseProviderScanResultItem {
  file: {
    path: string;
    lines?: number[];
  } | null;
  description: string;
  impact: ScannerBaseProviderImpact;
}

export interface ScannerBaseProviderScanResult {
  items: ScannerBaseProviderScanResultItem[];
}

export class ScannerBaseProvider {
  protected input: ScannerBaseProviderInput;
  constructor(input: ScannerBaseProviderInput) {
    this.input = input;
  }

  async scan(): Promise<ScannerBaseProviderScanResult> {
    throw new InternalServerErrorException('not implemented');
  }
}
