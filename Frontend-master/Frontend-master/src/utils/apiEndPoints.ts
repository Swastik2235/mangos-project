const endpoints = {
  getEmployeeDetails: `/employee/get-employee-details/`,
  addEmployee: "/employee/create-employee/",
  updateEmployee: "/employee/update-employee-details/",
  deleteEmployee: "/employee/delete-employee-details/",

  getMachineMaster: "/machine-master/get-machine-master/",
  addMachineMaster: "/machine-master/create-machine-master/",
  updateMachineMaster: "/machine-master/update-machine-master-by-machine-id/",
  deleteMachineMaster: "/machine-master/delete-machine-master-by-machine-id/",

  getMaintenanceRecords: "/maintenance-record/get-maintenance-record/",
  addMaintenanceRecord: "/maintenance-record/create-maintenance-record/",
  updateMaintenanceRecord: "/maintenance-record/update-maintenance-record-by-maintenance-id/",
  deleteMaintenanceRecord: "/maintenance-record/delete-maintenance-record-by-maintenance-id/",

  getMachineMaterials: "/machine-material/get-machine-material/",
  addMachineMaterial: "/machine-material/create-machine-material/",
  updateMachineMaterial: "/machine-material/update-machine-material-by-machine-id/",
  deleteMachineMaterial: "/machine-material/delete-machine-material-by-machine-id/",

  getInventoryCategoryDetails: "/inventory-category/get-inventory-category-details/",
  addInventoryCategory: "/inventory-category/create-inventory-category/",
  updateInventoryCategory: "/inventory-category/update-inventory-category-details/",
  deleteInventoryCategory: "/inventory-category/delete-inventory-category-details/",

  getInventoryItem: `/inventory-item/get-inventory-item-details/`,
  createInventoryItem: "/inventory-item/create-inventory-item/",
  updateInventoryItem: "/inventory-item/update-inventory-item-details/",
  deleteInventoryItem: "/inventory-item/delete-inventory-item-details/",

  getClientDetails: "/client-details/get-client-details/",
  createClientDetails: "/client-details/create-client-details/",
  updateClientDetails: "/client-details/update-client-details/",
  deleteClientDetails: "/client-details/delete-client-details/",

  getMaintenanceRecordsById: "/maintenance-record/get-maintenance-record-by-machine-master-id/",
  getMachineMaterialById: "/machine-material/get-machine-material-by-machine-master-id/",
  getInventoryItemsByCategory: "/inventory-item/get-inventory-item-by-inventory-category-id/",
  getStockItems: "/stock-details/get-stock-details/",

  getInventoryItems: "/inventory-item/get-inventory-item-details/",
  addInventoryItem: "/inventory-item/create-inventory-item/",
  updateInventoryItemDetails: "/inventory-item/update-inventory-item-details/",
  deleteInventoryItemDetails: "/inventory-item/delete-inventory-item-details/",

  getStockDetailsByInventoryId: "/stock-details/get-stock-details-by-inventory-id/",


  getItemMaster: "/item-master/get-item-master/",
  addItemMaster: "/item-master/add-item-master/",
  updateItemMaster: "/item-master/update-item-master/",
  deleteItemMaster: "/item-master/delete-item-master/",

  getStockMovements: "/stock-movement-details/get-stock-movement/",
  addStockMovement: "stock-movement-details/add-stock-movement/",
  updateStockMovement: "/stock-movement-details/update-stock-movement/",
  deleteStockMovement: "/stock-movement-details/delete-stock-movement/",

  transferStockMovement: "/stock-movement-details/transfer-stock-movement/",

  getTotalProductionFabrication: "/mis_app/fabrication/get-fabrication-production/",
  getTotalProductionGalva: "/mis_app/galvanizing/get-galva-production/", // Galva prod data 
  getTotalProductionSolar: "/mis_app/solar/get-solar/", // Solar prod data

  getprojectdetailsname: "/project-details/get-project-names/",

  getjobcardlist: "/job-card/get-list-of-job-card/",
  getjobcardlistid: "/job-card/get-job-card-by-id/",
  createjobcard: "/job-card/get-job-card-data/",



  getjobcard: "/job-card/get-header/",

  getjobcardsheet: "/job-card/get-job-sheet/",
  getcostschart: "/mis_app/cost/get-costs/",
  getSalesChart: "/mis_app/sale/get-sale/",
  updateFile: '/file/update-files/',
  downloadJobCardByProjectId: "/job-card/job-card-creation",
  getproductiontotal: "/mis_app/production-summary/get-prod_summary/",
  getGalvaProdSummary: "/mis_app/production-summary/get-galva-prod-summary/",

  getScrapMetrics: "/mis_app/production-summary/get-scrap-metrics/",
  getFabProdSummary: "/mis_app/production-summary/get-fab-prod-summary/",
  getSolarProdSummary: "/mis_app/production-summary/get-solar-prod-summary/",
  getEarnings: "/mis_app/Profit-and-loss/get-earnings/",
  getHighlightsTable: "/mis_app/highlights/highlights-report/",
  // getSalesCostRatio: "/mis_app/sale/get-sales-cost-ratio/",
  getSalesEarningsRatio: "/mis_app/sale/get-sales-earnings-ratio/",

  getHighlightsSalesReport: "/mis_app/highlights/highlights-sales-report/",
  // getSalesTonnageRatio: "/mis_app/sale/get-sales-tonnage-ratio/",

  getTotalProductionChartData: "/sales/get-total-production-chart-data/",
  getHighlightReport: "/sales/get-highlight-report/",
  //chart//
  getEarningsChartData: "/sales/get-earning-chart-data/",
  getSalesChartData: "/sales/get-sale-chart-data/",
  getCostChartData: "/sales/get-cost-chart-data/",
  getSalesCostRatioToday: "/sales/get-sales-cost-ratio-today/",
  getSalesCostRatio: "/mis_app/sale/get-sales-cost-ratio/",
  getEarningsSalesRatioToday: "/sales/get-earnings-sales-ratio-today/",
  getEarningsSalesRatio: "/sales/get-earnings-sales-ratio/",
  getSalesTonnageRatio: "/mis_app/sale/get-sales-tonnage-ratio/",
  getTodaysRevenue: "/sales/get-todays-revenue/",
  getCostToEarningsRatio: "/sales/get-cost-to-earnings-ratio/",
  getTodaySalesCostRatio: "/sales/get-today-sales-cost-ratio/",
};

export default endpoints;