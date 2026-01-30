# MangosAdmin

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Create Angular Project
	ng new MangosAdmin

## Install Angular Universal and update project files
	ng add @nguniversal/express-engine --clientProject MangosAdmin

## Run Server with Angular Universal
	npm run build:ssr && npm run serve:ssr

## Upgrade Angular version
	ng update @angular/core @angular/cli 

## Install New Libraries
	ng add @angular/material 
	ng add @ng-bootstrap/ng-bootstrap
	npm install ngx-spinner --save
	npm install highcharts-angular --save
	npm install highcharts --save
	npm i file-saver

## Generate New Service
	ng generate service service/Authentication
	ng generate guard service/Auth

## Generate New Component
	ng generate module core
	ng generate module core --route core --module app.module
	ng generate module universal --route universal --module app.module
	ng generate module core/default --route default --module core.module
	ng generate module core/inventory --route inventory --module core.module
	ng generate module core/organization --route organization --module core.module
	ng generate module core/project --route project --module core.module
	ng generate module shared
	ng generate module pipes
	ng generate module service
	ng generate pipe pipes/custom/filter
	ng generate pipe pipes/custom/filterArray
	ng generate pipe pipes/custom/displayLink
	ng generate pipe pipes/custom/sortBy
	ng generate component core/default/home
	ng generate component universal/login
	ng generate component universal/signup
	ng generate component universal/forgot
	ng generate component core/default/profile
	ng generate component core/default/document
	ng generate component core/default/documentDetail
	ng generate component core/default/changePassword
	ng generate component core/default/forgotPassword
	ng generate @angular/material:dashboard core/default/dashboard
	ng generate @angular/material:table core/inventory/category
	ng generate @angular/material:table core/inventory/product
	ng generate component core/inventory/order
	ng generate component core/inventory/productForm
	ng generate @angular/material:table core/inventory/purchase
	ng generate component core/inventory/purchaseForm
	ng generate @angular/material:table core/inventory/sale
	ng generate component core/inventory/saleForm
	ng generate @angular/material:table core/inventory/tax
	ng generate @angular/material:dashboard core/inventory/report
	ng generate @angular/material:navigation shared/navbar/sidebar

	ng generate @angular/material:table core/organization/employee
	ng generate component core/organization/employeeForm
	ng generate @angular/material:table core/organization/company
	ng generate component core/organization/companyForm
	ng generate @angular/material:table core/organization/permissions
	ng generate component core/organization/permissionForm
	ng generate @angular/material:table core/organization/client
	ng generate component core/organization/clientForm
	ng generate @angular/material:table core/organization/invite
	
	ng generate component core/project/projectList
	ng generate component core/project/projectForm
	ng generate component core/project/projectDetail
	ng generate @angular/material:table core/project/task
	ng generate component core/project/projectSetting
	ng generate @angular/material:table core/project/jobCard
	ng generate @angular/material:table core/project/section
	ng generate @angular/material:table core/project/machine
	ng generate @angular/material:table core/project/operation
	ng generate @angular/material:table core/project/tower
	ng generate @angular/material:table core/project/mark
	ng generate @angular/material:table core/project/production
	ng generate @angular/material:table core/project/bom
	ng generate @angular/material:table core/project/packaging
	ng generate @angular/material:table core/project/service
	ng generate component core/project/jobInvoice
	ng generate component core/project/packagingInvoice
	ng generate component core/project/jobForm
	ng generate component core/project/galvaJobForm
	ng generate component core/project/packForm
	ng generate component core/project/galvaMaterial
	ng generate component core/project/galvaJobCard
	ng generate component core/project/tank
	ng generate component core/project/tankData

	
	ng generate @angular/material:dashboard core/project/report
	ng generate @angular/material:table core/project/cuttingPlan
	

	ng generate component shared/navbar/sidebar
	ng generate component shared/navbar/notificationBar
	ng generate component shared/navbar/topnav
	ng generate component shared/common/orderlist
	ng generate component shared/common/orderDisplay
	ng generate component shared/common/chat
	
	ng generate component shared/dialogs/Nqs
	ng generate component shared/dialogs/Image
	ng generate component shared/dialogs/Phrase
	ng generate component shared/dialogs/organization/inviteForm
	ng generate component shared/dialogs/project/taskForm
	ng generate component shared/dialogs/project/peopleForm
	ng generate component shared/dialogs/project/jobCardDetail
	ng generate component shared/dialogs/project/galvajobCardDetail
	ng generate component shared/dialogs/project/importBomForm
	ng generate component shared/dialogs/project/machineForm
	ng generate component shared/dialogs/project/tankForm
	ng generate component shared/dialogs/project/tankDataForm
	ng generate component shared/dialogs/project/operationForm
	ng generate component shared/dialogs/project/galvaMaterialForm
	ng generate component shared/dialogs/project/sectionForm
	ng generate component shared/dialogs/project/galvaJobCardForm
	ng generate component shared/dialogs/project/jobCardForm
	ng generate component shared/dialogs/project/packagingDetail
	ng generate component shared/dialogs/project/packagingForm
	ng generate component shared/dialogs/project/serviceForm
	ng generate component shared/dialogs/project/addbomForm

	ng generate component shared/dialogs/default/delete
	ng generate component shared/dialogs/default/confirm
	ng generate component shared/dialogs/default/documentForm
	ng generate component shared/dialogs/default/UploadFileForm
	ng generate component shared/dialogs/default/pdfPopup
	ng generate component shared/dialogs/default/ImagePreview
	ng generate component shared/dialogs/inventory/categoryForm
	ng generate component shared/dialogs/inventory/taxForm
	ng generate component shared/graph/pie

## Generate new directive 
	ng generate directive delete


# SonalQube Testing command for Vijay Mac
	sonar-scanner \
	  -Dsonar.projectKey=MangosAdmin \
	  -Dsonar.sources=. \
	  -Dsonar.host.url=http://localhost:9000 \
	  -Dsonar.login=617515d6c8f7feff0e29422adc2acb34a8c899b5


### Thanks for Reading... ###
# Happy Coding!!! #
