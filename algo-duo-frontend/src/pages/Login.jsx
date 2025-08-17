import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GiOwl } from 'react-icons/gi';
import { validateEmail } from '../utils/validators';
import toast from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(formData.email)) {
      toast.error('Please enter a valid email');
      return;
    }
    
    if (!formData.password) {
      toast.error('Please enter your password');
      return;
    }

    setLoading(true);
    const result = await login(formData);
    setLoading(false);

    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-duo-green-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Owl Mascot */}
        <div className="text-center mb-8 animate-bounce-slow">
          <div className="inline-block bg-duo-green-400 p-6 rounded-full shadow-duo-lg">
            <GiOwl className="text-white text-6xl" />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-gray-800">Welcome back!</h2>
            <p className="text-gray-600 mt-2 font-semibold">Log in to continue learning</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-duo"
                placeholder="Email"
                required
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-duo"
                placeholder="Password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-duo text-lg py-4"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Logging in...
                </span>
              ) : (
                'LOG IN'
              )}
            </button>

            <div className="text-center">
              <Link to="/forgot-password" className="text-duo-blue-400 hover:text-duo-blue-500 font-bold text-sm">
                FORGOT PASSWORD?
              </Link>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t-2 border-gray-100 text-center">
            <p className="text-gray-600 font-semibold">
              Don't have an account?{' '}
              <Link to="/register" className="text-duo-green-500 hover:text-duo-green-600 font-bold">
                SIGN UP
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;