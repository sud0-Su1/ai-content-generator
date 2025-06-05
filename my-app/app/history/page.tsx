"use client"
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, FileText, User } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

interface HistoryItem {
  id: number;
  formData: string;
  aiResponse: string;
  templateSlug: string;
  createdAt: string;
  createdBy: string;
}

function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    fetchHistory();
  }, [user]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/history');
      
      if (!response.ok) {
        throw new Error('Failed to fetch history');
      }
      
      const data = await response.json();
      setHistory(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching history:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const parseFormData = (formDataString: string) => {
    try {
      return JSON.parse(formDataString);
    } catch {
      return {};
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading history...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Link href='/dashboard'>
          <Button className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Error loading history: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link href='/dashboard'>
          <Button className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Content History</h1>
        <p className="text-gray-600 mt-2">View your previously generated AI content</p>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No history yet</h3>
          <p className="text-gray-500">Start creating content to see your history here.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {history.map((item) => {
            const formData = parseFormData(item.formData);
            return (
              <div key={item.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 rounded-full p-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 capitalize">
                          {item.templateSlug.replace('-', ' ')}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(item.createdAt)}
                          <User className="h-4 w-4 ml-3 mr-1" />
                          {item.createdBy}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form Data */}
                  {Object.keys(formData).length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Input Data:</h4>
                      <div className="bg-gray-50 rounded-md p-3">
                        {Object.entries(formData).map(([key, value]) => (
                          <div key={key} className="mb-2 last:mb-0">
                            <span className="text-sm font-medium text-gray-600 capitalize">
                              {key}:
                            </span>
                            <span className="text-sm text-gray-800 ml-2">
                              {String(value)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* AI Response */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Generated Content:</h4>
                    <div className="bg-blue-50 rounded-md p-4">
                      <div className="text-sm text-gray-800 whitespace-pre-wrap">
                        {item.aiResponse}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default HistoryPage;