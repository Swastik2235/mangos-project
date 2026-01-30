import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ZohoCrmService, ZohoContact, ZohoLead, ZohoDeal } from '../services/zoho-crm.service';

@Component({
  selector: 'app-zoho-crm',
  templateUrl: './zoho-crm.component.html',
  styleUrls: ['./zoho-crm.component.scss']
})
export class ZohoCrmComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Authentication state
  isAuthenticated = false;
  isLoading = false;

  // Tab management
  selectedTabIndex = 0;

  // Data sources for different modules
  contactsDataSource = new MatTableDataSource<ZohoContact>([]);
  leadsDataSource = new MatTableDataSource<ZohoLead>([]);
  dealsDataSource = new MatTableDataSource<ZohoDeal>([]);

  // Table columns
  contactColumns = ['First_Name', 'Last_Name', 'Email', 'Phone', 'Account_Name', 'Created_Time', 'actions'];
  leadColumns = ['First_Name', 'Last_Name', 'Email', 'Company', 'Lead_Status', 'Created_Time', 'actions'];
  dealColumns = ['Deal_Name', 'Account_Name', 'Stage', 'Amount', 'Closing_Date', 'actions'];

  // Statistics
  stats = {
    totalContacts: 0,
    totalLeads: 0,
    totalDeals: 0,
    totalRevenue: 0
  };

  constructor(
    private zohoCrmService: ZohoCrmService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.checkAuthentication();
    this.handleOAuthCallback();
  }

  private checkAuthentication(): void {
    this.isAuthenticated = this.zohoCrmService.isAuthenticated();
    if (this.isAuthenticated) {
      this.loadAllData();
    }
  }

  private handleOAuthCallback(): void {
    this.route.queryParams.subscribe(params => {
      if (params['code']) {
        this.exchangeCodeForToken(params['code']);
      }
    });
  }

  // Authentication Methods
  connectToZoho(): void {
    const authUrl = this.zohoCrmService.getAuthorizationUrl();
    window.location.href = authUrl;
  }

  private exchangeCodeForToken(code: string): void {
    this.isLoading = true;
    this.zohoCrmService.exchangeCodeForToken(code).subscribe({
      next: (response) => {
        if (response.access_token) {
          this.zohoCrmService.setAccessToken(response.access_token);
          if (response.refresh_token) {
            localStorage.setItem('zoho_refresh_token', response.refresh_token);
          }
          this.isAuthenticated = true;
          this.loadAllData();
          this.snackBar.open('Successfully connected to Zoho CRM!', 'Close', { duration: 3000 });
          // Clean up URL
          this.router.navigate(['/ais/zoho-crm'], { replaceUrl: true });
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('OAuth error:', error);
        this.snackBar.open('Failed to connect to Zoho CRM. Please try again.', 'Close', { duration: 5000 });
        this.isLoading = false;
      }
    });
  }

  disconnect(): void {
    this.zohoCrmService.logout();
    this.isAuthenticated = false;
    this.contactsDataSource.data = [];
    this.leadsDataSource.data = [];
    this.dealsDataSource.data = [];
    this.resetStats();
    this.snackBar.open('Disconnected from Zoho CRM', 'Close', { duration: 3000 });
  }

  // Data Loading Methods
  private loadAllData(): void {
    this.loadContacts();
    this.loadLeads();
    this.loadDeals();
  }

  loadContacts(): void {
    this.isLoading = true;
    this.zohoCrmService.getContacts().subscribe({
      next: (response) => {
        if (response.data) {
          this.contactsDataSource.data = response.data;
          this.stats.totalContacts = response.data.length;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading contacts:', error);
        this.handleApiError(error);
        this.isLoading = false;
      }
    });
  }

  loadLeads(): void {
    this.zohoCrmService.getLeads().subscribe({
      next: (response) => {
        if (response.data) {
          this.leadsDataSource.data = response.data;
          this.stats.totalLeads = response.data.length;
        }
      },
      error: (error) => {
        console.error('Error loading leads:', error);
        this.handleApiError(error);
      }
    });
  }

  loadDeals(): void {
    this.zohoCrmService.getDeals().subscribe({
      next: (response) => {
        if (response.data) {
          this.dealsDataSource.data = response.data;
          this.stats.totalDeals = response.data.length;
          this.stats.totalRevenue = response.data.reduce((sum: number, deal: any) => sum + (deal.Amount || 0), 0);
        }
      },
      error: (error) => {
        console.error('Error loading deals:', error);
        this.handleApiError(error);
      }
    });
  }

  // CRUD Operations
  createContact(): void {
    // This would open a dialog for creating a new contact
    this.snackBar.open('Create Contact feature coming soon!', 'Close', { duration: 3000 });
  }

  editContact(contact: ZohoContact): void {
    // This would open a dialog for editing the contact
    this.snackBar.open(`Edit Contact: ${contact.First_Name} ${contact.Last_Name}`, 'Close', { duration: 3000 });
  }

  deleteContact(contact: ZohoContact): void {
    if (confirm(`Are you sure you want to delete ${contact.First_Name} ${contact.Last_Name}?`)) {
      if (contact.id) {
        this.zohoCrmService.deleteContact(contact.id).subscribe({
          next: () => {
            this.loadContacts();
            this.snackBar.open('Contact deleted successfully', 'Close', { duration: 3000 });
          },
          error: (error) => {
            console.error('Error deleting contact:', error);
            this.handleApiError(error);
          }
        });
      }
    }
  }

  // Utility Methods
  private handleApiError(error: any): void {
    if (error.status === 401) {
      this.snackBar.open('Authentication expired. Please reconnect to Zoho CRM.', 'Close', { duration: 5000 });
      this.disconnect();
    } else {
      this.snackBar.open('An error occurred. Please try again.', 'Close', { duration: 3000 });
    }
  }

  private resetStats(): void {
    this.stats = {
      totalContacts: 0,
      totalLeads: 0,
      totalDeals: 0,
      totalRevenue: 0
    };
  }

  // Search functionality
  applyFilter(event: Event, dataSource: MatTableDataSource<any>): void {
    const filterValue = (event.target as HTMLInputElement).value;
    dataSource.filter = filterValue.trim().toLowerCase();

    if (dataSource.paginator) {
      dataSource.paginator.firstPage();
    }
  }

  // Tab change handler
  onTabChange(index: number): void {
    this.selectedTabIndex = index;
  }

  // Refresh data
  refreshData(): void {
    if (this.isAuthenticated) {
      this.loadAllData();
      this.snackBar.open('Data refreshed successfully', 'Close', { duration: 2000 });
    }
  }

  // Helper methods for chip colors
  getLeadStatusColor(status: string): string {
    switch (status?.toLowerCase()) {
      case 'qualified': return 'primary';
      case 'contacted': return 'accent';
      case 'new': return 'info';
      case 'working': return 'warn';
      default: return 'primary';
    }
  }

  getDealStageColor(stage: string): string {
    switch (stage?.toLowerCase()) {
      case 'closed won': return 'success';
      case 'closed lost': return 'warn';
      case 'proposal': return 'accent';
      case 'negotiation': return 'primary';
      default: return 'info';
    }
  }
}