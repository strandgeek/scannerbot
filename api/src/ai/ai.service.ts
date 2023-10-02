import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ScanFile } from 'src/scan/scan.types';
import {
  ScannerBaseProviderScanResult,
  ScannerBaseProviderScanResultItem,
} from 'src/scanner/scanner.base-provider';
import { ScannerResult } from 'src/scanner/scanner.service';

const generateAiInsightsPrompts = (
  file: ScanFile,
  items: ScannerBaseProviderScanResultItem[],
) => `
Provide me insights and/or code fixes for the feedbacks we have from the statical code analysis for the TRON Smart Contract in Solidity.

Source Code:

\`\`\`solidity
${file.source}
\`\`\`

Code Analysis Result:
${items.map((item) => `- [Impact: ${item.impact}]: ${item.description}\n`)}

Keep in mid:
- It's for TRON Blockchain on TVM (not EVM)
- TVM (TRON Virtual Machine) is compatible with the corresponding Ethereum technologies, such as Solidity and EVM with few differences.
- TVM uses energy instead of gas. The energy price is currently 280 sun
- GASPRICE, DIFFICULTY and GASLIMIT return zero in TVM; BASEFEE is currently not supported

Important:
- Don't provide full source-code with fixes, provide only snippets per feedback
- Show only code if needed
`;

interface AiInsightsResult {
  insights: {
    file: {
      path: string;
    };
    content: string;
  }[];
}

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateInsightsFromScanResult(
    files: ScanFile[],
    result: ScannerResult,
  ): Promise<AiInsightsResult> {
    const filePrompts: { file: ScanFile; prompt: string }[] = [];
    files.forEach((file) => {
      const allItems: ScannerBaseProviderScanResultItem[] = [];
      result.providers
        .filter((p) => p.name === 'slither')
        .forEach((provider) => {
          allItems.push(
            ...provider.result.items
              .filter((item) => item?.file?.path === file.path)
              .filter(
                (item) => !item.description.includes('allows old version'),
              ),
          );
        });
      if (allItems.length > 0) {
        const prompt = generateAiInsightsPrompts(file, allItems);
        filePrompts.push({
          file,
          prompt,
        });
      }
    });
    const insights = await Promise.all(
      filePrompts.map(async (filePrompt) => {
        const chatCompletion = await this.openai.chat.completions.create({
          messages: [{ role: 'system', content: filePrompt.prompt }],
          model: 'gpt-3.5-turbo',
        });
        console.log(chatCompletion);
        return {
          file: filePrompt.file,
          content: chatCompletion.choices[0].message.content,
        };
      }),
    );
    return {
      insights,
    };
  }
}
