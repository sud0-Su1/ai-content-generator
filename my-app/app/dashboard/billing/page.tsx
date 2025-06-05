// app/billing/page.tsx
'use client';

import React, { useState } from 'react';
import { CreditCard, Check, Star, Shield, Zap } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

type BillingCycle = 'monthly' | 'yearly';
type PlanKey = 'free' | 'pro' | 'enterprise';

interface Plan {
  name: string;
  price: {
    monthly: number;
    yearly: number;
  };
  description: string;
  features: string[];
  color: string;
  textColor: string;
  popular: boolean;
}

const BillingPage = () => {
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>('pro');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [isProcessing, setIsProcessing] = useState(false);

  const plans: Record<PlanKey, Plan> = {
    free: {
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for getting started',
      features: [
        '5 AI-generated templates per month',
        'Basic template customization',
        'Community support',
        'Standard templates library'
      ],
      color: 'bg-gray-100',
      textColor: 'text-gray-900',
      popular: false
    },
    pro: {
      name: 'Pro',
      price: { monthly: 19, yearly: 190 },
      description: 'Most popular for content creators',
      features: [
        'Unlimited AI-generated templates',
        'Advanced customization options',
        'Priority support',
        'Premium templates library',
        'SEO optimization tools',
        'Analytics dashboard'
      ],
      color: 'bg-gradient-to-br from-purple-600 to-red-600',
      textColor: 'text-white',
      popular: true
    },
    enterprise: {
      name: 'Enterprise',
      price: { monthly: 49, yearly: 490 },
      description: 'For teams and businesses',
      features: [
        'Everything in Pro',
        'Team collaboration tools',
        'White-label solutions',
        'Custom integrations',
        'Dedicated account manager',
        'Advanced security features',
        'API access'
      ],
      color: 'bg-gradient-to-br from-gray-800 to-gray-900',
      textColor: 'text-white',
      popular: false
    }
  };

  const handleSubscribe = async (planName: PlanKey) => {
    // Check if user is signed in
    if (!isSignedIn) {
      router.push('/sign-in?redirect_url=/billing');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Dynamically import Stripe to avoid SSR issues
      const { loadStripe } = await import('@stripe/stripe-js');
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

      if (!stripe) {
        throw new Error('Stripe failed to initialize');
      }

      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planKey: planName,
          billingCycle: billingCycle,
        }),
      });

      const { sessionId, error } = await response.json();

      if (error) {
        throw new Error(error);
      }

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`Payment failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const getDiscountPercentage = (plan: Plan): number => {
    if (plan.price.yearly === 0) return 0;
    const monthlyTotal = plan.price.monthly * 12;
    const yearlyTotal = plan.price.yearly;
    return Math.round(((monthlyTotal - yearlyTotal) / monthlyTotal) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#872341] via-[#BE3144] to-[#09122C] text-white py-16">
 <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl opacity-90">
            Unlock the full potential of AI-powered content creation
          </p>
          {isSignedIn && user && (
            <p className="text-sm opacity-75 mt-2">
              Welcome back, {user.firstName || user.emailAddresses[0].emailAddress}!
            </p>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-8">
        {/* User Authentication Notice */}
        {!isSignedIn && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <div className="flex items-center justify-center text-blue-800">
              <Shield className="w-5 h-5 mr-2" />
              <span>Please sign in to subscribe to a plan</span>
            </div>
          </div>
        )}

        {/* Billing Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg">
            <div className="flex">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  billingCycle === 'yearly'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Yearly
                <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Save up to 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {(Object.entries(plans) as [PlanKey, Plan][]).map(([key, plan]) => (
            <div
              key={key}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-105 ${
                selectedPlan === key ? 'ring-4 ring-purple-600' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0">
                  <div className="bg-gradient-to-r from-purple-600 to-red-600 text-white text-center py-2 text-sm font-semibold">
                    <Star className="inline w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className={`${plan.color} ${plan.textColor} p-8 ${plan.popular ? 'pt-16' : ''}`}>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className={`mb-4 ${plan.textColor === 'text-white' ? 'opacity-90' : 'opacity-70'}`}>
                  {plan.description}
                </p>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold">
                    ${plan.price[billingCycle]}
                  </span>
                  {plan.price[billingCycle] > 0 && (
                    <span className="ml-2 opacity-70">
                      /{billingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                  )}
                </div>
                {billingCycle === 'yearly' && plan.price.yearly > 0 && (
                  <div className="text-sm opacity-80 mb-4">
                    Save {getDiscountPercentage(plan)}% compared to monthly
                  </div>
                )}
              </div>

              <div className="p-8">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    setSelectedPlan(key);
                    if (key !== 'free') {
                      handleSubscribe(key);
                    }
                  }}
                  disabled={isProcessing}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                    key === 'free'
                      ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      : selectedPlan === key
                      ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isProcessing && selectedPlan === key ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : key === 'free' ? (
                    'Get Started Free'
                  ) : !isSignedIn ? (
                    'Sign In to Subscribe'
                  ) : (
                    `Subscribe to ${plan.name}`
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Why Choose Our Platform?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Generate professional content in seconds with our AI-powered tools.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Secure & Reliable</h3>
              <p className="text-gray-600">Enterprise-grade security with 99.9% uptime guarantee.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CreditCard className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Flexible Billing</h3>
              <p className="text-gray-600">Cancel anytime, no hidden fees, with secure Stripe payments.</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Can I change my plan anytime?</h3>
              <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is there a free trial?</h3>
              <p className="text-gray-600">Our Free plan gives you access to basic features. You can upgrade to Pro or Enterprise anytime to unlock advanced features.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How secure is my payment information?</h3>
              <p className="text-gray-600">We use Stripe for payment processing, which is PCI DSS compliant and trusted by millions of businesses worldwide.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;