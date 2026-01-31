// Update your zohoCrmService.ts with these changes:

// Replace the exchangeCodeForToken method:
async exchangeCodeForToken(code: string): Promise<any> {
  try {
    const response = await fetch('/api/zoho/token-exchange/', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'X-CSRFToken': this.getCSRFToken() // If using CSRF protection
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
    console.error('Error exchanging code for token:', error);
    throw error;
  }
}

// Replace the getContacts method:
async getContacts(_page: number = 1, _perPage: number = 200): Promise<any> {
  const token = this.getAccessToken();
  if (!token) {
    throw new Error('No access token available');
  }
  
  const response = await fetch('/api/zoho/contacts/', {
    headers: { 
      'Authorization': `Bearer ${token}`,
      'X-CSRFToken': this.getCSRFToken()
    }
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch contacts: ${response.statusText}`);
  }
  
  return response.json();
}

// Replace the getLeads method:
async getLeads(_page: number = 1, _perPage: number = 200): Promise<any> {
  const token = this.getAccessToken();
  if (!token) {
    throw new Error('No access token available');
  }
  
  const response = await fetch('/api/zoho/leads/', {
    headers: { 
      'Authorization': `Bearer ${token}`,
      'X-CSRFToken': this.getCSRFToken()
    }
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch leads: ${response.statusText}`);
  }
  
  return response.json();
}

// Replace the getDeals method:
async getDeals(_page: number = 1, _perPage: number = 200): Promise<any> {
  const token = this.getAccessToken();
  if (!token) {
    throw new Error('No access token available');
  }
  
  const response = await fetch('/api/zoho/deals/', {
    headers: { 
      'Authorization': `Bearer ${token}`,
      'X-CSRFToken': this.getCSRFToken()
    }
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch deals: ${response.statusText}`);
  }
  
  return response.json();
}

// Helper method for CSRF token (if needed):
private getCSRFToken(): string {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'csrftoken') {
      return value;
    }
  }
  return '';
}