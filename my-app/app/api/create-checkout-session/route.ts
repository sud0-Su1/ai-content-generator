// app/api/create-checkout-session/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { auth } from '@clerk/nextjs/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // apiVersion: '2023-10-16',
});

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User not authenticated' },
        { status: 401 }
      );
    }

    const { planKey, billingCycle } = await request.json();

    // Map plan keys to Stripe price IDs
    const priceIds: Record<string, Record<string, string>> = {
      pro: {
        monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID!,
        yearly: process.env.STRIPE_PRO_YEARLY_PRICE_ID!,
      },
      enterprise: {
        monthly: process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID!,
        yearly: process.env.STRIPE_ENTERPRISE_YEARLY_PRICE_ID!,
      },
    };

    const priceId = priceIds[planKey]?.[billingCycle];

    if (!priceId) {
      return NextResponse.json(
        { error: 'Invalid plan or billing cycle' },
        { status: 400 }
      );
    }

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_URL}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/billing?canceled=true`,
      automatic_tax: { enabled: true },
      billing_address_collection: 'required',
      client_reference_id: userId, // Link to your user ID
      metadata: {
        userId: userId,
        planKey: planKey,
        billingCycle: billingCycle,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    console.error('Stripe error:', err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}