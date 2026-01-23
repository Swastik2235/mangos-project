from mis_app.models import *
from django.http import JsonResponse
from django.db.models import Sum, Value
from django.db.models.functions import Coalesce
from datetime import datetime
from rest_framework import viewsets, status
from django.db import models

class HighlightsReportViewSet(viewsets.ModelViewSet):
    def show_highlights_table(self, request):
        try:
            # Get month and year from request parameters
            month = request.GET.get('month')
            year = request.GET.get('year')
            
            if not month or not year:
                return JsonResponse({'error': 'Month and year parameters are required'}, status=400)
            
            try:
                month = int(month)
                year = int(year)
            except ValueError:
                return JsonResponse({'error': 'Month and year must be integers'}, status=400)
            
            # Create date range for the month
            start_date = datetime(year, month, 1).date()
            if month == 12:
                end_date = datetime(year + 1, 1, 1).date()
            else:
                next_month_start = datetime(year, month + 1, 1).date()
                end_date = next_month_start 
            
            response_data = {}
            
            # 1. Sales Data
            sales = Sale.objects.filter(sale_date__gte=start_date, sale_date__lt=end_date)
            sales_daily = sales.values('sale_date').annotate(
                daily_qty=Sum('tonnage'),
                daily_value=Sum('total_sales')
            ).order_by('sale_date')
            
            sales_monthly = sales.aggregate(
                total_qty=Sum(Coalesce('tonnage', Value(0, output_field=models.DecimalField()))) or 0,
                total_value=Sum(Coalesce('total_sales', Value(0, output_field=models.DecimalField()))) or 0
            )
            sales_monthly['rate'] = sales_monthly['total_value'] / sales_monthly['total_qty'] if sales_monthly['total_qty'] else 0
            
            response_data['sales'] = {
                'daily': list(sales_daily),
                'monthly': sales_monthly
            }
            
            # 2. Fabrication Production
            fab_production = FabricationProduction.objects.filter(production_date__gte=start_date, production_date__lt=end_date)
            fab_daily = fab_production.values('production_date').annotate(
                daily_qty=Sum(
                    Coalesce('own_steel_towers_quantity', Value(0, output_field=models.IntegerField())) + 
                    Coalesce('job_work_towers_quantity', Value(0, output_field=models.IntegerField())),
                    output_field=models.IntegerField()
                ),
                daily_value=Sum(
                    Coalesce('own_steel_towers_value', Value(0, output_field=models.DecimalField())) + 
                    Coalesce('job_work_towers_value', Value(0, output_field=models.DecimalField())),
                    output_field=models.DecimalField()
                )
            ).order_by('production_date')
            
            fab_monthly = fab_production.aggregate(
                total_qty=Sum(
                    Coalesce('own_steel_towers_quantity', Value(0, output_field=models.IntegerField())) + 
                    Coalesce('job_work_towers_quantity', Value(0, output_field=models.IntegerField())),
                    output_field=models.IntegerField()
                ) or 0,
                total_value=Sum(
                    Coalesce('own_steel_towers_value', Value(0, output_field=models.DecimalField())) + 
                    Coalesce('job_work_towers_value', Value(0, output_field=models.DecimalField())),
                    output_field=models.DecimalField()
                ) or 0
            )
            fab_monthly['rate'] = fab_monthly['total_value'] / fab_monthly['total_qty'] if fab_monthly['total_qty'] else 0
            
            response_data['fabrication'] = {
                'daily': list(fab_daily),
                'monthly': fab_monthly
            }
            
            # 3. Galvanizing Production
            galva_production = GalvanizingProduction.objects.filter(production_date__gte=start_date, production_date__lt=end_date)
            galva_daily = galva_production.values('production_date').annotate(
                daily_qty=Sum(
                    Coalesce('quantity_own_zinc', Value(0, output_field=models.IntegerField())) + 
                    Coalesce('quantity_job_work', Value(0, output_field=models.IntegerField())),
                    output_field=models.IntegerField()
                ),
                daily_value=Sum(
                    Coalesce('value_own_zinc', Value(0, output_field=models.DecimalField())) + 
                    Coalesce('value_job_work', Value(0, output_field=models.DecimalField())),
                    output_field=models.DecimalField()
                )
            ).order_by('production_date')
            
            galva_monthly = galva_production.aggregate(
                total_qty=Sum(
                    Coalesce('quantity_own_zinc', Value(0, output_field=models.IntegerField())) + 
                    Coalesce('quantity_job_work', Value(0, output_field=models.IntegerField())),
                    output_field=models.IntegerField()
                ) or 0,
                total_value=Sum(
                    Coalesce('value_own_zinc', Value(0, output_field=models.DecimalField())) + 
                    Coalesce('value_job_work', Value(0, output_field=models.DecimalField())),
                    output_field=models.DecimalField()
                ) or 0
            )
            galva_monthly['rate'] = galva_monthly['total_value'] / galva_monthly['total_qty'] if galva_monthly['total_qty'] else 0
            
            response_data['galvanizing'] = {
                'daily': list(galva_daily),
                'monthly': galva_monthly
            }
            
            # 4. Solar Production
            solar_production = SolarProduction.objects.filter(production_date__gte=start_date, production_date__lt=end_date)
            solar_daily = solar_production.values('production_date').annotate(
                daily_qty=Sum(
                    Coalesce('own_steel_towers_quantity', Value(0, output_field=models.IntegerField())) + 
                    Coalesce('job_work_towers_quantity', Value(0, output_field=models.IntegerField())),
                    output_field=models.IntegerField()
                ),
                daily_value=Sum(
                    Coalesce('own_steel_towers_value', Value(0, output_field=models.DecimalField())) + 
                    Coalesce('job_work_towers_value', Value(0, output_field=models.DecimalField())),
                    output_field=models.DecimalField()
                )
            ).order_by('production_date')
            
            solar_monthly = solar_production.aggregate(
                total_qty=Sum(
                    Coalesce('own_steel_towers_quantity', Value(0, output_field=models.IntegerField())) + 
                    Coalesce('job_work_towers_quantity', Value(0, output_field=models.IntegerField())),
                    output_field=models.IntegerField()
                ) or 0,
                total_value=Sum(
                    Coalesce('own_steel_towers_value', Value(0, output_field=models.DecimalField())) + 
                    Coalesce('job_work_towers_value', Value(0, output_field=models.DecimalField())),
                    output_field=models.DecimalField()
                ) or 0
            )
            solar_monthly['rate'] = solar_monthly['total_value'] / solar_monthly['total_qty'] if solar_monthly['total_qty'] else 0
            
            response_data['solar'] = {
                'daily': list(solar_daily),
                'monthly': solar_monthly
            }
            
            # 5. Scrap Metrics
            scrap_metrics = ScrapGenerationMetrics.objects.filter(created_at__date__gte=start_date, created_at__date__lt=end_date)
            scrap_daily = scrap_metrics.values('created_at__date').annotate(
                daily_qty=Sum('actual_quantity'),
                daily_value=Sum('actual_value')
            ).order_by('created_at__date')
            
            scrap_monthly = scrap_metrics.aggregate(
                total_qty=Sum(Coalesce('actual_quantity', Value(0, output_field=models.DecimalField()))) or 0,
                total_value=Sum(Coalesce('actual_value', Value(0, output_field=models.DecimalField()))) or 0
            )
            scrap_monthly['rate'] = scrap_monthly['total_value'] / scrap_monthly['total_qty'] if scrap_monthly['total_qty'] else 0
            
            response_data['scrap'] = {
                'daily': list(scrap_daily),
                'monthly': scrap_monthly
            }
            
            # 6. Cost Data
            costs = Cost.objects.filter(cost_date__gte=start_date, cost_date__lt=end_date)
            critical_costs = CriticalCostParameters.objects.filter(date__gte=start_date, date__lt=end_date, is_monthly_total=False)
            manpower_costs = ManpowerCost.objects.filter(date__gte=start_date, date__lt=end_date)
            consumables_costs = ConsumablesAndWasteCosts.objects.filter(cost_date__gte=start_date, cost_date__lt=end_date)
            dispatch_costs = DispatchAndMiscCosts.objects.filter(cost_date__gte=start_date, cost_date__lt=end_date)

            cost_daily = costs.values('cost_date').annotate(
                daily_qty=Sum('quantity'),
                daily_value=Sum('cost_value')
            ).order_by('cost_date')

            critical_cost_daily = critical_costs.values('date').annotate(
                daily_qty=Sum('units_consumed'),
                daily_value=Sum('daily_cost')
            ).order_by('date')

            manpower_daily = manpower_costs.values('date').annotate(
                daily_qty=Sum('number_of_staff'),
                daily_value=Sum('total_cost')
            ).order_by('date')

            consumables_daily = consumables_costs.values('cost_date').annotate(
                daily_qty=Sum('quantity'),
                daily_value=Sum('total_cost')
            ).order_by('cost_date')

            dispatch_daily = dispatch_costs.values('cost_date').annotate(
                daily_qty=Sum('quantity'),
                daily_value=Sum('total_cost')
            ).order_by('cost_date')

            cost_monthly = costs.aggregate(
                total_qty=Sum(Coalesce('quantity', Value(0, output_field=models.DecimalField()))) or 0,
                total_value=Sum(Coalesce('cost_value', Value(0, output_field=models.DecimalField()))) or 0
            )
            cost_monthly['rate'] = cost_monthly['total_value'] / cost_monthly['total_qty'] if cost_monthly['total_qty'] else 0

            critical_cost_monthly = critical_costs.aggregate(
                total_qty=Sum(Coalesce('units_consumed', Value(0, output_field=models.DecimalField()))) or 0,
                total_value=Sum(Coalesce('daily_cost', Value(0, output_field=models.DecimalField()))) or 0
            )
            critical_cost_monthly['rate'] = critical_cost_monthly['total_value'] / critical_cost_monthly['total_qty'] if critical_cost_monthly['total_qty'] else 0
            
            manpower_monthly = manpower_costs.aggregate(
                total_qty=Sum(Coalesce('number_of_staff', Value(0, output_field=models.IntegerField()))) or 0,
                total_value=Sum(Coalesce('total_cost', Value(0, output_field=models.DecimalField()))) or 0
            )
            manpower_monthly['rate'] = manpower_monthly['total_value'] / manpower_monthly['total_qty'] if manpower_monthly['total_qty'] else 0

            consumables_monthly = consumables_costs.aggregate(
                total_qty=Sum(Coalesce('quantity', Value(0, output_field=models.DecimalField()))) or 0,
                total_value=Sum(Coalesce('total_cost', Value(0, output_field=models.DecimalField()))) or 0
            )
            consumables_monthly['rate'] = consumables_monthly['total_value'] / consumables_monthly['total_qty'] if consumables_monthly['total_qty'] else 0

            dispatch_monthly = dispatch_costs.aggregate(
                total_qty=Sum(Coalesce('quantity', Value(0, output_field=models.DecimalField()))) or 0,
                total_value=Sum(Coalesce('total_cost', Value(0, output_field=models.DecimalField()))) or 0
            )
            dispatch_monthly['rate'] = dispatch_monthly['total_value'] / dispatch_monthly['total_qty'] if dispatch_monthly['total_qty'] else 0
            
            total_monthly_costs_value = (
                cost_monthly['total_value'] + 
                critical_cost_monthly['total_value'] + 
                manpower_monthly['total_value'] + 
                consumables_monthly['total_value'] + 
                dispatch_monthly['total_value']
            )

            response_data['costs'] = {
                'daily': {
                    'general_costs': list(cost_daily),
                    'critical_costs': list(critical_cost_daily),
                    'manpower_costs': list(manpower_daily),
                    'consumables_costs': list(consumables_daily),
                    'dispatch_costs': list(dispatch_daily)
                },
                'monthly': {
                    'breakdown': {
                        'general_costs': cost_monthly['total_value'],
                        'critical_costs': critical_cost_monthly['total_value'],
                        'manpower_costs': manpower_monthly['total_value'],
                        'consumables_costs': consumables_monthly['total_value'],
                        'dispatch_costs': dispatch_monthly['total_value'],
                        'total': total_monthly_costs_value
                    },
                    'detailed_metrics': {
                        'general_costs': cost_monthly,
                        'critical_costs': critical_cost_monthly,
                        'manpower_costs': manpower_monthly,
                        'consumables_costs': consumables_monthly,
                        'dispatch_costs': dispatch_monthly
                    }
                }
            }
            
            # 7. Earnings Data
            earnings_data = ProfitLossSummary.objects.filter(
                summary_date__gte=start_date, 
                summary_date__lt=end_date
            )
            
            daily_earnings = earnings_data.values('summary_date').annotate(
                daily_sales=Sum('total_sale_value'),
                daily_costs=Sum('total_cost'),
                daily_zinc_savings=Sum('zinc_saved_value'),
                daily_profit=Sum('profit_or_loss')
            ).order_by('summary_date')
            
            formatted_daily_earnings = []
            for day in daily_earnings:
                sales = day['daily_sales'] or 0
                costs = day['daily_costs'] or 0
                zinc_savings = day['daily_zinc_savings'] or 0
                profit = day['daily_profit'] or 0 
                
                margin_percentage = (profit / sales * 100) if sales > 0 else 0
                
                formatted_daily_earnings.append({
                    'date': day['summary_date'],
                    'total_sales': sales,
                    'total_costs': costs,
                    'zinc_savings': zinc_savings,
                    'adjusted_costs': costs - zinc_savings,
                    'total_profit': profit,
                    'margin_percentage': round(margin_percentage, 2)
                })
            
            aggregates = earnings_data.aggregate(
                total_sales=Sum(Coalesce('total_sale_value', Value(0, output_field=models.DecimalField()))) or 0,
                total_costs=Sum(Coalesce('total_cost', Value(0, output_field=models.DecimalField()))) or 0,
                zinc_savings=Sum(Coalesce('zinc_saved_value', Value(0, output_field=models.DecimalField()))) or 0,
                total_profit=Sum(Coalesce('profit_or_loss', Value(0, output_field=models.DecimalField()))) or 0
            )
            
            monthly_earnings = {
                'total_sales': aggregates['total_sales'],
                'total_costs': aggregates['total_costs'],
                'zinc_savings': aggregates['zinc_savings'],
                'adjusted_costs': aggregates['total_costs'] - aggregates['zinc_savings'],
                'total_profit': aggregates['total_profit'],
                'margin_percentage': round((aggregates['total_profit'] / aggregates['total_sales'] * 100), 2) if aggregates['total_sales'] > 0 else 0
            }
            
            response_data['earnings'] = {
                'daily': formatted_daily_earnings,
                'monthly': monthly_earnings
            }
            
            return JsonResponse(response_data)
            
        except Exception as e:
            print(f"Error in show_highlights_table: {str(e)}")
            import traceback
            traceback.print_exc()
            return JsonResponse({'error': str(e)}, status=500)
        
    def show_sales_highlights_tables(self, request):
        try:
            # Get month and year from request parameters
            month = request.GET.get('month')
            year = request.GET.get('year')
            
            if not month or not year:
                return JsonResponse({'error': 'Month and year parameters are required'}, status=400)
            
            try:
                month = int(month)
                year = int(year)
            except ValueError:
                return JsonResponse({'error': 'Month and year must be integers'}, status=400)
            
            # Create date range for the month
            start_date = datetime(year, month, 1).date()
            if month == 12:
                end_date = datetime(year + 1, 1, 1).date()
            else:
                end_date = datetime(year, month + 1, 1).date()
            
            response_data = {}
            
            # Helper function to safely get aggregation results
            def get_agg_results(queryset, qty_field, value_field):
                result = queryset.aggregate(
                    qty=Sum(qty_field) or 0,
                    value=Sum(value_field) or 0
                )
                result['rate'] = result['value'] / result['qty'] if result['qty'] else 0
                return result
            
            # 1. Main Sales Data
            sales = Sale.objects.filter(sale_date__gte=start_date, sale_date__lt=end_date)
            
            # Daily sales breakdown by type
            sales_daily = sales.values('sale_date', 'related_production_type').annotate(
                daily_qty=Sum('tonnage'),
                daily_value=Sum('total_sales')
            ).order_by('sale_date', 'related_production_type')
            
            # Format daily sales by type
            formatted_daily_sales = {}
            for sale_item in sales_daily:
                date_str = sale_item['sale_date'].strftime('%Y-%m-%d')
                if date_str not in formatted_daily_sales:
                    formatted_daily_sales[date_str] = {
                        'date': date_str,
                        'fabrication': {'qty': 0, 'value': 0},
                        'galvanizing': {'qty': 0, 'value': 0},
                        'solar': {'qty': 0, 'value': 0},
                        'other': {'qty': 0, 'value': 0},
                        'total': {'qty': 0, 'value': 0}
                    }
                
                prod_type = (sale_item['related_production_type'] or '').lower()
                if prod_type in ['fabrication', 'fab']:
                    target_type = 'fabrication'
                elif prod_type in ['galvanizing', 'galv']:
                    target_type = 'galvanizing'
                elif prod_type in ['solar']:
                    target_type = 'solar'
                else:
                    target_type = 'other'

                qty = float(sale_item['daily_qty'] or 0)
                value = float(sale_item['daily_value'] or 0)
                
                formatted_daily_sales[date_str][target_type]['qty'] += qty
                formatted_daily_sales[date_str][target_type]['value'] += value
                formatted_daily_sales[date_str]['total']['qty'] += qty
                formatted_daily_sales[date_str]['total']['value'] += value
            
            # Monthly sales totals by type
            sales_monthly_agg = sales.values('related_production_type').annotate(
                total_qty=Sum('tonnage'),
                total_value=Sum('total_sales')
            ).order_by('related_production_type')
            
            formatted_monthly_sales = {
                'fabrication': {'qty': 0, 'value': 0, 'rate': 0},
                'galvanizing': {'qty': 0, 'value': 0, 'rate': 0},
                'solar': {'qty': 0, 'value': 0, 'rate': 0},
                'other': {'qty': 0, 'value': 0, 'rate': 0},
                'total': {'qty': 0, 'value': 0, 'rate': 0}
            }
            
            for sale_summary in sales_monthly_agg:
                prod_type = (sale_summary['related_production_type'] or '').lower()
                qty = float(sale_summary['total_qty'] or 0)
                value = float(sale_summary['total_value'] or 0)
                
                if prod_type in ['fabrication', 'fab']:
                    target_type = 'fabrication'
                elif prod_type in ['galvanizing', 'galv']:
                    target_type = 'galvanizing'
                elif prod_type in ['solar']:
                    target_type = 'solar'
                else:
                    target_type = 'other'

                formatted_monthly_sales[target_type]['qty'] += qty
                formatted_monthly_sales[target_type]['value'] += value
                formatted_monthly_sales['total']['qty'] += qty
                formatted_monthly_sales['total']['value'] += value

            for category in formatted_monthly_sales:
                if formatted_monthly_sales[category]['qty']:
                    formatted_monthly_sales[category]['rate'] = (
                        formatted_monthly_sales[category]['value'] / 
                        formatted_monthly_sales[category]['qty']
                    )
            
            # 2. Fabrication Production with subtypes
            fab_production = FabricationProduction.objects.filter(production_date__gte=start_date, production_date__lt=end_date)
            
            # Consolidated daily
            fab_daily = fab_production.values('production_date').annotate(
                daily_qty=Sum(
                    Coalesce('own_steel_towers_quantity', Value(0)) + 
                    Coalesce('job_work_towers_quantity', Value(0)),
                    output_field=models.IntegerField()
                ),
                daily_value=Sum(
                    Coalesce('own_steel_towers_value', Value(0)) + 
                    Coalesce('job_work_towers_value', Value(0)),
                    output_field=models.DecimalField()
                )
            ).order_by('production_date')
            
            # Detailed daily
            fab_daily_detail = []
            for prod in fab_production:
                fab_daily_detail.append({
                    'date': prod.production_date.strftime('%Y-%m-%d'),
                    'own_steel': {
                        'qty': float(prod.own_steel_towers_quantity or 0),
                        'value': float(prod.own_steel_towers_value or 0)
                    },
                    'job_work': {
                        'qty': float(prod.job_work_towers_quantity or 0),
                        'value': float(prod.job_work_towers_value or 0)
                    },
                    'total': {
                        'qty': float((prod.own_steel_towers_quantity or 0) + (prod.job_work_towers_quantity or 0)),
                        'value': float((prod.own_steel_towers_value or 0) + (prod.job_work_towers_value or 0))
                    }
                })
            
            # Monthly aggregates
            fab_monthly = get_agg_results(
                fab_production,
                models.F('own_steel_towers_quantity') + models.F('job_work_towers_quantity'),
                models.F('own_steel_towers_value') + models.F('job_work_towers_value')
            )
            
            # Monthly detail
            fab_monthly_detail = {
                'own_steel': get_agg_results(fab_production, 'own_steel_towers_quantity', 'own_steel_towers_value'),
                'job_work': get_agg_results(fab_production, 'job_work_towers_quantity', 'job_work_towers_value'),
                'total': fab_monthly
            }
            
            # 3. Galvanizing Production with subtypes
            galva_production = GalvanizingProduction.objects.filter(production_date__gte=start_date, production_date__lt=end_date)
            
            # Consolidated daily
            galva_daily = galva_production.values('production_date').annotate(
                daily_qty=Sum(
                    Coalesce('quantity_own_zinc', Value(0)) + 
                    Coalesce('quantity_job_work', Value(0)),
                    output_field=models.IntegerField()
                ),
                daily_value=Sum(
                    Coalesce('value_own_zinc', Value(0)) + 
                    Coalesce('value_job_work', Value(0)),
                    output_field=models.DecimalField()
                )
            ).order_by('production_date')
            
            # Detailed daily
            galva_daily_detail = []
            for prod in galva_production:
                galva_daily_detail.append({
                    'date': prod.production_date.strftime('%Y-%m-%d'),
                    'own_zinc': {
                        'qty': float(prod.quantity_own_zinc or 0),
                        'value': float(prod.value_own_zinc or 0)
                    },
                    'job_work': {
                        'qty': float(prod.quantity_job_work or 0),
                        'value': float(prod.value_job_work or 0)
                    },
                    'total': {
                        'qty': float((prod.quantity_own_zinc or 0) + (prod.quantity_job_work or 0)),
                        'value': float((prod.value_own_zinc or 0) + (prod.value_job_work or 0))
                    }
                })
            
            # Monthly aggregates
            galva_monthly = get_agg_results(
                galva_production,
                models.F('quantity_own_zinc') + models.F('quantity_job_work'),
                models.F('value_own_zinc') + models.F('value_job_work')
            )
            
            # Monthly detail
            galva_monthly_detail = {
                'own_zinc': get_agg_results(galva_production, 'quantity_own_zinc', 'value_own_zinc'),
                'job_work': get_agg_results(galva_production, 'quantity_job_work', 'value_job_work'),
                'total': galva_monthly
            }
            
            # 4. Solar Production with subtypes
            solar_production = SolarProduction.objects.filter(production_date__gte=start_date, production_date__lt=end_date)
            
            # Consolidated daily
            solar_daily = solar_production.values('production_date').annotate(
                daily_qty=Sum(
                    Coalesce('own_steel_towers_quantity', Value(0)) + 
                    Coalesce('job_work_towers_quantity', Value(0)),
                    output_field=models.IntegerField()
                ),
                daily_value=Sum(
                    Coalesce('own_steel_towers_value', Value(0)) + 
                    Coalesce('job_work_towers_value', Value(0)),
                    output_field=models.DecimalField()
                )
            ).order_by('production_date')
            
            # Detailed daily
            solar_daily_detail = []
            for prod in solar_production:
                solar_daily_detail.append({
                    'date': prod.production_date.strftime('%Y-%m-%d'),
                    'own_steel': {
                        'qty': float(prod.own_steel_towers_quantity or 0),
                        'value': float(prod.own_steel_towers_value or 0)
                    },
                    'job_work': {
                        'qty': float(prod.job_work_towers_quantity or 0),
                        'value': float(prod.job_work_towers_value or 0)
                    },
                    'total': {
                        'qty': float((prod.own_steel_towers_quantity or 0) + (prod.job_work_towers_quantity or 0)),
                        'value': float((prod.own_steel_towers_value or 0) + (prod.job_work_towers_value or 0))
                    }
                })
            
            # Monthly aggregates
            solar_monthly = get_agg_results(
                solar_production,
                models.F('own_steel_towers_quantity') + models.F('job_work_towers_quantity'),
                models.F('own_steel_towers_value') + models.F('job_work_towers_value')
            )
            
            # Monthly detail
            solar_monthly_detail = {
                'own_steel': get_agg_results(solar_production, 'own_steel_towers_quantity', 'own_steel_towers_value'),
                'job_work': get_agg_results(solar_production, 'job_work_towers_quantity', 'job_work_towers_value'),
                'total': solar_monthly
            }
            
            # 5. Scrap Metrics - Corrected version
            scrap_metrics = ScrapGenerationMetrics.objects.filter(created_at__date__gte=start_date, created_at__date__lt=end_date)

            # Consolidated daily
            scrap_daily = scrap_metrics.values('created_at__date').annotate(
                daily_qty=Sum('actual_quantity'),
                daily_value=Sum('actual_value')
            ).order_by('created_at__date')

            # Detailed daily by metric type - using metric_type instead of scrap_type
            scrap_daily_detail = scrap_metrics.values('created_at__date', 'metric_type').annotate(
                daily_qty=Sum('actual_quantity'),
                daily_value=Sum('actual_value')
            ).order_by('created_at__date', 'metric_type')

            # Monthly aggregates
            scrap_monthly = get_agg_results(scrap_metrics, 'actual_quantity', 'actual_value')

            # Monthly detail by metric type - using metric_type instead of scrap_type
            metric_types = scrap_metrics.values_list('metric_type', flat=True).distinct()
            scrap_monthly_detail = {}

            for mtype in metric_types:
                scrap_monthly_detail[mtype] = get_agg_results(
                    scrap_metrics.filter(metric_type=mtype),
                    'actual_quantity',
                    'actual_value'
                )

            # Build the scrap section of the response
            scrap_response = {
                'daily': list(scrap_daily),
                'daily_detail': list(scrap_daily_detail),
                'monthly': scrap_monthly,
                'monthly_detail': scrap_monthly_detail
            }
            
            # Build final response
            response_data = {
                'daily_sales_breakdown': list(formatted_daily_sales.values()),
                'monthly_sales_summary': formatted_monthly_sales,
                'fabrication': {
                    'daily': list(fab_daily),
                    'daily_detail': fab_daily_detail,
                    'monthly': fab_monthly,
                    'monthly_detail': fab_monthly_detail
                },
                'galvanizing': {
                    'daily': list(galva_daily),
                    'daily_detail': galva_daily_detail,
                    'monthly': galva_monthly,
                    'monthly_detail': galva_monthly_detail
                },
                'solar': {
                    'daily': list(solar_daily),
                    'daily_detail': solar_daily_detail,
                    'monthly': solar_monthly,
                    'monthly_detail': solar_monthly_detail
                },
                'scrap': {
                    'daily': list(scrap_daily),
                    'daily_detail': list(scrap_daily_detail),
                    'monthly': scrap_monthly,
                    'monthly_detail': scrap_monthly_detail
                }
            }
            
            return JsonResponse(response_data)
            
        except Exception as e:
            print(f"Error in show_sales_highlights_tables: {str(e)}")
            import traceback
            traceback.print_exc()
            return JsonResponse({'error': str(e)}, status=500)
        
    def show_cost_highlights_tables(self, request):
        try:
            # Get month and year from request parameters
            month = request.GET.get('month')
            year = request.GET.get('year')
            detail_level = request.GET.get('detail', 'summary')  # 'summary' or 'detailed'
            
            if not month or not year:
                return JsonResponse({'error': 'Month and year parameters are required'}, status=400)
            
            try:
                month = int(month)
                year = int(year)
            except ValueError:
                return JsonResponse({'error': 'Month and year must be integers'}, status=400)
            
            # Create date range for the month
            start_date = datetime(year, month, 1).date()
            if month == 12:
                end_date = datetime(year + 1, 1, 1).date()
            else:
                end_date = datetime(year, month + 1, 1).date()
            
            response_data = {}
            
            # Helper function to safely get aggregation results
            def get_agg_results(queryset, value_field):
                result = queryset.aggregate(
                    value=Sum(value_field) or 0
                )
                return result
            
            # 1. General Costs
            general_costs = Cost.objects.filter(cost_date__gte=start_date, cost_date__lt=end_date)
            general_daily = general_costs.values('cost_date').annotate(
                daily_value=Sum('cost_value')
            ).order_by('cost_date')
            general_monthly = get_agg_results(general_costs, 'cost_value')
            
            # 2. Critical Cost Parameters
            critical_costs = CriticalCostParameters.objects.filter(
                date__gte=start_date, 
                date__lt=end_date,
                is_monthly_total=False
            )
            critical_daily = critical_costs.values('date').annotate(
                daily_value=Sum('daily_cost')
            ).order_by('date')
            critical_monthly = get_agg_results(critical_costs, 'daily_cost')
            
            # 3. Manpower Costs
            manpower_costs = ManpowerCost.objects.filter(date__gte=start_date, date__lt=end_date)
            manpower_daily = manpower_costs.values('date').annotate(
                daily_value=Sum('total_cost')
            ).order_by('date')
            manpower_monthly = get_agg_results(manpower_costs, 'total_cost')
            
            # 4. Consumables and Waste Costs
            consumables_costs = ConsumablesAndWasteCosts.objects.filter(
                cost_date__gte=start_date, 
                cost_date__lt=end_date
            )
            consumables_daily = consumables_costs.values('cost_date').annotate(
                daily_value=Sum('total_cost')
            ).order_by('cost_date')
            consumables_monthly = get_agg_results(consumables_costs, 'total_cost')
            
            # 5. Dispatch and Miscellaneous Costs
            dispatch_costs = DispatchAndMiscCosts.objects.filter(
                cost_date__gte=start_date, 
                cost_date__lt=end_date
            )
            dispatch_daily = dispatch_costs.values('cost_date').annotate(
                daily_value=Sum('total_cost')
            ).order_by('cost_date')
            dispatch_monthly = get_agg_results(dispatch_costs, 'total_cost')
            
            # Calculate total costs
            total_monthly_costs = (
                general_monthly['value'] +
                critical_monthly['value'] +
                manpower_monthly['value'] +
                consumables_monthly['value'] +
                dispatch_monthly['value']
            )
            
            # Base response structure
            response_data = {
                'general_costs': {
                    'daily': list(general_daily),
                    'monthly': general_monthly
                },
                'critical_costs': {
                    'daily': list(critical_daily),
                    'monthly': critical_monthly
                },
                'manpower_costs': {
                    'daily': list(manpower_daily),
                    'monthly': manpower_monthly
                },
                'consumables_costs': {
                    'daily': list(consumables_daily),
                    'monthly': consumables_monthly
                },
                'dispatch_costs': {
                    'daily': list(dispatch_daily),
                    'monthly': dispatch_monthly
                },
                'total_monthly_costs': total_monthly_costs
            }
            
            # Add detailed breakdowns if requested
            if detail_level == 'detailed':
                # Critical Costs by category
                critical_daily_detail = critical_costs.values('date', 'cost_category').annotate(
                    daily_value=Sum('daily_cost')
                ).order_by('date', 'cost_category')
                
                critical_categories = critical_costs.values_list('cost_category', flat=True).distinct()
                critical_monthly_detail = {}
                
                for category in critical_categories:
                    critical_monthly_detail[category] = get_agg_results(
                        critical_costs.filter(cost_category=category),
                        'daily_cost'
                    )
                
                response_data['critical_costs'].update({
                    'daily_detail': list(critical_daily_detail),
                    'monthly_detail': critical_monthly_detail
                })
                
                # Manpower Costs by role type
                manpower_daily_detail = manpower_costs.values('date', 'role_type').annotate(
                    daily_value=Sum('total_cost')
                ).order_by('date', 'role_type')
                
                manpower_roles = manpower_costs.values_list('role_type', flat=True).distinct()
                manpower_monthly_detail = {}
                
                for role in manpower_roles:
                    manpower_monthly_detail[role] = get_agg_results(
                        manpower_costs.filter(role_type=role),
                        'total_cost'
                    )
                
                response_data['manpower_costs'].update({
                    'daily_detail': list(manpower_daily_detail),
                    'monthly_detail': manpower_monthly_detail
                })
                
                # Consumables by cost type
                consumables_daily_detail = consumables_costs.values('cost_date', 'cost_type').annotate(
                    daily_value=Sum('total_cost')
                ).order_by('cost_date', 'cost_type')
                
                consumables_types = consumables_costs.values_list('cost_type', flat=True).distinct()
                consumables_monthly_detail = {}
                
                for ctype in consumables_types:
                    consumables_monthly_detail[ctype] = get_agg_results(
                        consumables_costs.filter(cost_type=ctype),
                        'total_cost'
                    )
                
                response_data['consumables_costs'].update({
                    'daily_detail': list(consumables_daily_detail),
                    'monthly_detail': consumables_monthly_detail
                })
                
                # Dispatch by cost type
                dispatch_daily_detail = dispatch_costs.values('cost_date', 'cost_type').annotate(
                    daily_value=Sum('total_cost')
                ).order_by('cost_date', 'cost_type')
                
                dispatch_types = dispatch_costs.values_list('cost_type', flat=True).distinct()
                dispatch_monthly_detail = {}
                
                for dtype in dispatch_types:
                    dispatch_monthly_detail[dtype] = get_agg_results(
                        dispatch_costs.filter(cost_type=dtype),
                        'total_cost'
                    )
                
                response_data['dispatch_costs'].update({
                    'daily_detail': list(dispatch_daily_detail),
                    'monthly_detail': dispatch_monthly_detail
                })
            
            return JsonResponse(response_data)
            
        except Exception as e:
            print(f"Error in show_cost_analysis: {str(e)}")
            import traceback
            traceback.print_exc()
            return JsonResponse({'error': str(e)}, status=500)


    def show_daily_earnings_report(self, request):
        try:
            # Get month and year from request parameters
            month = request.GET.get('month')
            year = request.GET.get('year')
            
            if not month or not year:
                return JsonResponse({'error': 'Month and year parameters are required'}, status=400)
            
            try:
                month = int(month)
                year = int(year)
            except ValueError:
                return JsonResponse({'error': 'Month and year must be integers'}, status=400)
            
            # Create date range for the month
            start_date = datetime(year, month, 1).date()
            if month == 12:
                end_date = datetime(year + 1, 1, 1).date()
            else:
                end_date = datetime(year, month + 1, 1).date()
            
            # Initialize response data structure
            response_data = {
                'month': month,
                'year': year,
                'daily_reports': [],
                'monthly_summary': {
                    'total_sales': 0,
                    'total_costs': 0,
                    'total_profit': 0,
                    'margin_percentage': 0,
                    'breakdown': {
                        'sales_by_type': {},
                        'costs_by_category': {}
                    }
                }
            }

            # 1. Get all sales data for the month by type
            sales = Sale.objects.filter(sale_date__gte=start_date, sale_date__lt=end_date)
            
            # Sales by type (daily and monthly)
            sales_daily = sales.values('sale_date', 'related_production_type').annotate(
                daily_value=Sum('total_sales')
            ).order_by('sale_date', 'related_production_type')
            
            sales_monthly = sales.values('related_production_type').annotate(
                monthly_value=Sum('total_sales')
            ).order_by('related_production_type')
            
            # 2. Get all cost data for the month by category
            # General Costs
            general_costs = Cost.objects.filter(cost_date__gte=start_date, cost_date__lt=end_date)
            general_daily = general_costs.values('cost_date').annotate(
                daily_value=Sum('cost_value')
            ).order_by('cost_date')
            general_monthly = general_costs.aggregate(
                total_value=Sum('cost_value') or 0
            )
            
            # Critical Costs
            critical_costs = CriticalCostParameters.objects.filter(
                date__gte=start_date, 
                date__lt=end_date,
                is_monthly_total=False
            )
            critical_daily = critical_costs.values('date', 'cost_category').annotate(
                daily_value=Sum('daily_cost')
            ).order_by('date', 'cost_category')
            critical_monthly = critical_costs.values('cost_category').annotate(
                total_value=Sum('daily_cost') or 0
            ).order_by('cost_category')
            
            # Manpower Costs
            manpower_costs = ManpowerCost.objects.filter(date__gte=start_date, date__lt=end_date)
            manpower_daily = manpower_costs.values('date', 'role_type').annotate(
                daily_value=Sum('total_cost')
            ).order_by('date', 'role_type')
            manpower_monthly = manpower_costs.values('role_type').annotate(
                total_value=Sum('total_cost') or 0
            ).order_by('role_type')
            
            # Consumables Costs
            consumables_costs = ConsumablesAndWasteCosts.objects.filter(
                cost_date__gte=start_date, 
                cost_date__lt=end_date
            )
            consumables_daily = consumables_costs.values('cost_date', 'cost_type').annotate(
                daily_value=Sum('total_cost')
            ).order_by('cost_date', 'cost_type')
            consumables_monthly = consumables_costs.values('cost_type').annotate(
                total_value=Sum('total_cost') or 0
            ).order_by('cost_type')
            
            # Dispatch Costs
            dispatch_costs = DispatchAndMiscCosts.objects.filter(
                cost_date__gte=start_date, 
                cost_date__lt=end_date
            )
            dispatch_daily = dispatch_costs.values('cost_date', 'cost_type').annotate(
                daily_value=Sum('total_cost')
            ).order_by('cost_date', 'cost_type')
            dispatch_monthly = dispatch_costs.values('cost_type').annotate(
                total_value=Sum('total_cost') or 0
            ).order_by('cost_type')
            
            # 3. Get zinc savings data
            zinc_savings = ZincSavingMetrics.objects.filter(
                summary_date__gte=start_date, 
                summary_date__lt=end_date
            )
            zinc_daily = zinc_savings.values('summary_date').annotate(
                daily_value=Sum('zinc_saved_value')
            ).order_by('summary_date')
            zinc_monthly = zinc_savings.aggregate(
                total_value=Sum('zinc_saved_value') or 0
            )
            
            # 4. Create a date range for the month
            from datetime import timedelta
            date_list = []
            current_date = start_date
            while current_date < end_date:
                date_list.append(current_date)
                current_date += timedelta(days=1)
            
            # 5. Build daily reports
            for day in date_list:
                day_report = {
                    'date': day.strftime('%Y-%m-%d'),
                    'sales': {
                        'total': 0,
                        'by_type': {
                            'fabrication': 0,
                            'galvanizing': 0,
                            'solar': 0,
                            'other': 0
                        }
                    },
                    'costs': {
                        'total': 0,
                        'by_category': {
                            'general': 0,
                            'critical': {},
                            'manpower': {},
                            'consumables': {},
                            'dispatch': {}
                        }
                    },
                    'zinc_savings': 0,
                    'profit': 0,
                    'margin_percentage': 0
                }
                
                # Add sales data for this day
                day_sales = [s for s in sales_daily if s['sale_date'] == day]
                for sale in day_sales:
                    prod_type = (sale['related_production_type'] or '').lower()
                    if prod_type in ['fabrication', 'fab']:
                        target_type = 'fabrication'
                    elif prod_type in ['galvanizing', 'galv']:
                        target_type = 'galvanizing'
                    elif prod_type in ['solar']:
                        target_type = 'solar'
                    else:
                        target_type = 'other'
                    
                    value = float(sale['daily_value'] or 0)
                    day_report['sales']['by_type'][target_type] += value
                    day_report['sales']['total'] += value
                
                # Add general costs for this day
                day_general = next((g for g in general_daily if g['cost_date'] == day), None)
                if day_general:
                    day_report['costs']['by_category']['general'] = float(day_general['daily_value'] or 0)
                    day_report['costs']['total'] += day_report['costs']['by_category']['general']
                
                # Add critical costs for this day by category
                day_critical = [c for c in critical_daily if c['date'] == day]
                for cost in day_critical:
                    category = cost['cost_category'] or 'other'
                    value = float(cost['daily_value'] or 0)
                    day_report['costs']['by_category']['critical'][category] = value
                    day_report['costs']['total'] += value
                
                # Add manpower costs for this day by role
                day_manpower = [m for m in manpower_daily if m['date'] == day]
                for cost in day_manpower:
                    role = cost['role_type'] or 'other'
                    value = float(cost['daily_value'] or 0)
                    day_report['costs']['by_category']['manpower'][role] = value
                    day_report['costs']['total'] += value
                
                # Add consumables costs for this day by type
                day_consumables = [c for c in consumables_daily if c['cost_date'] == day]
                for cost in day_consumables:
                    cost_type = cost['cost_type'] or 'other'
                    value = float(cost['daily_value'] or 0)
                    day_report['costs']['by_category']['consumables'][cost_type] = value
                    day_report['costs']['total'] += value
                
                # Add dispatch costs for this day by type
                day_dispatch = [d for d in dispatch_daily if d['cost_date'] == day]
                for cost in day_dispatch:
                    cost_type = cost['cost_type'] or 'other'
                    value = float(cost['daily_value'] or 0)
                    day_report['costs']['by_category']['dispatch'][cost_type] = value
                    day_report['costs']['total'] += value
                
                # Add zinc savings for this day
                day_zinc = next((z for z in zinc_daily if z['summary_date'] == day), None)
                if day_zinc:
                    day_report['zinc_savings'] = float(day_zinc['daily_value'] or 0)
                
                # Calculate profit and margin
                day_report['profit'] = day_report['sales']['total'] - day_report['costs']['total'] + day_report['zinc_savings']
                if day_report['sales']['total'] > 0:
                    day_report['margin_percentage'] = round((day_report['profit'] / day_report['sales']['total']) * 100, 2)
                
                response_data['daily_reports'].append(day_report)
            
            # 6. Build monthly summary
            # Sales by type
            for sale in sales_monthly:
                prod_type = (sale['related_production_type'] or '').lower()
                if prod_type in ['fabrication', 'fab']:
                    target_type = 'fabrication'
                elif prod_type in ['galvanizing', 'galv']:
                    target_type = 'galvanizing'
                elif prod_type in ['solar']:
                    target_type = 'solar'
                else:
                    target_type = 'other'
                
                value = float(sale['monthly_value'] or 0)
                response_data['monthly_summary']['breakdown']['sales_by_type'][target_type] = value
                response_data['monthly_summary']['total_sales'] += value
            
            # Costs by category
            # General costs
            response_data['monthly_summary']['breakdown']['costs_by_category']['general'] = float(general_monthly['total_value'] or 0)
            response_data['monthly_summary']['total_costs'] += response_data['monthly_summary']['breakdown']['costs_by_category']['general']
            
            # Critical costs by category
            for cost in critical_monthly:
                category = cost['cost_category'] or 'other'
                value = float(cost['total_value'] or 0)
                response_data['monthly_summary']['breakdown']['costs_by_category']['critical'] = response_data['monthly_summary']['breakdown']['costs_by_category'].get('critical', {})
                response_data['monthly_summary']['breakdown']['costs_by_category']['critical'][category] = value
                response_data['monthly_summary']['total_costs'] += value
            
            # Manpower costs by role
            for cost in manpower_monthly:
                role = cost['role_type'] or 'other'
                value = float(cost['total_value'] or 0)
                response_data['monthly_summary']['breakdown']['costs_by_category']['manpower'] = response_data['monthly_summary']['breakdown']['costs_by_category'].get('manpower', {})
                response_data['monthly_summary']['breakdown']['costs_by_category']['manpower'][role] = value
                response_data['monthly_summary']['total_costs'] += value
            
            # Consumables costs by type
            for cost in consumables_monthly:
                cost_type = cost['cost_type'] or 'other'
                value = float(cost['total_value'] or 0)
                response_data['monthly_summary']['breakdown']['costs_by_category']['consumables'] = response_data['monthly_summary']['breakdown']['costs_by_category'].get('consumables', {})
                response_data['monthly_summary']['breakdown']['costs_by_category']['consumables'][cost_type] = value
                response_data['monthly_summary']['total_costs'] += value
            
            # Dispatch costs by type
            for cost in dispatch_monthly:
                cost_type = cost['cost_type'] or 'other'
                value = float(cost['total_value'] or 0)
                response_data['monthly_summary']['breakdown']['costs_by_category']['dispatch'] = response_data['monthly_summary']['breakdown']['costs_by_category'].get('dispatch', {})
                response_data['monthly_summary']['breakdown']['costs_by_category']['dispatch'][cost_type] = value
                response_data['monthly_summary']['total_costs'] += value
            
            # Zinc savings
            response_data['monthly_summary']['zinc_savings'] = float(zinc_monthly['total_value'] or 0)
            
            # Calculate total profit and margin
            response_data['monthly_summary']['total_profit'] = (
                response_data['monthly_summary']['total_sales'] - 
                response_data['monthly_summary']['total_costs'] + 
                response_data['monthly_summary']['zinc_savings']
            )
            
            if response_data['monthly_summary']['total_sales'] > 0:
                response_data['monthly_summary']['margin_percentage'] = round(
                    (response_data['monthly_summary']['total_profit'] / response_data['monthly_summary']['total_sales']) * 100, 
                    2
                )
            
            return JsonResponse(response_data)
            
        except Exception as e:
            print(f"Error in show_daily_earnings_report: {str(e)}")
            import traceback
            traceback.print_exc()
            return JsonResponse({'error': str(e)}, status=500)
        
    
    def show_daily_production_cost_report(self, request):
        try:
            # Get month and year from request parameters
            month = request.GET.get('month')
            year = request.GET.get('year')
            
            if not month or not year:
                return JsonResponse({'error': 'Month and year parameters are required'}, status=400)
            
            try:
                month = int(month)
                year = int(year)
            except ValueError:
                return JsonResponse({'error': 'Month and year must be integers'}, status=400)
            
            # Create date range for the month
            start_date = datetime(year, month, 1).date()
            if month == 12:
                end_date = datetime(year + 1, 1, 1).date()
            else:
                end_date = datetime(year, month + 1, 1).date()
            
            # Initialize response structure
            response_data = {
                'month': month,
                'year': year,
                'daily_reports': [],
                'monthly_totals': {
                    'production': {
                        'fabrication': {'quantity': 0, 'value': 0},
                        'galvanizing': {'quantity': 0, 'value': 0},
                        'solar': {'quantity': 0, 'value': 0},
                        'total': {'quantity': 0, 'value': 0}
                    },
                    'costs': {
                        'critical': 0,
                        'manpower': 0,
                        'dispatch': 0,
                        'consumables': 0,
                        'total': 0
                    }
                }
            }

            # 1. Get all production data
            # Fabrication Production
            fab_production = FabricationProduction.objects.filter(
                production_date__gte=start_date, 
                production_date__lt=end_date
            )
            fab_daily = fab_production.values('production_date').annotate(
                quantity=Sum(
                    Coalesce('own_steel_towers_quantity', Value(0)) + 
                    Coalesce('job_work_towers_quantity', Value(0)),
                    output_field=models.DecimalField()
                ),
                value=Sum(
                    Coalesce('own_steel_towers_value', Value(0)) + 
                    Coalesce('job_work_towers_value', Value(0)),
                    output_field=models.DecimalField()
                )
            ).order_by('production_date')
            
            fab_monthly = fab_production.aggregate(
                total_qty=Sum(
                    Coalesce('own_steel_towers_quantity', Value(0)) + 
                    Coalesce('job_work_towers_quantity', Value(0)),
                    output_field=models.DecimalField()
                ) or 0,
                total_value=Sum(
                    Coalesce('own_steel_towers_value', Value(0)) + 
                    Coalesce('job_work_towers_value', Value(0)),
                    output_field=models.DecimalField()
                ) or 0
            )
            
            # Galvanizing Production
            galva_production = GalvanizingProduction.objects.filter(
                production_date__gte=start_date, 
                production_date__lt=end_date
            )
            galva_daily = galva_production.values('production_date').annotate(
                quantity=Sum(
                    Coalesce('quantity_own_zinc', Value(0)) + 
                    Coalesce('quantity_job_work', Value(0)),
                    output_field=models.DecimalField()
                ),
                value=Sum(
                    Coalesce('value_own_zinc', Value(0)) + 
                    Coalesce('value_job_work', Value(0)),
                    output_field=models.DecimalField()
                )
            ).order_by('production_date')
            
            galva_monthly = galva_production.aggregate(
                total_qty=Sum(
                    Coalesce('quantity_own_zinc', Value(0)) + 
                    Coalesce('quantity_job_work', Value(0)),
                    output_field=models.DecimalField()
                ) or 0,
                total_value=Sum(
                    Coalesce('value_own_zinc', Value(0)) + 
                    Coalesce('value_job_work', Value(0)),
                    output_field=models.DecimalField()
                ) or 0
            )
            
            # Solar Production
            solar_production = SolarProduction.objects.filter(
                production_date__gte=start_date, 
                production_date__lt=end_date
            )
            solar_daily = solar_production.values('production_date').annotate(
                quantity=Sum(
                    Coalesce('own_steel_towers_quantity', Value(0)) + 
                    Coalesce('job_work_towers_quantity', Value(0)),
                    output_field=models.DecimalField()
                ),
                value=Sum(
                    Coalesce('own_steel_towers_value', Value(0)) + 
                    Coalesce('job_work_towers_value', Value(0)),
                    output_field=models.DecimalField()
                )
            ).order_by('production_date')
            
            solar_monthly = solar_production.aggregate(
                total_qty=Sum(
                    Coalesce('own_steel_towers_quantity', Value(0)) + 
                    Coalesce('job_work_towers_quantity', Value(0)),
                    output_field=models.DecimalField()
                ) or 0,
                total_value=Sum(
                    Coalesce('own_steel_towers_value', Value(0)) + 
                    Coalesce('job_work_towers_value', Value(0)),
                    output_field=models.DecimalField()
                ) or 0
            )
            
            # 2. Get all cost data
            # Critical Costs
            critical_costs = CriticalCostParameters.objects.filter(
                date__gte=start_date, 
                date__lt=end_date,
                is_monthly_total=False
            )
            critical_daily = critical_costs.values('date').annotate(
                value=Sum('daily_cost')
            ).order_by('date')
            critical_monthly = critical_costs.aggregate(
                total_value=Sum('daily_cost') or 0
            )
            
            # Manpower Costs
            manpower_costs = ManpowerCost.objects.filter(
                date__gte=start_date, 
                date__lt=end_date
            )
            manpower_daily = manpower_costs.values('date').annotate(
                value=Sum('total_cost')
            ).order_by('date')
            manpower_monthly = manpower_costs.aggregate(
                total_value=Sum('total_cost') or 0
            )
            
            # Dispatch Costs
            dispatch_costs = DispatchAndMiscCosts.objects.filter(
                cost_date__gte=start_date, 
                cost_date__lt=end_date
            )
            dispatch_daily = dispatch_costs.values('cost_date').annotate(
                value=Sum('total_cost')
            ).order_by('cost_date')
            dispatch_monthly = dispatch_costs.aggregate(
                total_value=Sum('total_cost') or 0
            )
            
            # Consumables Costs
            consumables_costs = ConsumablesAndWasteCosts.objects.filter(
                cost_date__gte=start_date, 
                cost_date__lt=end_date
            )
            consumables_daily = consumables_costs.values('cost_date').annotate(
                value=Sum('total_cost')
            ).order_by('cost_date')
            consumables_monthly = consumables_costs.aggregate(
                total_value=Sum('total_cost') or 0
            )
            
            # 3. Create a date range for the month
            from datetime import timedelta
            date_list = []
            current_date = start_date
            while current_date < end_date:
                date_list.append(current_date)
                current_date += timedelta(days=1)
            
            # 4. Build daily reports
            for day in date_list:
                day_report = {
                    'date': day.strftime('%Y-%m-%d'),
                    'production': {
                        'fabrication': {'quantity': 0, 'value': 0},
                        'galvanizing': {'quantity': 0, 'value': 0},
                        'solar': {'quantity': 0, 'value': 0},
                        'total': {'quantity': 0, 'value': 0}
                    },
                    'costs': {
                        'critical': 0,
                        'manpower': 0,
                        'dispatch': 0,
                        'consumables': 0,
                        'total': 0
                    }
                }
                
                # Add fabrication production for this day
                fab_day = next((f for f in fab_daily if f['production_date'] == day), None)
                if fab_day:
                    day_report['production']['fabrication']['quantity'] = float(fab_day['quantity'] or 0)
                    day_report['production']['fabrication']['value'] = float(fab_day['value'] or 0)
                    day_report['production']['total']['quantity'] += day_report['production']['fabrication']['quantity']
                    day_report['production']['total']['value'] += day_report['production']['fabrication']['value']
                
                # Add galvanizing production for this day
                galva_day = next((g for g in galva_daily if g['production_date'] == day), None)
                if galva_day:
                    day_report['production']['galvanizing']['quantity'] = float(galva_day['quantity'] or 0)
                    day_report['production']['galvanizing']['value'] = float(galva_day['value'] or 0)
                    day_report['production']['total']['quantity'] += day_report['production']['galvanizing']['quantity']
                    day_report['production']['total']['value'] += day_report['production']['galvanizing']['value']
                
                # Add solar production for this day
                solar_day = next((s for s in solar_daily if s['production_date'] == day), None)
                if solar_day:
                    day_report['production']['solar']['quantity'] = float(solar_day['quantity'] or 0)
                    day_report['production']['solar']['value'] = float(solar_day['value'] or 0)
                    day_report['production']['total']['quantity'] += day_report['production']['solar']['quantity']
                    day_report['production']['total']['value'] += day_report['production']['solar']['value']
                
                # Add critical costs for this day
                critical_day = next((c for c in critical_daily if c['date'] == day), None)
                if critical_day:
                    day_report['costs']['critical'] = float(critical_day['value'] or 0)
                    day_report['costs']['total'] += day_report['costs']['critical']
                
                # Add manpower costs for this day
                manpower_day = next((m for m in manpower_daily if m['date'] == day), None)
                if manpower_day:
                    day_report['costs']['manpower'] = float(manpower_day['value'] or 0)
                    day_report['costs']['total'] += day_report['costs']['manpower']
                
                # Add dispatch costs for this day
                dispatch_day = next((d for d in dispatch_daily if d['cost_date'] == day), None)
                if dispatch_day:
                    day_report['costs']['dispatch'] = float(dispatch_day['value'] or 0)
                    day_report['costs']['total'] += day_report['costs']['dispatch']
                
                # Add consumables costs for this day
                consumables_day = next((c for c in consumables_daily if c['cost_date'] == day), None)
                if consumables_day:
                    day_report['costs']['consumables'] = float(consumables_day['value'] or 0)
                    day_report['costs']['total'] += day_report['costs']['consumables']
                
                response_data['daily_reports'].append(day_report)
            
            # 5. Calculate monthly totals
            # Production totals
            response_data['monthly_totals']['production']['fabrication']['quantity'] = float(fab_monthly['total_qty'] or 0)
            response_data['monthly_totals']['production']['fabrication']['value'] = float(fab_monthly['total_value'] or 0)
            response_data['monthly_totals']['production']['galvanizing']['quantity'] = float(galva_monthly['total_qty'] or 0)
            response_data['monthly_totals']['production']['galvanizing']['value'] = float(galva_monthly['total_value'] or 0)
            response_data['monthly_totals']['production']['solar']['quantity'] = float(solar_monthly['total_qty'] or 0)
            response_data['monthly_totals']['production']['solar']['value'] = float(solar_monthly['total_value'] or 0)
            
            response_data['monthly_totals']['production']['total']['quantity'] = (
                response_data['monthly_totals']['production']['fabrication']['quantity'] +
                response_data['monthly_totals']['production']['galvanizing']['quantity'] +
                response_data['monthly_totals']['production']['solar']['quantity']
            )
            response_data['monthly_totals']['production']['total']['value'] = (
                response_data['monthly_totals']['production']['fabrication']['value'] +
                response_data['monthly_totals']['production']['galvanizing']['value'] +
                response_data['monthly_totals']['production']['solar']['value']
            )
            
            # Cost totals
            response_data['monthly_totals']['costs']['critical'] = float(critical_monthly['total_value'] or 0)
            response_data['monthly_totals']['costs']['manpower'] = float(manpower_monthly['total_value'] or 0)
            response_data['monthly_totals']['costs']['dispatch'] = float(dispatch_monthly['total_value'] or 0)
            response_data['monthly_totals']['costs']['consumables'] = float(consumables_monthly['total_value'] or 0)
            
            response_data['monthly_totals']['costs']['total'] = (
                response_data['monthly_totals']['costs']['critical'] +
                response_data['monthly_totals']['costs']['manpower'] +
                response_data['monthly_totals']['costs']['dispatch'] +
                response_data['monthly_totals']['costs']['consumables']
            )
            
            return JsonResponse(response_data)
            
        except Exception as e:
            print(f"Error in show_daily_production_cost_report: {str(e)}")
            import traceback
            traceback.print_exc()
            return JsonResponse({'error': str(e)}, status=500)