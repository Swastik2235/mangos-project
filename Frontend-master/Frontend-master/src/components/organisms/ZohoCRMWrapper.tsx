import React from 'react';
import { useLocation } from 'react-router-dom';
import ZohoCRM from '../../pages/Admin/ZohoCRM';
import ProtectedRoute from './login/ProtectedRoute';

const ZohoCRMWrapper: React.FC = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const hasOAuthCode = urlParams.get('code');

  // If there's an OAuth code, don't require authentication (OAuth callback)
  if (hasOAuthCode) {
    return <ZohoCRM />;
  }

  // Otherwise, require authentication
  return (
    <ProtectedRoute>
      <ZohoCRM />
    </ProtectedRoute>
  );
};

export default ZohoCRMWrapper;