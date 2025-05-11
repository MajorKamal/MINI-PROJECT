import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Bus, User, Lock, AlertCircle } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Simulate network delay
    setTimeout(() => {
      const success = login(username, password);
      
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid username or password');
        setIsLoading(false);
      }
    }, 800);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-primary-500 text-white p-3 rounded-full">
                <Bus size={32} />
              </div>
            </div>
            <h1 className="text-2xl font-heading font-bold text-gray-800">Kolkata Bus Timetable</h1>
            <p className="text-gray-500 mt-2">Sign in to access bus routes and schedules</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center text-sm">
                <AlertCircle size={18} className="mr-2 flex-shrink-0" />
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="label">Username</label>
                <div className="relative">
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input pl-10"
                    placeholder="Enter your username"
                  />
                  <User size={18} className="absolute left-3 top-3 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500 mt-1">Hint: Use 'student' as the username</p>
              </div>
              
              <div>
                <label htmlFor="password" className="label">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input pl-10"
                    placeholder="Enter your password"
                  />
                  <Lock size={18} className="absolute left-3 top-3 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500 mt-1">Hint: Use 'password' as the password</p>
              </div>
              
              <button
                type="submit"
                className={`btn btn-primary w-full ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </div>
                ) : 'Sign In'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;