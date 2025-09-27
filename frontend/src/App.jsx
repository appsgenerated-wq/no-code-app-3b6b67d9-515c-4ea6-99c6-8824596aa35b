import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import './index.css';
import { testBackendConnection, createManifestWithLogging } from './services/apiService.js';

function App() {
  const [user, setUser] = useState(null);
  const [backendConnected, setBackendConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Testing...');
  const [loading, setLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('landing');
  const manifest = createManifestWithLogging('3b6b67d9-515c-4ea6-99c6-8824596aa35b');

  useEffect(() => {
    manifest.from('User').me()
      .then(userData => {
        if (userData) {
          setUser(userData);
          setCurrentScreen('dashboard');
        }
      })
      .catch(() => {
        setUser(null);
        setCurrentScreen('landing');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [])

  useEffect(() => {
    // Enhanced backend connection test with detailed logging
    const testConnection = async () => {
      console.log('🚀 [APP] Starting enhanced backend connection test...');
      console.log('🔍 [APP] Backend URL:', 'https://no-code-app-3b6b67d9-515c-4ea6-99c6-8824596aa35b-generated-apps-234234-234.us-central1.run.app');
      console.log('🔍 [APP] App ID:', '3b6b67d9-515c-4ea6-99c6-8824596aa35b');

      setConnectionStatus('Testing connection...');

      const result = await testBackendConnection(3);
      setBackendConnected(result.success);

      if (result.success) {
        console.log('✅ [APP] Backend connection successful - proceeding with app initialization');
        setConnectionStatus('Connected');

        // Test Manifest SDK connection
        console.log('🔍 [APP] Testing Manifest SDK connection...');
        try {
          const manifest = createManifestWithLogging('3b6b67d9-515c-4ea6-99c6-8824596aa35b');
          console.log('✅ [APP] Manifest SDK initialized successfully');
        } catch (error) {
          console.error('❌ [APP] Manifest SDK initialization failed:', error);
          setConnectionStatus('SDK Error');
        }
      } else {
        console.error('❌ [APP] Backend connection failed - app may not work properly');
        console.error('❌ [APP] Connection error:', result.error);
        setConnectionStatus('Connection Failed');
      }
    };

    testConnection();
  }, []);;

  const login = async (email, password) => {
    try {
      await manifest.login(email, password);
      const userData = await manifest.from('User').me();
      setUser(userData);
      setCurrentScreen('dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };
  
  const signup = async (name, email, password) => {
    try {
        await manifest.from('User').signup({ name, email, password, role: 'student' });
        await login(email, password);
    } catch (error) {
        console.error('Signup failed:', error);
        alert('Signup failed. The email might already be in use.');
    }
  };

  const logout = async () => {
    await manifest.logout();
    setUser(null);
    setCurrentScreen('landing');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {/* Enhanced Backend Connection Status Indicator */}
      <div className="fixed top-4 right-4 z-50">
        <div className={`px-3 py-2 rounded-lg text-xs font-medium shadow-lg ${backendConnected ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span>{backendConnected ? '✅ Backend Connected' : '❌ Backend Disconnected'}</span>
          </div>
          <div className="text-xs opacity-75 mt-1">{connectionStatus}</div>
        </div>
      </div>
      
        <p className="text-gray-600">Loading Application...</p>
      </div>
    );
  }

  return (
    <div>
      {currentScreen === 'landing' ? (
        <LandingPage onLogin={login} onSignup={signup} />
      ) : (
        <DashboardPage user={user} onLogout={logout} manifest={manifest} />
      )}
    </div>
  );
}

export default App;
