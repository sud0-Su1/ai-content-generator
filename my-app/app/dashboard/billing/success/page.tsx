// app/billing/success/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

export default function SuccessPage() {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // You can verify the session here if needed
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Processing your subscription...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          
          <p className="text-gray-600 mb-6">
            {user?.firstName ? `Thank you ${user.firstName}` : 'Thank you'} for your subscription. You now have access to all premium features.
          </p>
          
          <div className="space-y-3">
            <Link
              href="/dashboard"
              className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center"
            >
              Go to Dashboard
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            
            <Link
              href="/billing"
              className="w-full bg-gray-100 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors block"
            >
              View Billing
            </Link>
          </div>
          
          {sessionId && (
            <p className="text-xs text-gray-500 mt-4">
              Session ID: {sessionId.slice(0, 20)}...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}