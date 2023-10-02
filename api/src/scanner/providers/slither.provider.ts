import * as path from 'path';
import * as fs from 'fs-extra';
import * as util from 'util';
import * as child_process from 'child_process';
import {
  ScannerBaseProvider,
  ScannerBaseProviderScanResult,
  ScannerBaseProviderScanResultItem,
} from '../scanner.base-provider';
const exec = util.promisify(child_process.exec);

const TMP_PATH = './tmp/silther';

/**
 * Even using the solc for TVM, the slipher scan description comes with the EVM denominations (ether, ETH, EVM, etc).
 *
 * So we are replacing it to TRON ecosystem.
 * TODO: Open PR on slipher to add a possibility to customize the denomination symbol and terms on descriptions.
 */
const DENOMINATIONS = [
  {
    match: /ether/g,
    replace: 'sun',
  },
  {
    match: /ETH/g,
    replace: 'TRX',
  },
  {
    match: /EVM/g,
    replace: 'TVM',
  },
];

export class SlitherProvider extends ScannerBaseProvider {
  private getScanFolder() {
    return path.join(TMP_PATH, this.input.scanId);
  }

  private async clearScanFolder() {
    try {
      await fs.rm(this.getScanFolder(), { force: true, recursive: true });
    } catch (error) { }
  }

  private async createTempFiles() {
    const { files } = this.input;
    return Promise.all(
      files.map((file) =>
        fs.outputFile(path.join(this.getScanFolder(), file.path), file.source),
      ),
    );
  }

  async execSlither() {
    try {
      const { solcVersion } = this.input;
      await exec(
        `slither ./contracts --json output.json --solc-solcs-select ${solcVersion}`,
        {
          cwd: this.getScanFolder(),
        },
      );
    } catch (e) {
      console.log(e);
    }
    const outputJson = await fs.readFile(
      path.join(this.getScanFolder(), 'output.json'),
      'utf8',
    );
    return JSON.parse(outputJson);
  }

  private replaceDenomination(text: string): string {
    let replaced: string = text;
    DENOMINATIONS.forEach((d) => {
      replaced = replaced.replace(d.match, d.replace);
    });
    return replaced;
  }

  async scan(): Promise<ScannerBaseProviderScanResult> {
    await this.clearScanFolder();
    await this.createTempFiles();
    const output = await this.execSlither();
    await this.clearScanFolder();
    return {
      items: output.results.detectors.map((detector: any) => {
        const element = (detector.elements || []).find(
          (el) => !!el.source_mapping,
        );
        const item: ScannerBaseProviderScanResultItem = {
          file: element
            ? {
              path: element.source_mapping.filename_relative,
              lines: element.source_mapping.lines || [],
            }
            : null,
          description: this.replaceDenomination(detector.description),
          impact: detector.impact.toUpperCase(),
        };
        return item;
      }),
    };
  }
}
