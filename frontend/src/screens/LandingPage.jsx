import React, { useState } from 'react';
import config from '../constants.js';

const LandingPage = ({ onLogin, onSignup }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginView) {
      onLogin(email, password);
    } else {
      onSignup(name, email, password);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Laplace Explorer</h1>
          <a 
            href={`${config.BACKEND_URL}/admin`} 
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-600 hover:text-blue-500"
          >
            Admin Panel
          </a>
        </nav>
      </header>
      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-16 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              Master the <span className="text-blue-600">Laplace Transform</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto md:mx-0">
              Explore a comprehensive library of transform pairs, solve practice problems, and contribute to a community of learners.
            </p>
             <button 
                onClick={() => onLogin('student@example.com', 'password')}
                className="mt-8 w-full md:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Try Demo Account
              </button>
          </div>
          <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-2"> {isLoginView ? 'Welcome Back' : 'Create Account'}</h3>
            <p className="text-center text-gray-500 mb-6">Enter your details to get started.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLoginView && (
                <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              )}
              <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
                {isLoginView ? 'Login' : 'Sign Up'}
              </button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-4">
              {isLoginView ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button onClick={() => setIsLoginView(!isLoginView)} className="font-medium text-blue-600 hover:underline">
                {isLoginView ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
