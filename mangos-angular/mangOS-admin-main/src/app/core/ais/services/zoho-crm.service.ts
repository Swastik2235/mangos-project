import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';

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

@Injectable({
  providedIn: 'root'
})
export class ZohoCrmService {
  private baseUrl = 'https://www.zohoapis.com/crm/v2';
  private authUrl = 'https://accounts.zoho.com/oauth/v2';
  
  private accessTokenSubject = new BehaviorSubject<string | null>(null);
  public accessToken$ = this.accessTokenSubject.asObservable();

  // Zoho OAuth Configuration
  private config: ZohoAuthConfig = {
    clientId: environment.zoho?.clientId || '',
    clientSecret: environment.zoho?.clientSecret || '',
    redirectUri: `${window.location.origin}/ais/zoho-crm/callback`,
    scope: 'ZohoCRM.modules.ALL,ZohoCRM.settings.ALL'
  };

  constructor(private http: HttpClient) {
    this.loadStoredToken();
  }

  private loadStoredToken(): void {
    const token = localStorage.getItem('zoho_access_token');
    if (token) {
      this.accessTokenSubject.next(token);
    }
  }

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

  exchangeCodeForToken(code: string): Observable<any> {
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      redirect_uri: this.config.redirectUri,
      code: code
    });

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(`${this.authUrl}/token`, body.toString(), { headers });
  }

  refreshAccessToken(refreshToken: string): Observable<any> {
    const body = new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      refresh_token: refreshToken
    });

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(`${this.authUrl}/token`, body.toString(), { headers });
  }

  setAccessToken(token: string): void {
    localStorage.setItem('zoho_access_token', token);
    this.accessTokenSubject.next(token);
  }

  getAccessToken(): string | null {
    return this.accessTokenSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  logout(): void {
    localStorage.removeItem('zoho_access_token');
    localStorage.removeItem('zoho_refresh_token');
    this.accessTokenSubject.next(null);
  }

  // API Methods with Authentication Headers
  private getAuthHeaders(): HttpHeaders {
    const token = this.getAccessToken();
    return new HttpHeaders({
      'Authorization': `Zoho-oauthtoken ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Contacts API
  getContacts(page: number = 1, perPage: number = 200): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseUrl}/Contacts?page=${page}&per_page=${perPage}`, { headers });
  }

  getContact(contactId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseUrl}/Contacts/${contactId}`, { headers });
  }

  createContact(contact: ZohoContact): Observable<any> {
    const headers = this.getAuthHeaders();
    const body = { data: [contact] };
    return this.http.post(`${this.baseUrl}/Contacts`, body, { headers });
  }

  updateContact(contactId: string, contact: Partial<ZohoContact>): Observable<any> {
    const headers = this.getAuthHeaders();
    const body = { data: [{ ...contact, id: contactId }] };
    return this.http.put(`${this.baseUrl}/Contacts/${contactId}`, body, { headers });
  }

  deleteContact(contactId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.baseUrl}/Contacts/${contactId}`, { headers });
  }

  // Leads API
  getLeads(page: number = 1, perPage: number = 200): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseUrl}/Leads?page=${page}&per_page=${perPage}`, { headers });
  }

  createLead(lead: ZohoLead): Observable<any> {
    const headers = this.getAuthHeaders();
    const body = { data: [lead] };
    return this.http.post(`${this.baseUrl}/Leads`, body, { headers });
  }

  updateLead(leadId: string, lead: Partial<ZohoLead>): Observable<any> {
    const headers = this.getAuthHeaders();
    const body = { data: [{ ...lead, id: leadId }] };
    return this.http.put(`${this.baseUrl}/Leads/${leadId}`, body, { headers });
  }

  // Deals API
  getDeals(page: number = 1, perPage: number = 200): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseUrl}/Deals?page=${page}&per_page=${perPage}`, { headers });
  }

  createDeal(deal: ZohoDeal): Observable<any> {
    const headers = this.getAuthHeaders();
    const body = { data: [deal] };
    return this.http.post(`${this.baseUrl}/Deals`, body, { headers });
  }

  updateDeal(dealId: string, deal: Partial<ZohoDeal>): Observable<any> {
    const headers = this.getAuthHeaders();
    const body = { data: [{ ...deal, id: dealId }] };
    return this.http.put(`${this.baseUrl}/Deals/${dealId}`, body, { headers });
  }

  // Search API
  searchRecords(module: string, criteria: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseUrl}/${module}/search?criteria=${encodeURIComponent(criteria)}`, { headers });
  }

  // Dashboard/Analytics
  getDashboardData(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseUrl}/org`, { headers });
  }
}