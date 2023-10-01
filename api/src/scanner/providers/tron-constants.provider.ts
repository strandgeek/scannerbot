import {
  ScannerBaseProvider,
  ScannerBaseProviderScanResult,
} from '../scanner.base-provider';

const TRON_CONSTANTS_ERRORS = [
  {
    match: /block\.difficulty/g,
    description: `block.difficulty (Current block difficulty) is a constant not recommended in TRON VM and it's set to 0.`,
  },
  {
    match: /block\.gaslimit/,
    description: `block.gaslimit (Current block gas limit) is a constant not supported in TRON VM and it's set to 0.`,
  },
  {
    match: /msg\.gas/,
    description: `msg.gas (Remaining gas), since 0.4.21, is not recommended in TRON VM and replaced by gasleft().`,
  },
  {
    match: /tx\.gasprice/,
    description: `tx.gasprice (The gas price of transaction) is not recommended in TRON VM and it's set to 0.`,
  },
];

export class TronConstantsProvider extends ScannerBaseProvider {
  async scan(): Promise<ScannerBaseProviderScanResult> {
    const result: ScannerBaseProviderScanResult = {
      items: [],
    };

    const scanLineErrors = (
      filePath: string,
      line: string,
      lineIdx: number,
    ) => {
      const lineNumber = lineIdx + 1;
      TRON_CONSTANTS_ERRORS.forEach((constError) => {
        if (line.match(constError.match)) {
          result.items.push({
            file: {
              path: filePath,
              lines: [lineNumber],
            },
            description: `${constError.description} (${filePath}#${lineNumber})`,
            impact: 'MEDIUM',
          });
        }
      });
    };

    this.input.files.forEach((file) => {
      file.source
        .split('\n')
        .forEach((line: string, lineIdx: number) =>
          scanLineErrors(file.path, line, lineIdx),
        );
    });

    return result;
  }
}
