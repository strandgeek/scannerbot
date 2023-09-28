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
        fs.outputFile(
          path.join(this.getScanFolder(), 'files', file.path),
          file.source,
        ),
      ),
    );
  }

  async execSlither() {
    try {
      const { solcVersion } = this.input;
      await exec(
        `slither ./files/contracts --json output.json --solc-solcs-select ${solcVersion}`,
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
          description: detector.description,
          impact: detector.impact.toUpperCase(),
        };
        return item;
      }),
    };
  }
}
