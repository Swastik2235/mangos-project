// Zoho CRM Integration Component - Clean build version
import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Business,
  PersonAdd,
  Handshake,
  AttachMoney,
  Search,
  Edit,
  Delete,
  Refresh,
  Link,
  LinkOff,
} from '@mui/icons-material';
import zohoCrmService, { ZohoContact, ZohoLead, ZohoDeal } from '../../services/zohoCrmService';

interface Stats {
  totalContacts: number;
  totalLeads: number;
  totalDeals: number;
  totalRevenue: number;
}

const ZohoCRM: React.FC = () => {
  // State management
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [error, setError] = useState<string>('');
  
  // Data states
  const [contacts, setContacts] = useState<ZohoContact[]>([]);
  const [leads, setLeads] = useState<ZohoLead[]>([]);
  const [deals, setDeals] = useState<ZohoDeal[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalContacts: 0,
    totalLeads: 0,
    totalDeals: 0,
    totalRevenue: 0
  });
  
  // Search states
  const [contactSearch, setContactSearch] = useState('');
  const [leadSearch, setLeadSearch] = useState('');
  const [dealSearch, setDealSearch] = useState('');

  useEffect(() => {
    checkAuthentication();
    handleOAuthCallback();
  }, []);

  const checkAuthentication = () => {
    const isAuth = zohoCrmService.isAuthenticated();
    setIsAuthenticated(isAuth);
    if (isAuth) {
      loadAllData();
    }
  };

  const handleOAuthCallback = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');
    
    console.log('OAuth callback - code:', code, 'error:', error);
    
    if (error) {
      setError(`OAuth error: ${error}`);
      return;
    }
    
    if (code) {
      exchangeCodeForToken(code);
    }
  };

  const connectToZoho = () => {
    const authUrl = zohoCrmService.getAuthorizationUrl();
    window.location.href = authUrl;
  };

  const exchangeCodeForToken = async (code: string) => {
    setIsLoading(true);
    setError(''); // Clear any previous errors
    
    try {
      console.log('Exchanging code for token...');
      const response = await zohoCrmService.exchangeCodeForToken(code);
      console.log('Token exchange response:', response);
      
      if (response.access_token) {
        zohoCrmService.setAccessToken(response.access_token);
        if (response.refresh_token) {
          localStorage.setItem('zoho_refresh_token', response.refresh_token);
        }
        setIsAuthenticated(true);
        await loadAllData();
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
      } else {
        throw new Error('No access token received');
      }
    } catch (error) {
      console.error('OAuth error:', error);
      setError(`Failed to connect to Zoho CRM: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = () => {
    zohoCrmService.logout();
    setIsAuthenticated(false);
    setContacts([]);
    setLeads([]);
    setDeals([]);
    setStats({
      totalContacts: 0,
      totalLeads: 0,
      totalDeals: 0,
      totalRevenue: 0
    });
  };

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        loadContacts(),
        loadLeads(),
        loadDeals()
      ]);
    } catch (error) {
      console.error('Error loading data:', error);
      setError('Failed to load CRM data. Please try refreshing.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadContacts = async () => {
    try {
      const response = await zohoCrmService.getContacts();
      if (response.data) {
        setContacts(response.data);
        setStats(prev => ({ ...prev, totalContacts: response.data.length }));
      }
    } catch (error) {
      console.error('Error loading contacts:', error);
      if (error instanceof Error && error.message === 'Authentication expired') {
        setIsAuthenticated(false);
      }
    }
  };

  const loadLeads = async () => {
    try {
      const response = await zohoCrmService.getLeads();
      if (response.data) {
        setLeads(response.data);
        setStats(prev => ({ ...prev, totalLeads: response.data.length }));
      }
    } catch (error) {
      console.error('Error loading leads:', error);
      if (error instanceof Error && error.message === 'Authentication expired') {
        setIsAuthenticated(false);
      }
    }
  };

  const loadDeals = async () => {
    try {
      const response = await zohoCrmService.getDeals();
      if (response.data) {
        setDeals(response.data);
        const totalRevenue = response.data.reduce((sum: number, deal: any) => sum + (deal.Amount || 0), 0);
        setStats(prev => ({ 
          ...prev, 
          totalDeals: response.data.length,
          totalRevenue 
        }));
      }
    } catch (error) {
      console.error('Error loading deals:', error);
      if (error instanceof Error && error.message === 'Authentication expired') {
        setIsAuthenticated(false);
      }
    }
  };

  const refreshData = async () => {
    await loadAllData();
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'qualified': return 'success';
      case 'working': return 'warning';
      case 'new': return 'info';
      default: return 'default';
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage?.toLowerCase()) {
      case 'closed won': return 'success';
      case 'proposal': return 'info';
      case 'negotiation': return 'warning';
      default: return 'default';
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.First_Name.toLowerCase().includes(contactSearch.toLowerCase()) ||
    contact.Last_Name.toLowerCase().includes(contactSearch.toLowerCase()) ||
    contact.Email.toLowerCase().includes(contactSearch.toLowerCase())
  );

  const filteredLeads = leads.filter(lead =>
    lead.First_Name.toLowerCase().includes(leadSearch.toLowerCase()) ||
    lead.Last_Name.toLowerCase().includes(leadSearch.toLowerCase()) ||
    lead.Company.toLowerCase().includes(leadSearch.toLowerCase())
  );

  const filteredDeals = deals.filter(deal =>
    deal.Deal_Name.toLowerCase().includes(dealSearch.toLowerCase()) ||
    deal.Account_Name.toLowerCase().includes(dealSearch.toLowerCase())
  );

  if (!isAuthenticated) {
    // Check if we're in the middle of OAuth callback processing
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code && isLoading) {
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
              startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <Link />}
              onClick={connectToZoho}
              disabled={isLoading}
              sx={{ mt: 2 }}
            >
              {isLoading ? 'Connecting...' : 'Connect to Zoho CRM'}
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

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
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={refreshData}
            disabled={isLoading}
          >
            Refresh
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

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <PersonAdd color="primary" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="h4">{stats.totalContacts}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Contacts
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <PersonAdd color="warning" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="h4">{stats.totalLeads}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Leads
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Handshake color="success" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="h4">{stats.totalDeals}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Open Deals
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AttachMoney color="error" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="h4">${stats.totalRevenue.toLocaleString()}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Revenue
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Card>
        <Tabs value={selectedTab} onChange={(_, newValue) => setSelectedTab(newValue)}>
          <Tab label={`Contacts (${stats.totalContacts})`} />
          <Tab label={`Leads (${stats.totalLeads})`} />
          <Tab label={`Deals (${stats.totalDeals})`} />
        </Tabs>

        {/* Contacts Tab */}
        {selectedTab === 0 && (
          <CardContent>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <TextField
                placeholder="Search contacts..."
                value={contactSearch}
                onChange={(e) => setContactSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                sx={{ width: 300 }}
              />
              <Button variant="contained" startIcon={<PersonAdd />}>
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
                    <TableCell>Created</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredContacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell>{`${contact.First_Name} ${contact.Last_Name}`}</TableCell>
                      <TableCell>{contact.Email}</TableCell>
                      <TableCell>{contact.Phone || 'N/A'}</TableCell>
                      <TableCell>{contact.Account_Name || 'N/A'}</TableCell>
                      <TableCell>
                        {contact.Created_Time ? new Date(contact.Created_Time).toLocaleDateString() : 'N/A'}
                      </TableCell>
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
          </CardContent>
        )}

        {/* Leads Tab */}
        {selectedTab === 1 && (
          <CardContent>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <TextField
                placeholder="Search leads..."
                value={leadSearch}
                onChange={(e) => setLeadSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                sx={{ width: 300 }}
              />
              <Button variant="contained" startIcon={<PersonAdd />}>
                Add Lead
              </Button>
            </Box>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Company</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell>{`${lead.First_Name} ${lead.Last_Name}`}</TableCell>
                      <TableCell>{lead.Email}</TableCell>
                      <TableCell>{lead.Company}</TableCell>
                      <TableCell>
                        <Chip 
                          label={lead.Lead_Status || 'New'} 
                          color={getStatusColor(lead.Lead_Status || 'new')}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {lead.Created_Time ? new Date(lead.Created_Time).toLocaleDateString() : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <IconButton size="small" color="primary">
                          <Edit />
                        </IconButton>
                        <IconButton size="small" color="success">
                          <Handshake />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        )}

        {/* Deals Tab */}
        {selectedTab === 2 && (
          <CardContent>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <TextField
                placeholder="Search deals..."
                value={dealSearch}
                onChange={(e) => setDealSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                sx={{ width: 300 }}
              />
              <Button variant="contained" startIcon={<Handshake />}>
                Add Deal
              </Button>
            </Box>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Deal Name</TableCell>
                    <TableCell>Account</TableCell>
                    <TableCell>Stage</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Closing Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredDeals.map((deal) => (
                    <TableRow key={deal.id}>
                      <TableCell>{deal.Deal_Name}</TableCell>
                      <TableCell>{deal.Account_Name}</TableCell>
                      <TableCell>
                        <Chip 
                          label={deal.Stage} 
                          color={getStageColor(deal.Stage)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: 'success.main' }}>
                        ${deal.Amount.toLocaleString()}
                      </TableCell>
                      <TableCell>{new Date(deal.Closing_Date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <IconButton size="small" color="primary">
                          <Edit />
                        </IconButton>
                        <IconButton size="small" color="info">
                          <Business />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        )}
      </Card>
    </Box>
  );
};

export default ZohoCRM;