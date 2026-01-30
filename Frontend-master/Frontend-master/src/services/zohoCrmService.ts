// Simple Zoho CRM Service - Step by step implementation
export interface ZohoAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scope: string;
}

class ZohoCrmService {
  private authUrl = 'https://accounts.zoho.in/oauth/v2';
  
  private config: ZohoAuthConfig = {
    clientId: import.meta.env.VITE_ZOHO_CLIENT_ID || '',
    clientSecret: import.meta.env.VITE_ZOHO_CLIENT_SECRET || '',
    redirectUri: `${window.location.origin}/zoho-oauth-callback`,
    scope: 'ZohoCRM.modules.ALL,ZohoCRM.settings.ALL'
  };

  // Simple OAuth URL generation
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

  // Simple token management
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
}

export const zohoCrmService = new ZohoCrmService();
export default zohoCrmService;