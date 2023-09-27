export interface ScanFile {
  path: string;
  source: string;
};

export interface ScanInput {
  files: ScanFile[];
}
