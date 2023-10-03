#!/usr/bin/env node

const wrapper = require('solc/wrapper');
const { globSync } = require('glob');
const yargs = require('yargs');
const fs = require('fs');
const {
  replaceSubdenominationWithValue,
} = require('./utils/replaceSubdenomination');

const SUPPORTED_VERSIONS = [
  '0.4.24',
  '0.4.25',
  '0.5.4',
  '0.5.8',
  '0.5.10',
  '0.5.12',
  '0.5.13',
  '0.5.14',
  '0.5.15',
  '0.5.16',
  '0.5.17',
  '0.5.18',
  '0.6.0',
  '0.6.2',
  '0.6.8',
  '0.6.12',
  '0.6.13',
  '0.7.0',
  '0.7.6',
  '0.7.7',
  '0.8.0',
  '0.8.6',
  '0.8.7',
  '0.8.11',
  '0.8.18',
];

const solcVersion = yargs.argv['solc-version'];

if (!SUPPORTED_VERSIONS.includes(solcVersion)) {
  console.log(`Error: Solidity v${solcVersion} is not available on ScannerBot`);
  process.exit(1);
}

const soljson = eval('require')(`./versions/soljson_v${solcVersion}`);
const solc = wrapper(soljson);

const sources = {};
const solFilePaths = [yargs.argv._[0]];

solFilePaths.forEach((path) => {
  sources[path] = {
    content: fs.readFileSync(path, 'utf8'),
  };
});

const input = {
  language: 'Solidity',
  sources,
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
        '': ['ast'],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

Object.keys(output.sources).forEach((sourceKey) => {
  output.sources[sourceKey].AST = output.sources[sourceKey].ast;
  output.sources[sourceKey].ast = undefined;
});

const compactedContracts = {};

Object.keys(output.contracts).forEach((contractKey) => {
  const contractNames = Object.keys(output.contracts[contractKey]);
  contractNames.forEach((contractName) => {
    const c = output.contracts[contractKey][contractName];
    compactedContracts[`${contractKey}:${contractName}`] = {
      abi: JSON.stringify(c.abi),
      bin: c.evm.bytecode.object,
      srcmap: c.evm.bytecode.sourceMap,
      'bin-runtime': '',
      'srcmap-runtime': '',
    };
  });
});
output.contracts = compactedContracts;

/*
  The slither does not support custom subdenomination (like sun)

  As for now we are replacing the compiled json subdenomination from 'sun' to 'ether' so the silther
  can proceed with the analysis without throwing the error: Subdemonination conversion impossible.

  Reference:
  https://github.com/crytic/slither/blob/e5f2a86f0906fd62c6c4eccb9dbfa5ab30671a78/slither/utils/arithmetic.py#L39

  TODO: Open a Pull Request on slither project to support custom subdenominations
*/
output.sources = replaceSubdenominationWithValue(output.sources, 'ether');

console.log(JSON.stringify(output, null, 4));
