import { BadRequestException, Controller, Get, Post, RawBodyRequest, Req, UseGuards } from '@nestjs/common';
import { BillingService } from './billing.service';
import { User } from '@prisma/client';
import { LoggedUser } from 'src/common/decorators/logged-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import Stripe from 'stripe';

@Controller('billing')
export class BillingController {

  constructor(private billingService: BillingService) { }

  @Post('/webhook')
  async webhook(
    @Req() req: RawBodyRequest<Request>,
  ) {
    const sig = req.headers['stripe-signature'];

    let event: Stripe.Event;

    try {
      event = Stripe.webhooks.constructEvent(req.body as any, sig, process.env.BILLING_STRIPE_ENDPOINT_SECRET);
      await this.billingService.handleStripeEvent(event);
    } catch (err) {
      throw new BadRequestException(`Webhook Error: ${err.message}`);
    }
    return {
      status: true,
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/generate-subscription-link')
  async generateSubscriptionLink(@LoggedUser() user: User) {
    const url = await this.billingService.generateSubscriptionLink(user);
    return { url };
  }

  @UseGuards(JwtAuthGuard)
  @Post('/generate-billing-portal-link')
  async generateBillingPortalLink(@LoggedUser() user: User) {
    const url = await this.billingService.generateBillingPortalLink(user);
    return { url };
  }
}
