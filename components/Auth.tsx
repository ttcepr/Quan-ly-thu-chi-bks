import React, { useState } from 'react';
import { User } from '../types';
import { Button } from './Button';
import { Lock, User as UserIcon, LogIn, UserPlus } from 'lucide-react';
import { APP_NAME } from '../constants';

interface AuthProps {
  onLogin: (user: User) => void;
  onRegister: (user: Omit<User, 'id' | 'createdAt'>) => boolean; // returns success
}

export const Auth: React.FC<AuthProps> = ({ onLogin, onRegister }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // Mock login validation is handled in App.tsx typically, but here we pass data up
      // For this structure, we'll trigger a login attempt passed from parent
      // Note: Real checking logic needs access to user list, we will assume parent handles actual check
      // For now, let's just pass the data to a parent handler which returns success/fail or user object
      // But props say onLogin takes a User. Let's refactor slightly to pass credentials up or handle here if we had the list.
      // To keep it simple, we will emit an event with credentials to the parent.
      
      // Since the prop expects a User object on success, the parent needs to handle the verification.
      // However, to keep Auth component pure, let's assume the parent passed a "verifyLogin" function.
      // For this simplified edit, I will cheat slightly: The parent App.tsx handles the actual logic.
      // But wait, the prop is `onLogin: (user: User) => void`. 
      // We need a verify function passed down.
      // Let's change the interface in usage. But for now, let's create a "requestLogin" callback or assume parent passed specific handlers.
      
      // Actually, let's modify the component to accept a verify callback.
      // But strictly following the prompt, let's dispatch a custom event or use the props provided.
      // Let's assume the parent passed a wrapper function `handleLoginAttempt` that we call `onLogin` with if successful.
      // Since we can't see the user list here, we have to rely on the parent.
      
      // *Correction*: Let's assume the `onLogin` prop here is actually `handleLogin` from App.tsx 
      // which expects a User. But we don't have the User object here.
      // Let's trigger a custom prop.
    }
  };

  // Re-defining props for clarity in this standalone context within the XML
  // We need to pass the login credentials up to App.tsx
};

// SIMPLIFIED AUTH COMPONENT FOR APP INTEGRATION
interface LoginScreenProps {
  onLoginSubmit: (username: string, password: string) => void;
  onRegisterSubmit: (username: string, password: string, fullName: string) => void;
  error?: string;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSubmit, onRegisterSubmit, error }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      onLoginSubmit(username, password);
    } else {
      onRegisterSubmit(username, password, fullName);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-blue-600 p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">FinControl</h1>
          <p className="text-blue-100">{APP_NAME}</p>
        </div>
        
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-lg bg-gray-100 p-1">
              <button
                onClick={() => setMode('login')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  mode === 'login' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Đăng nhập
              </button>
              <button
                onClick={() => setMode('register')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  mode === 'register' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Đăng ký
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex items-center">
              <span className="mr-2">⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    required={mode === 'register'}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tên đăng nhập</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors mt-6"
            >
              {mode === 'login' ? (
                <>
                  <LogIn size={18} className="mr-2" /> Đăng Nhập
                </>
              ) : (
                <>
                  <UserPlus size={18} className="mr-2" /> Đăng Ký
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
