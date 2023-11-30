import { Injectable } from '@nestjs/common';
import { Client as MailjetClient } from 'node-mailjet';


@Injectable()
export class MailerService extends MailjetClient {
  constructor() {
    super({
      apiKey: process.env.MAILJET_API_KEY,
      apiSecret: process.env.MAILJET_API_SECRET,
    });
  }
}
