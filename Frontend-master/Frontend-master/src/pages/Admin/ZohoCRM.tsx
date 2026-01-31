import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { 
  Business, 
  Link, 
  LinkOff, 
  People, 
  TrendingUp, 
  AttachMoney, 
  Add, 
  Edit, 
  Delete, 
  Sync,
  Dashboard as DashboardIcon,
  ContactPhone,
  Handshake
} from '@mui/icons-material';
import zohoCrmService from '../../services/zohoCrmService';

const ZohoCRM: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [activeTab, setActiveTab] = useState(0);
  const [contacts, setContacts] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [deals, setDeals] = useState<any[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'contact' | 'lead' | 'deal'>('contact');
  const [formData, setFormData] = useState<any>({});

  // Sample data for demonstration
  const sampleContacts = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1234567890', company: 'Tech Corp' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1234567891', company: 'Design Studio' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '+1234567892', company: 'Marketing Inc' },
  ];

  const sampleLeads = [
    { id: 1, name: 'Sarah Wilson', email: 'sarah@prospect.com', status: 'Qualified', source: 'Website', value: '$5,000' },
    { id: 2, name: 'Tom Brown', email: 'tom@potential.com', status: 'New', source: 'Referral', value: '$3,000' },
    { id: 3, name: 'Lisa Davis', email: 'lisa@company.com', status: 'Contacted', source: 'Social Media', value: '$7,500' },
  ];

  const sampleDeals = [
    { id: 1, name: 'Enterprise Software License', amount: '$25,000', stage: 'Negotiation', probability: '75%', closeDate: '2025-02-15' },
    { id: 2, name: 'Marketing Campaign', amount: '$15,000', stage: 'Proposal', probability: '50%', closeDate: '2025-02-28' },
    { id: 3, name: 'Consulting Services', amount: '$10,000', stage: 'Closed Won', probability: '100%', closeDate: '2025-01-30' },
  ];

  useEffect(() => {
    checkAuthentication();
    handleOAuthCallback();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadCRMData();
    }
  }, [isAuthenticated]);

  const loadCRMData = () => {
    setIsDataLoading(true);
    // Simulate API calls - replace with actual Zoho API calls
    setTimeout(() => {
      setContacts(sampleContacts);
      setLeads(sampleLeads);
      setDeals(sampleDeals);
      setIsDataLoading(false);
    }, 1000);
  };

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
      setContacts([]);
      setLeads([]);
      setDeals([]);
    } catch (error) {
      console.error('Error disconnecting:', error);
      setError('Error disconnecting from Zoho');
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleAddNew = (type: 'contact' | 'lead' | 'deal') => {
    setDialogType(type);
    setFormData({});
    setOpenDialog(true);
  };

  const handleSave = () => {
    // Simulate saving data - replace with actual Zoho API calls
    console.log('Saving:', dialogType, formData);
    setOpenDialog(false);
    setFormData({});
    // Refresh data
    loadCRMData();
  };

  const handleSync = () => {
    setIsDataLoading(true);
    // Simulate sync - replace with actual Zoho API sync
    setTimeout(() => {
      loadCRMData();
    }, 2000);
  };

  const renderDashboard = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <People color="primary" sx={{ mr: 2 }} />
              <Typography variant="h6">Contacts</Typography>
            </Box>
            <Typography variant="h3" color="primary">{contacts.length}</Typography>
            <Typography variant="body2" color="text.secondary">Total Contacts</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TrendingUp color="warning" sx={{ mr: 2 }} />
              <Typography variant="h6">Leads</Typography>
            </Box>
            <Typography variant="h3" color="warning.main">{leads.length}</Typography>
            <Typography variant="body2" color="text.secondary">Active Leads</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AttachMoney color="success" sx={{ mr: 2 }} />
              <Typography variant="h6">Deals</Typography>
            </Box>
            <Typography variant="h3" color="success.main">{deals.length}</Typography>
            <Typography variant="body2" color="text.secondary">Open Deals</Typography>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Recent Activity</Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>• New lead "Sarah Wilson" added from Website</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>• Deal "Enterprise Software License" moved to Negotiation</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>• Contact "John Doe" updated with new phone number</Typography>
              <Typography variant="body2">• Deal "Consulting Services" marked as Closed Won</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderContacts = () => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6">Contacts</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleAddNew('contact')}
        >
          Add Contact
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>{contact.name}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>{contact.company}</TableCell>
                <TableCell>
                  <IconButton size="small" color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  const renderLeads = () => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6">Leads</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleAddNew('lead')}
        >
          Add Lead
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>{lead.name}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>
                  <Chip 
                    label={lead.status} 
                    color={lead.status === 'Qualified' ? 'success' : lead.status === 'New' ? 'primary' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>{lead.source}</TableCell>
                <TableCell>{lead.value}</TableCell>
                <TableCell>
                  <IconButton size="small" color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  const renderDeals = () => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6">Deals</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleAddNew('deal')}
        >
          Add Deal
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Deal Name</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Stage</TableCell>
              <TableCell>Probability</TableCell>
              <TableCell>Close Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deals.map((deal) => (
              <TableRow key={deal.id}>
                <TableCell>{deal.name}</TableCell>
                <TableCell>{deal.amount}</TableCell>
                <TableCell>
                  <Chip 
                    label={deal.stage} 
                    color={deal.stage === 'Closed Won' ? 'success' : deal.stage === 'Negotiation' ? 'warning' : 'primary'}
                    size="small"
                  />
                </TableCell>
                <TableCell>{deal.probability}</TableCell>
                <TableCell>{deal.closeDate}</TableCell>
                <TableCell>
                  <IconButton size="small" color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  const renderAddDialog = () => (
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
      <DialogTitle>Add New {dialogType.charAt(0).toUpperCase() + dialogType.slice(1)}</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          {dialogType === 'contact' && (
            <>
              <TextField
                fullWidth
                label="Name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Company"
                value={formData.company || ''}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </>
          )}
          {dialogType === 'lead' && (
            <>
              <TextField
                fullWidth
                label="Name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status || ''}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <MenuItem value="New">New</MenuItem>
                  <MenuItem value="Contacted">Contacted</MenuItem>
                  <MenuItem value="Qualified">Qualified</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Source"
                value={formData.source || ''}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Value"
                value={formData.value || ''}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              />
            </>
          )}
          {dialogType === 'deal' && (
            <>
              <TextField
                fullWidth
                label="Deal Name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Amount"
                value={formData.amount || ''}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Stage</InputLabel>
                <Select
                  value={formData.stage || ''}
                  onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                >
                  <MenuItem value="Qualification">Qualification</MenuItem>
                  <MenuItem value="Proposal">Proposal</MenuItem>
                  <MenuItem value="Negotiation">Negotiation</MenuItem>
                  <MenuItem value="Closed Won">Closed Won</MenuItem>
                  <MenuItem value="Closed Lost">Closed Lost</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Close Date"
                type="date"
                value={formData.closeDate || ''}
                onChange={(e) => setFormData({ ...formData, closeDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );

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
              Manage your customer relationships seamlessly
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<Sync />}
              onClick={handleSync}
              disabled={isDataLoading}
            >
              {isDataLoading ? 'Syncing...' : 'Sync Data'}
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<LinkOff />}
              onClick={disconnect}
            >
              Disconnect
            </Button>
          </Box>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {/* Navigation Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab icon={<DashboardIcon />} label="Dashboard" />
            <Tab icon={<ContactPhone />} label="Contacts" />
            <Tab icon={<TrendingUp />} label="Leads" />
            <Tab icon={<Handshake />} label="Deals" />
          </Tabs>
        </Box>

        {/* Content Area */}
        {isDataLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {activeTab === 0 && renderDashboard()}
            {activeTab === 1 && renderContacts()}
            {activeTab === 2 && renderLeads()}
            {activeTab === 3 && renderDeals()}
          </>
        )}

        {/* Add Dialog */}
        {renderAddDialog()}
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