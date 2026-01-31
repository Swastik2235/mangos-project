// Enhanced Zoho CRM Service with full API support
export interface ZohoAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scope: string;
}

export interface ZohoContact {
  id?: string;
  First_Name: string;
  Last_Name: string;
  Email: string;
  Phone?: string;
  Account_Name?: string;
}

export interface ZohoLead {
  id?: string;
  First_Name: string;
  Last_Name: string;
  Email: string;
  Lead_Status: string;
  Lead_Source: string;
  Annual_Revenue?: string;
}

export interface ZohoDeal {
  id?: string;
  Deal_Name: string;
  Amount: number;
  Stage: string;
  Probability?: number;
  Closing_Date: string;
}

class ZohoCrmService {
  private authUrl = 'https://accounts.zoho.in/oauth/v2';
  private apiUrl = 'https://www.zohoapis.in/crm/v2';
  
  private config: ZohoAuthConfig = {
    clientId: import.meta.env.VITE_ZOHO_CLIENT_ID || '',
    clientSecret: import.meta.env.VITE_ZOHO_CLIENT_SECRET || '',
    redirectUri: `${window.location.origin}/zoho-crm`,
    scope: 'ZohoCRM.modules.ALL,ZohoCRM.settings.ALL'
  };

  // OAuth URL generation
  getAuthorizationUrl(): string {
    try {
      const params = new URLSearchParams({
        response_type: 'code',
        client_id: this.config.clientId,
        scope: this.config.scope,
        redirect_uri: this.config.redirectUri,
        access_type: 'offline'
      });
      
      return `${this.authUrl}/auth?${params.toString()}`;
    } catch (error) {
      console.error('Error generating auth URL:', error);
      throw new Error('Failed to generate authorization URL');
    }
  }

  // Exchange authorization code for access token via backend
  async exchangeCodeForToken(code: string): Promise<any> {
    try {
      const response = await fetch('/api/zoho/token-exchange/', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
      });
      
      if (!response.ok) {
        throw new Error(`Token exchange failed: ${response.statusText}`);
      }
      
      const tokenData = await response.json();
      this.setAccessToken(tokenData.access_token);
      if (tokenData.refresh_token) {
        this.setRefreshToken(tokenData.refresh_token);
      }
      
      return tokenData;
      
    } catch (error) {
      console.error('Error in token exchange:', error);
      throw error;
    }
  }

  // Token management
  setAccessToken(token: string): void {
    try {
      localStorage.setItem('zoho_access_token', token);
    } catch (error) {
      console.error('Error storing access token:', error);
    }
  }

  getAccessToken(): string | null {
    try {
      return localStorage.getItem('zoho_access_token');
    } catch (error) {
      console.error('Error retrieving access token:', error);
      return null;
    }
  }

  setRefreshToken(token: string): void {
    try {
      localStorage.setItem('zoho_refresh_token', token);
    } catch (error) {
      console.error('Error storing refresh token:', error);
    }
  }

  getRefreshToken(): string | null {
    try {
      return localStorage.getItem('zoho_refresh_token');
    } catch (error) {
      console.error('Error retrieving refresh token:', error);
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  logout(): void {
    try {
      localStorage.removeItem('zoho_access_token');
      localStorage.removeItem('zoho_refresh_token');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  // API request helper
  private async makeApiRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    const token = this.getAccessToken();
    if (!token) {
      throw new Error('No access token available');
    }

    console.log('Making API request to:', `${this.apiUrl}${endpoint}`);
    console.log('Using token:', token.substring(0, 20) + '...');

    const response = await fetch(`${this.apiUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Zoho-oauthtoken ${token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    console.log('API Response status:', response.status);
    console.log('API Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      
      if (response.status === 401) {
        console.log('Token expired, attempting refresh...');
        // Token might be expired, try to refresh
        await this.refreshAccessToken();
        // Retry the request
        return this.makeApiRequest(endpoint, options);
      }
      throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const responseData = await response.json();
    console.log('API Response data:', responseData);
    return responseData;
  }

  // Refresh access token
  private async refreshAccessToken(): Promise<void> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await fetch(`${this.authUrl}/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          refresh_token: refreshToken
        })
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const tokenData = await response.json();
      this.setAccessToken(tokenData.access_token);
    } catch (error) {
      console.error('Error refreshing token:', error);
      this.logout(); // Clear invalid tokens
      throw error;
    }
  }

  // Contacts API
  async getContacts(_page: number = 1, _perPage: number = 200): Promise<any> {
    const token = this.getAccessToken();
    if (!token) {
      throw new Error('No access token available');
    }
    
    const response = await fetch('/api/zoho/contacts/', {
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch contacts: ${response.statusText}`);
    }
    
    return response.json();
  }

  async createContact(contact: ZohoContact): Promise<any> {
    return this.makeApiRequest('/Contacts', {
      method: 'POST',
      body: JSON.stringify({ data: [contact] })
    });
  }

  async updateContact(id: string, contact: Partial<ZohoContact>): Promise<any> {
    return this.makeApiRequest(`/Contacts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ data: [contact] })
    });
  }

  async deleteContact(id: string): Promise<any> {
    return this.makeApiRequest(`/Contacts/${id}`, {
      method: 'DELETE'
    });
  }

  // Leads API
  async getLeads(_page: number = 1, _perPage: number = 200): Promise<any> {
    const token = this.getAccessToken();
    if (!token) {
      throw new Error('No access token available');
    }
    
    const response = await fetch('/api/zoho/leads/', {
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch leads: ${response.statusText}`);
    }
    
    return response.json();
  }

  async createLead(lead: ZohoLead): Promise<any> {
    return this.makeApiRequest('/Leads', {
      method: 'POST',
      body: JSON.stringify({ data: [lead] })
    });
  }

  async updateLead(id: string, lead: Partial<ZohoLead>): Promise<any> {
    return this.makeApiRequest(`/Leads/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ data: [lead] })
    });
  }

  async deleteLead(id: string): Promise<any> {
    return this.makeApiRequest(`/Leads/${id}`, {
      method: 'DELETE'
    });
  }

  // Deals API
  async getDeals(_page: number = 1, _perPage: number = 200): Promise<any> {
    const token = this.getAccessToken();
    if (!token) {
      throw new Error('No access token available');
    }
    
    const response = await fetch('/api/zoho/deals/', {
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch deals: ${response.statusText}`);
    }
    
    return response.json();
  }

  async createDeal(deal: ZohoDeal): Promise<any> {
    return this.makeApiRequest('/Deals', {
      method: 'POST',
      body: JSON.stringify({ data: [deal] })
    });
  }

  async updateDeal(id: string, deal: Partial<ZohoDeal>): Promise<any> {
    return this.makeApiRequest(`/Deals/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ data: [deal] })
    });
  }

  async deleteDeal(id: string): Promise<any> {
    return this.makeApiRequest(`/Deals/${id}`, {
      method: 'DELETE'
    });
  }

  // Utility methods
  async searchRecords(module: string, criteria: string): Promise<any> {
    return this.makeApiRequest(`/${module}/search?criteria=${encodeURIComponent(criteria)}`);
  }

  async getModuleFields(module: string): Promise<any> {
    return this.makeApiRequest(`/settings/fields?module=${module}`);
  }
}

export const zohoCrmService = new ZohoCrmService();
export default zohoCrmService;