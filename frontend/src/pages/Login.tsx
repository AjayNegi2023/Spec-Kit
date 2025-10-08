import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';
import type { LoginCredentials } from '../types/models';

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const credentials: LoginCredentials = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    try {
      setError(null);
      setLoading(true);
      await login(credentials);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-stretch">
      {/* Left Side - Illustration */}
      <div className="hidden md:flex md:w-1/2 bg-primary-600 text-white p-12 flex-col justify-center items-center transform transition-transform duration-1000 ease-in-out">
        <div className={`space-y-6 ${mounted ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} transition-all duration-1000 ease-in-out`}>
          <div className="text-6xl mb-4">🎓</div>
          <h2 className="text-3xl font-bold text-center">Welcome to Spec-Kit</h2>
          <p className="text-lg text-center text-primary-100 max-w-md">
            Connect with alumni, discover opportunities, and grow your professional network.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-primary-500/20 p-4 rounded-lg backdrop-blur-sm">
              <div className="text-2xl mb-2">👥</div>
              <h3 className="font-semibold mb-1">Network</h3>
              <p className="text-sm text-primary-100">Connect with professionals</p>
            </div>
            <div className="bg-primary-500/20 p-4 rounded-lg backdrop-blur-sm">
              <div className="text-2xl mb-2">💼</div>
              <h3 className="font-semibold mb-1">Jobs</h3>
              <p className="text-sm text-primary-100">Find opportunities</p>
            </div>
            <div className="bg-primary-500/20 p-4 rounded-lg backdrop-blur-sm">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="font-semibold mb-1">Growth</h3>
              <p className="text-sm text-primary-100">Develop your skills</p>
            </div>
            <div className="bg-primary-500/20 p-4 rounded-lg backdrop-blur-sm">
              <div className="text-2xl mb-2">🤝</div>
              <h3 className="font-semibold mb-1">Mentorship</h3>
              <p className="text-sm text-primary-100">Learn from experts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className={`w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-50 ${mounted ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} transition-all duration-1000 ease-in-out`}>
        <div className="card w-full max-w-md p-8 transform transition-all duration-300 hover:shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Please sign in to continue</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg mb-6 animate-shake">
              <div className="flex items-center">
                <span className="mr-2">⚠️</span>
                {error}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 transition-colors group-focus-within:text-primary-600">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">📧</span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="input-field pl-10 transition-all duration-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  disabled={loading}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="group">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 transition-colors group-focus-within:text-primary-600">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="input-field pl-10 transition-all duration-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  disabled={loading}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  <span className="mr-2">🚀</span>
                  Sign In
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?{' '}
              <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                Contact admin
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}