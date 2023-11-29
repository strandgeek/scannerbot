import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import Stripe from 'stripe';

@Injectable()
export class BillingService {

  stripe: Stripe;

  constructor(private prismaService: PrismaService) {
    this.stripe = new Stripe(process.env.BILLING_STRIPE_SECRET_KEY);
  }

  async generateSubscriptionLink(user: User) {
    const { url } = await this.stripe.checkout.sessions.create({
      line_items: [
        {
          price: process.env.BILLING_STRIPE_PRICE_ID,
          quantity: 1,
        }
      ],
      mode: 'subscription',

      tax_id_collection: {
        enabled: true,
      },
      success_url: process.env.BILLING_SUBSCRIPTION_SUCCESS_URL,
      client_reference_id: user.id,
      automatic_tax: {
        enabled: true,
      },
      subscription_data: {
        trial_period_days: 30,
      },
      customer_email: user.email,
      metadata: {
        user_id: user.id,
      }
    });
    return url;
  }

  async handleStripeEvent(event: Stripe.Event) {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.client_reference_id;
      const subscription = await this.stripe.subscriptions.retrieve(session.subscription as string);
      return this.prismaService.billingUserSubscription.create({
        data: {
          stripeId: subscription.id,
          stripeStatus: subscription.status,
          startDate: new Date(subscription.current_period_start * 1000),
          endDate: new Date(subscription.current_period_end * 1000),
          user: {
            connect: {
              id: userId,
            }
          }
        }
      })
    }
  }
}
