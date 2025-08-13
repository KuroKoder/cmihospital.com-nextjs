"use client";
import React, { useState, useEffect } from 'react';
import { testApiConnection, debugApiConfig } from '@/lib/api/strapi';

interface ApiTestResult {
  success: boolean;
  message: string;
  details: any;
}

const ApiDebugComponent: React.FC = () => {
  const [testResult, setTestResult] = useState<ApiTestResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const runApiTest = async () => {
    setIsLoading(true);
    try {
      const result = await testApiConnection();
      setTestResult(result);
      console.log('API Test Result:', result);
    } catch (error) {
      setTestResult({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
        details: { error: String(error) }
      });
    } finally {
      setIsLoading(false);
    }
  };

  const showDebugInfo = () => {
    debugApiConfig();
    setShowDetails(true);
  };

  useEffect(() => {
    // Run test on component mount
    runApiTest();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-dashed border-gray-300 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        🔧 Strapi API Connection Debug
      </h2>
      
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={runApiTest}
            disabled={isLoading}
            className={`px-4 py-2 rounded-md font-medium ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {isLoading ? '🔄 Testing...' : '🔄 Test Connection'}
          </button>
          
          <button
            onClick={showDebugInfo}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md font-medium"
          >
            📊 Show Debug Info
          </button>
        </div>

        {testResult && (
          <div className={`p-4 rounded-md border-l-4 ${
            testResult.success 
              ? 'bg-green-50 border-green-400 text-green-800' 
              : 'bg-red-50 border-red-400 text-red-800'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">
                {testResult.success ? '✅' : '❌'}
              </span>
              <h3 className="font-semibold">
                {testResult.success ? 'Connection Successful' : 'Connection Failed'}
              </h3>
            </div>
            
            <p className="mb-3">{testResult.message}</p>
            
            <div className="text-sm">
              <h4 className="font-medium mb-2">Connection Details:</h4>
              <ul className="space-y-1">
                <li>
                  <strong>Has Token:</strong> {testResult.details.hasToken ? '✅ Yes' : '❌ No'}
                </li>
                <li>
                  <strong>Base URL:</strong> {testResult.details.baseUrl}
                </li>
                <li>
                  <strong>Test URL:</strong> {testResult.details.testUrl}
                </li>
                {testResult.success && testResult.details.totalCount !== undefined && (
                  <li>
                    <strong>Articles in CMS:</strong> {testResult.details.totalCount}
                  </li>
                )}
              </ul>
            </div>

            {!testResult.success && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                <h4 className="font-semibold text-yellow-800 mb-2">💡 Troubleshooting Tips:</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  {!testResult.details.hasToken && (
                    <li>• Set your STRAPI_API_TOKEN in environment variables</li>
                  )}
                  <li>• Verify Strapi server is running at {testResult.details.baseUrl}</li>
                  <li>• Check API token permissions in Strapi admin</li>
                  <li>• Ensure articles and categories collections are published</li>
                  <li>• Check CORS settings in Strapi if connecting from browser</li>
                </ul>
              </div>
            )}
          </div>
        )}

        {showDetails && (
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="font-semibold mb-2">📋 Environment Variables Check:</h4>
            <ul className="text-sm space-y-1">
              <li>
                <strong>NEXT_PUBLIC_STRAPI_URL:</strong> {process.env.NEXT_PUBLIC_STRAPI_URL || '❌ Not set'}
              </li>
              <li>
                <strong>STRAPI_API_TOKEN:</strong> {process.env.STRAPI_API_TOKEN ? '✅ Set (server-side)' : '❌ Not set'}
              </li>
              <li>
                <strong>NEXT_PUBLIC_STRAPI_API_TOKEN:</strong> {process.env.NEXT_PUBLIC_STRAPI_API_TOKEN ? '✅ Set (client-side)' : '❌ Not set'}
              </li>
              <li>
                <strong>NODE_ENV:</strong> {process.env.NODE_ENV}
              </li>
            </ul>
            <p className="text-xs text-gray-600 mt-2">
              Check your browser console for detailed debug logs.
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <h4 className="font-semibold text-blue-800 mb-2">📝 Setup Instructions:</h4>
        <ol className="text-sm text-blue-700 space-y-1">
          <li>1. Create a <code>.env.local</code> file in your project root</li>
          <li>2. Add: <code>STRAPI_API_TOKEN=your_token_here</code></li>
          <li>3. Add: <code>NEXT_PUBLIC_STRAPI_URL=http://your-strapi-url.com</code></li>
          <li>4. Get your token from Strapi Admin → Settings → API Tokens</li>
          <li>5. Ensure token has "Custom" type with read permissions for articles & categories</li>
          <li>6. Restart your Next.js development server</li>
        </ol>
      </div>
    </div>
  );
};

export default ApiDebugComponent;