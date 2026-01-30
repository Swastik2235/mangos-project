import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Business, Link, LinkOff } from '@mui/icons-material';
import zohoCrmService from '../../services/zohoCrmService';

const ZohoCRM: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    checkAuthentication();
    handleOAuthCallback();
  }, []);

  const checkAuthentication = () => {
    try {
      const isAuth = zohoCrmService.isAuthenticated();
      setIsAuthenticated(isAuth);
    } catch (error) {
      console.error('Error checking authentication:', error);
      setError('Error checking authentication status');
    }
  };

  const handleOAuthCallback = () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const error = urlParams.get('error');
      
      console.log('OAuth callback - code:', !!code, 'error:', error, 'path:', window.location.pathname);
      
      if (error) {
        setError(`OAuth error: ${error}`);
        return;
      }
      
      if (code) {
        // For now, just simulate success
        setIsLoading(true);
        setTimeout(() => {
          // Simulate token storage
          zohoCrmService.setAccessToken('demo_token_' + Date.now());
          setIsAuthenticated(true);
          setIsLoading(false);
          
          // If we're on the callback route, redirect to main route
          if (window.location.pathname === '/zoho-oauth-callback') {
            window.location.href = '/zoho-crm';
          } else {
            // Clean up URL if we're already on main route
            window.history.replaceState({}, document.title, '/zoho-crm');
          }
        }, 2000);
      }
    } catch (error) {
      console.error('Error handling OAuth callback:', error);
      setError('Error processing OAuth callback');
    }
  };

  const connectToZoho = () => {
    try {
      setError('');
      const authUrl = zohoCrmService.getAuthorizationUrl();
      console.log('Redirecting to:', authUrl);
      window.location.href = authUrl;
    } catch (error) {
      console.error('Error connecting to Zoho:', error);
      setError('Failed to initiate Zoho connection');
    }
  };

  const disconnect = () => {
    try {
      zohoCrmService.logout();
      setIsAuthenticated(false);
      setError('');
    } catch (error) {
      console.error('Error disconnecting:', error);
      setError('Error disconnecting from Zoho');
    }
  };

  // Show loading state during OAuth processing
  if (isLoading) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Card sx={{ p: 4, textAlign: 'center' }}>
          <CircularProgress size={60} sx={{ mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Connecting to Zoho CRM...
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please wait while we complete the authentication process.
          </Typography>
        </Card>
      </Box>
    );
  }

  // Show authenticated state
  if (isAuthenticated) {
    return (
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <Business color="primary" />
              Zoho CRM Integration
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Successfully connected to Zoho CRM
            </Typography>
          </Box>
          
          <Button
            variant="outlined"
            color="error"
            startIcon={<LinkOff />}
            onClick={disconnect}
          >
            Disconnect
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {/* Connected State */}
        <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
          <CardContent sx={{ textAlign: 'center', p: 4 }}>
            <Business sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom color="success.main">
              Connected to Zoho CRM!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Your Zoho CRM account is successfully connected. CRM features will be available soon.
            </Typography>
            
            <Typography variant="body2" color="text.secondary">
              Integration Status: Active ✅
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  // Show connection required state
  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <Business color="primary" />
            Zoho CRM Integration
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your customer relationships seamlessly within MangOS
          </Typography>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Authentication Required Card */}
      <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
        <CardContent sx={{ textAlign: 'center', p: 4 }}>
          <Business sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Authentication Required
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            To access Zoho CRM features, you need to connect your Zoho account with MangOS.
          </Typography>
          
          <Box sx={{ textAlign: 'left', mb: 3 }}>
            <Typography variant="h6" gutterBottom>Features:</Typography>
            <ul>
              <li>Secure OAuth 2.0 authentication</li>
              <li>Access to your Contacts, Leads, and Deals</li>
              <li>Real-time synchronization</li>
              <li>Full CRUD operations</li>
            </ul>
          </Box>

          <Button
            variant="contained"
            size="large"
            startIcon={<Link />}
            onClick={connectToZoho}
            sx={{ mt: 2 }}
          >
            Connect to Zoho CRM
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ZohoCRM;