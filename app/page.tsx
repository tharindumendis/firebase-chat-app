'use client';

import { MessageSquare, Zap, Shield, Users } from 'lucide-react';
import { SignInButton } from '@/components/auth/sign-in-button';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !loading) {
      router.push('/chat');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Real-time messaging
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Firebase Chat App
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A modern, real-time chat application powered by Next.js and Firebase.
            Connect instantly with anyone, anywhere.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Real-time Messaging
            </h3>
            <p className="text-gray-600">
              Send and receive messages instantly with real-time updates powered by Firebase.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Secure Authentication
            </h3>
            <p className="text-gray-600">
              Sign in securely with Google authentication. Your data is protected.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Online Presence
            </h3>
            <p className="text-gray-600">
              See who is online and available to chat. Stay connected with your contacts.
            </p>
          </div>
        </div>

        <div className="text-center">
          <SignInButton />
          <p className="mt-4 text-sm text-gray-500">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
