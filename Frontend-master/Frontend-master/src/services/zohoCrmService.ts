// Zoho CRM Service for real API integration
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
  Lead_Source?: string;
  Created_Time?: string;
  Modified_Time?: string;
}

export interface ZohoLead {
  id?: string;
  First_Name: string;
  Last_Name: string;
  Email: string;
  Phone?: string;
  Company: string;
  Lead_Source?: string;
  Lead_Status?: string;
  Created_Time?: string;
  Modified_Time?: string;
}

export interface ZohoDeal {
  id?: string;
  Deal_Name: string;
  Account_Name: string;
  Stage: string;
  Amount: number;
  Closing_Date: string;
  Created_Time?: string;
  Modified_Time?: string;
}

class ZohoCrmService {
  private baseUrl = 'https://www.zohoapis.in/crm/v2';
  private authUrl = 'https://accounts.zoho.in/oauth/v2';
  
  private config: ZohoAuthConfig = {
    clientId: import.meta.env.VITE_ZOHO_CLIENT_ID || '',
    clientSecret: import.meta.env.VITE_ZOHO_CLIENT_SECRET || '',
    redirectUri: `${window.location.origin}/zoho-crm`,
    scope: 'ZohoCRM.modules.ALL,ZohoCRM.settings.ALL'
  };

  // OAuth Flow Methods
  getAuthorizationUrl(): string {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.config.clientId,
      scope: this.config.scope,
      redirect_uri: this.config.redirectUri,
      access_type: 'offline'
    });
    
    return `${this.authUrl}/auth?${params.toString()}`;
  }

  async exchangeCodeForToken(code: string): Promise<any> {
    console.log('Exchanging code for token via backend...');

    const response = await fetch(`${import.meta.env.VITE_API_URL}/mis_app/zoho/exchange-token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ code })
    });

    console.log('Backend token exchange response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Backend token exchange error:', errorData);
      throw new Error(`Token exchange failed: ${response.status} ${response.statusText} - ${errorData.error || 'Unknown error'}`);
    }

    const result = await response.json();
    console.log('Backend token exchange success:', result);
    return result;
  }

  async refreshAccessToken(refreshToken: string): Promise<any> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/mis_app/zoho/refresh-token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ refresh_token: refreshToken })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Token refresh failed: ${response.status} ${response.statusText} - ${errorData.error || 'Unknown error'}`);
    }

    return response.json();
  }

  setAccessToken(token: string): void {
    localStorage.setItem('zoho_access_token', token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('zoho_access_token');
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  logout(): void {
    localStorage.removeItem('zoho_access_token');
    localStorage.removeItem('zoho_refresh_token');
  }

  // API Methods with Authentication Headers
  private getAuthHeaders(): HeadersInit {
    const token = this.getAccessToken();
    return {
      'Authorization': `Zoho-oauthtoken ${token}`,
      'Content-Type': 'application/json'
    };
  }

  // Contacts API
  async getContacts(page: number = 1, perPage: number = 200): Promise<any> {
    const headers = this.getAuthHeaders();
    const response = await fetch(`${this.baseUrl}/Contacts?page=${page}&per_page=${perPage}`, { 
      headers 
    });

    if (!response.ok) {
      if (response.status === 401) {
        this.logout();
        throw new Error('Authentication expired');
      }
      throw new Error(`Failed to fetch contacts: ${response.statusText}`);
    }

    return response.json();
  }

  async getContact(contactId: string): Promise<any> {
    const headers = this.getAuthHeaders();
    const response = await fetch(`${this.baseUrl}/Contacts/${contactId}`, { headers });

    if (!response.ok) {
      throw new Error(`Failed to fetch contact: ${response.statusText}`);
    }

    return response.json();
  }

  async createContact(contact: ZohoContact): Promise<any> {
    const headers = this.getAuthHeaders();
    const body = { data: [contact] };
    
    const response = await fetch(`${this.baseUrl}/Contacts`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`Failed to create contact: ${response.statusText}`);
    }

    return response.json();
  }

  async updateContact(contactId: string, contact: Partial<ZohoContact>): Promise<any> {
    const headers = this.getAuthHeaders();
    const body = { data: [{ ...contact, id: contactId }] };
    
    const response = await fetch(`${this.baseUrl}/Contacts/${contactId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`Failed to update contact: ${response.statusText}`);
    }

    return response.json();
  }

  async deleteContact(contactId: string): Promise<any> {
    const headers = this.getAuthHeaders();
    const response = await fetch(`${this.baseUrl}/Contacts/${contactId}`, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) {
      throw new Error(`Failed to delete contact: ${response.statusText}`);
    }

    return response.json();
  }

  // Leads API
  async getLeads(page: number = 1, perPage: number = 200): Promise<any> {
    const headers = this.getAuthHeaders();
    const response = await fetch(`${this.baseUrl}/Leads?page=${page}&per_page=${perPage}`, { 
      headers 
    });

    if (!response.ok) {
      if (response.status === 401) {
        this.logout();
        throw new Error('Authentication expired');
      }
      throw new Error(`Failed to fetch leads: ${response.statusText}`);
    }

    return response.json();
  }

  async createLead(lead: ZohoLead): Promise<any> {
    const headers = this.getAuthHeaders();
    const body = { data: [lead] };
    
    const response = await fetch(`${this.baseUrl}/Leads`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`Failed to create lead: ${response.statusText}`);
    }

    return response.json();
  }

  async updateLead(leadId: string, lead: Partial<ZohoLead>): Promise<any> {
    const headers = this.getAuthHeaders();
    const body = { data: [{ ...lead, id: leadId }] };
    
    const response = await fetch(`${this.baseUrl}/Leads/${leadId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`Failed to update lead: ${response.statusText}`);
    }

    return response.json();
  }

  // Deals API
  async getDeals(page: number = 1, perPage: number = 200): Promise<any> {
    const headers = this.getAuthHeaders();
    const response = await fetch(`${this.baseUrl}/Deals?page=${page}&per_page=${perPage}`, { 
      headers 
    });

    if (!response.ok) {
      if (response.status === 401) {
        this.logout();
        throw new Error('Authentication expired');
      }
      throw new Error(`Failed to fetch deals: ${response.statusText}`);
    }

    return response.json();
  }

  async createDeal(deal: ZohoDeal): Promise<any> {
    const headers = this.getAuthHeaders();
    const body = { data: [deal] };
    
    const response = await fetch(`${this.baseUrl}/Deals`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`Failed to create deal: ${response.statusText}`);
    }

    return response.json();
  }

  async updateDeal(dealId: string, deal: Partial<ZohoDeal>): Promise<any> {
    const headers = this.getAuthHeaders();
    const body = { data: [{ ...deal, id: dealId }] };
    
    const response = await fetch(`${this.baseUrl}/Deals/${dealId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`Failed to update deal: ${response.statusText}`);
    }

    return response.json();
  }

  // Search API
  async searchRecords(module: string, criteria: string): Promise<any> {
    const headers = this.getAuthHeaders();
    const response = await fetch(`${this.baseUrl}/${module}/search?criteria=${encodeURIComponent(criteria)}`, { 
      headers 
    });

    if (!response.ok) {
      throw new Error(`Search failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Dashboard/Analytics
  async getDashboardData(): Promise<any> {
    const headers = this.getAuthHeaders();
    const response = await fetch(`${this.baseUrl}/org`, { headers });

    if (!response.ok) {
      throw new Error(`Failed to fetch dashboard data: ${response.statusText}`);
    }

    return response.json();
  }
}

export const zohoCrmService = new ZohoCrmService();
export default zohoCrmService;