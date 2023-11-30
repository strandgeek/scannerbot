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
      success_url: `${process.env.WEBAPP_BASE_URL}/app/subscription/completed`,
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

  async generateBillingPortalLink(user: User) {
    const subscription = await this.prismaService.billingUserSubscription.findUnique({
      where: {
        userId: user.id,
      },
    });
    if (!subscription) {
      throw new Error('User does not have a subscription');
    }
    const { url } = await this.stripe.billingPortal.sessions.create({
      customer: subscription.stripeCustomerId,
      return_url: `${process.env.WEBAPP_BASE_URL}/app`,
    });
    return url;
  }

  stripeSubscriptionToPrismaSubscription(subscription: Stripe.Subscription) {
    return {
      stripeId: subscription.id,
      stripeStatus: subscription.status,
      stripeCustomerId: subscription.customer as string,
      startDate: new Date(subscription.current_period_start * 1000),
      endDate: new Date(subscription.current_period_end * 1000),
    }
  }

  async handleStripeEvent(event: Stripe.Event) {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.client_reference_id;
      const subscription = await this.stripe.subscriptions.retrieve(session.subscription as string);
      return this.prismaService.billingUserSubscription.upsert({
        where: {
          userId,
        },
        create: {
          ...this.stripeSubscriptionToPrismaSubscription(subscription),
          user: {
            connect: {
              id: userId,
            }
          }
        },
        update: {
          ...this.stripeSubscriptionToPrismaSubscription(subscription),
        },
      })
    }
    if (['customer.subscription.deleted', 'customer.subscription.updated'].includes(event.type)) {
      const subscription = event.data.object as Stripe.Subscription;
      return this.prismaService.billingUserSubscription.update({
        where: {
          stripeId: subscription.id,
        },
        data: {
          ...this.stripeSubscriptionToPrismaSubscription(subscription),
        }
      })
    }
  }

  async userHasActiveSubscription(user: User) {
    const subscription = await this.prismaService.billingUserSubscription.findUnique({
      where: {
        userId: user.id,
      },
    });
    if (!subscription) {
      return false;
    }
    return !['unpaid', 'canceled'].includes(subscription.stripeStatus);
  }
}
