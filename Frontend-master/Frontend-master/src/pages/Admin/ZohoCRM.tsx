import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import { Business } from '@mui/icons-material';

const ZohoCRM: React.FC = () => {
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

      {/* Main Content */}
      <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
        <CardContent sx={{ textAlign: 'center', p: 4 }}>
          <Business sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Zoho CRM Integration
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Connect your Zoho CRM account to manage customers, leads, and deals directly within MangOS.
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
            sx={{ mt: 2 }}
            onClick={() => {
              alert('Zoho CRM integration coming soon!');
            }}
          >
            Connect to Zoho CRM
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ZohoCRM;