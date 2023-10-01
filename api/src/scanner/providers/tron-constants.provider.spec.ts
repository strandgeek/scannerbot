import { TronConstantsProvider } from './tron-constants.provider';
import { ScannerBaseProviderScanResult } from '../scanner.base-provider';

describe('TronConstantsProvider', () => {
  it('should detect TRON VM not supported / not recommended constants on Solidity', async () => {
    const provider = new TronConstantsProvider({
      scanId: '123',
      solcVersion: '5.4.3',
      files: [
        {
          path: 'MyContract.sol',
          source: `pragma solidity ^0.5.10;

          contract HelloWorld {
              bytes32 varBlockHash;
              address varBlockCoinbase;
              uint varBlockDifficulty;
              uint varBlockGasLimit;
              uint varBlockNumber;
              uint varBlockTimestamp;
              uint varGasLeft;
              bytes varMsgData;
              address varMsgSender;
              bytes4 varMsgSig;
              uint varMsgGas;
              uint varMsgValue;
              uint varNow;
              address varTxOrigin;
              uint varTxGasPrice;
          
              function updateConsts() external payable {
                  varBlockHash = blockhash(1);
                  varBlockCoinbase = block.coinbase;
                  varBlockDifficulty = block.difficulty;
                  varBlockGasLimit = block.gaslimit;
                  varBlockNumber = block.number;
                  varBlockTimestamp = block.timestamp;
                  varGasLeft = gasleft();
                  varMsgGas = msg.gas;
                  varMsgData = msg.data;
                  varMsgSender = msg.sender;
                  varMsgSig = msg.sig;
                  varMsgValue = msg.value;
                  varNow = now;
                  varTxOrigin = tx.origin;
                  varTxGasPrice = tx.gasprice;
              }
          }
          `,
        },
      ],
    });
    const res = await provider.scan();
    expect(res).toEqual<ScannerBaseProviderScanResult>({
      items: [
        {
          file: {
            path: 'MyContract.sol',
            lines: [23],
          },
          description:
            "block.difficulty (Current block difficulty) is a constant not recommended in TRON VM and it's set to 0. (MyContract.sol#23)",
          impact: 'MEDIUM',
        },
        {
          file: {
            path: 'MyContract.sol',
            lines: [24],
          },
          description:
            "block.gaslimit (Current block gas limit) is a constant not supported in TRON VM and it's set to 0. (MyContract.sol#24)",
          impact: 'MEDIUM',
        },
        {
          file: {
            path: 'MyContract.sol',
            lines: [28],
          },
          description:
            'msg.gas (Remaining gas), since 0.4.21, is not recommended in TRON VM and replaced by gasleft(). (MyContract.sol#28)',
          impact: 'MEDIUM',
        },
        {
          file: {
            path: 'MyContract.sol',
            lines: [35],
          },
          description:
            "tx.gasprice (The gas price of transaction) is not recommended in TRON VM and it's set to 0. (MyContract.sol#35)",
          impact: 'MEDIUM',
        },
      ],
    });
  });
});
