import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { NgxSpinnerModule } from "ngx-spinner";

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DeleteComponent } from './dialogs/default/delete/delete.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { SidebarComponent } from './navbar/sidebar/sidebar.component';
import { CategoryFormComponent } from './dialogs/inventory/category-form/category-form.component';
import { PdfPopupComponent } from './dialogs/default/pdf-popup/pdf-popup.component';
import { TaxFormComponent } from './dialogs/inventory/tax-form/tax-form.component';
import { NotificationBarComponent } from './navbar/notification-bar/notification-bar.component';
import { TaskFormComponent } from './dialogs/project/task-form/task-form.component';
import { PeopleFormComponent } from './dialogs/project/people-form/people-form.component';
import { JobCardDetailComponent } from './dialogs/project/job-card-detail/job-card-detail.component';
import { ImportBomFormComponent } from './dialogs/project/import-bom-form/import-bom-form.component';
import { MachineFormComponent } from './dialogs/project/machine-form/machine-form.component';
import { SectionFormComponent } from './dialogs/project/section-form/section-form.component';
import { JobCardFormComponent } from './dialogs/project/job-card-form/job-card-form.component';
import { ConfirmComponent } from './dialogs/default/confirm/confirm.component';
import { PackagingDetailComponent } from './dialogs/project/packaging-detail/packaging-detail.component';
import { PackagingFormComponent } from './dialogs/project/packaging-form/packaging-form.component';
import { OperationFormComponent } from './dialogs/project/operation-form/operation-form.component';
import { DocumentFormComponent } from './dialogs/default/document-form/document-form.component';
import { UploadFileFormComponent } from './dialogs/default/upload-file-form/upload-file-form.component';
import { InviteFormComponent } from './dialogs/organization/invite-form/invite-form.component';
import { ServiceFormComponent } from './dialogs/project/service-form/service-form.component';
import { ImagePreviewComponent } from './dialogs/default/image-preview/image-preview.component';
import { AddbomFormComponent } from './dialogs/project/addbom-form/addbom-form.component';
import { TankFormComponent } from './dialogs/project/tank-form/tank-form.component';
import { TankDataFormComponent } from './dialogs/project/tank-data-form/tank-data-form.component';
import { GalvaMaterialFormComponent } from './dialogs/project/galva-material-form/galva-material-form.component';
import { GalvaJobCardFormComponent } from './dialogs/project/galva-job-card-form/galva-job-card-form.component';
import { GalvaJobCardDetailComponent } from './dialogs/project/galva-job-card-detail/galva-job-card-detail.component';
import { DeleteDirective } from '../delete.directive';




@NgModule({
  declarations: [
    SidebarComponent,
    DeleteComponent,
    CategoryFormComponent,
    PdfPopupComponent,
    TaxFormComponent,
    NotificationBarComponent,
    TaskFormComponent,
    PeopleFormComponent,
    JobCardDetailComponent,
    ImportBomFormComponent,
    MachineFormComponent,
    SectionFormComponent,
    JobCardFormComponent,
    ConfirmComponent,
    PackagingDetailComponent,
    PackagingFormComponent,
    OperationFormComponent,
    DocumentFormComponent,
    UploadFileFormComponent,
    InviteFormComponent,
    ServiceFormComponent,
    ImagePreviewComponent,
    AddbomFormComponent,
    TankFormComponent,
    TankDataFormComponent,
    GalvaMaterialFormComponent,
    GalvaJobCardFormComponent,
    GalvaJobCardDetailComponent,
    DeleteDirective,
  ],

  imports: [
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    FlexLayoutModule,
    MatTableModule,
    NgxSpinnerModule
  ],
  exports : [
    CommonModule,
    DeleteComponent,
    CategoryFormComponent,
    PdfPopupComponent,
    TaxFormComponent,
    NotificationBarComponent,
    DeleteDirective,
    
  ]
})
export class SharedModule { }
//export {NotificationBarComponent } from './navbar/notification-bar/notification-bar.component';
