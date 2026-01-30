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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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

// Types for Zoho CRM data
interface ZohoContact {
  id?: string;
  First_Name: string;
  Last_Name: string;
  Email: string;
  Phone?: string;
  Account_Name?: string;
  Created_Time?: string;
}

interface ZohoLead {
  id?: string;
  First_Name: string;
  Last_Name: string;
  Email: string;
  Company: string;
  Lead_Status?: string;
  Created_Time?: string;
}

interface ZohoDeal {
  id?: string;
  Deal_Name: string;
  Account_Name: string;
  Stage: string;
  Amount: number;
  Closing_Date: string;
  Created_Time?: string;
}

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
  
  // Dialog state
  const [setupDialog, setSetupDialog] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    const token = localStorage.getItem('zoho_access_token');
    if (token) {
      setIsAuthenticated(true);
      loadAllData();
    }
  };

  const connectToZoho = () => {
    setSetupDialog(true);
  };

  const handleZohoSetup = () => {
    // For now, we'll simulate the connection
    // In a real implementation, this would redirect to Zoho OAuth
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Mock successful connection
      localStorage.setItem('zoho_access_token', 'mock-token-' + Date.now());
      setIsAuthenticated(true);
      setSetupDialog(false);
      setIsLoading(false);
      loadMockData();
    }, 2000);
  };

  const disconnect = () => {
    localStorage.removeItem('zoho_access_token');
    localStorage.removeItem('zoho_refresh_token');
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

  const loadAllData = () => {
    loadMockData(); // In real implementation, this would call Zoho APIs
  };

  const loadMockData = () => {
    // Mock data for demonstration
    const mockContacts: ZohoContact[] = [
      {
        id: '1',
        First_Name: 'John',
        Last_Name: 'Doe',
        Email: 'john.doe@example.com',
        Phone: '+1-555-0123',
        Account_Name: 'Acme Corp',
        Created_Time: new Date().toISOString()
      },
      {
        id: '2',
        First_Name: 'Jane',
        Last_Name: 'Smith',
        Email: 'jane.smith@example.com',
        Phone: '+1-555-0124',
        Account_Name: 'Tech Solutions',
        Created_Time: new Date().toISOString()
      }
    ];

    const mockLeads: ZohoLead[] = [
      {
        id: '1',
        First_Name: 'Mike',
        Last_Name: 'Johnson',
        Email: 'mike.johnson@prospect.com',
        Company: 'Future Industries',
        Lead_Status: 'Qualified',
        Created_Time: new Date().toISOString()
      },
      {
        id: '2',
        First_Name: 'Sarah',
        Last_Name: 'Wilson',
        Email: 'sarah.wilson@newco.com',
        Company: 'New Company',
        Lead_Status: 'Working',
        Created_Time: new Date().toISOString()
      }
    ];

    const mockDeals: ZohoDeal[] = [
      {
        id: '1',
        Deal_Name: 'Manufacturing Equipment Deal',
        Account_Name: 'Acme Corp',
        Stage: 'Proposal',
        Amount: 50000,
        Closing_Date: '2026-03-15',
        Created_Time: new Date().toISOString()
      },
      {
        id: '2',
        Deal_Name: 'Software Integration Project',
        Account_Name: 'Tech Solutions',
        Stage: 'Negotiation',
        Amount: 25000,
        Closing_Date: '2026-02-28',
        Created_Time: new Date().toISOString()
      }
    ];

    setContacts(mockContacts);
    setLeads(mockLeads);
    setDeals(mockDeals);
    setStats({
      totalContacts: mockContacts.length,
      totalLeads: mockLeads.length,
      totalDeals: mockDeals.length,
      totalRevenue: mockDeals.reduce((sum, deal) => sum + deal.Amount, 0)
    });
  };

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      loadAllData();
      setIsLoading(false);
    }, 1000);
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
              startIcon={<Link />}
              onClick={connectToZoho}
              sx={{ mt: 2 }}
            >
              Connect to Zoho CRM
            </Button>
          </CardContent>
        </Card>

        {/* Setup Dialog */}
        <Dialog open={setupDialog} onClose={() => setSetupDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Connect to Zoho CRM</DialogTitle>
          <DialogContent>
            <Alert severity="info" sx={{ mb: 2 }}>
              This is a demo implementation. In production, you would need to:
            </Alert>
            <Typography variant="body2" component="div">
              <ol>
                <li>Create a Zoho Developer account</li>
                <li>Set up OAuth 2.0 credentials</li>
                <li>Configure redirect URIs</li>
                <li>Implement proper authentication flow</li>
              </ol>
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              For now, click "Connect" to see the demo with sample data.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSetupDialog(false)}>Cancel</Button>
            <Button 
              variant="contained" 
              onClick={handleZohoSetup}
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} /> : <Link />}
            >
              {isLoading ? 'Connecting...' : 'Connect'}
            </Button>
          </DialogActions>
        </Dialog>
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