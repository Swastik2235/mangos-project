import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ZohoCRM from '../../pages/Admin/ZohoCRM';
import ProtectedRoute from './login/ProtectedRoute';

const ZohoCRMWrapper: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(location.search);
  const hasOAuthCode = urlParams.get('code');

  console.log('ZohoCRMWrapper - path:', location.pathname, 'hasCode:', !!hasOAuthCode);

  // If we're on the callback route with a code, redirect to main route with the code
  useEffect(() => {
    if (location.pathname === '/zoho-oauth-callback' && hasOAuthCode) {
      console.log('Redirecting from callback to main route with code');
      navigate(`/zoho-crm${location.search}`, { replace: true });
    }
  }, [location.pathname, location.search, hasOAuthCode, navigate]);

  // If there's an OAuth code, don't require authentication (OAuth callback)
  if (hasOAuthCode) {
    return (
      <div style={{ padding: '20px' }}>
        <h3>Processing OAuth callback...</h3>
        <ZohoCRM />
      </div>
    );
  }

  // Otherwise, require authentication
  return (
    <ProtectedRoute>
      <ZohoCRM />
    </ProtectedRoute>
  );
};

export default ZohoCRMWrapper;