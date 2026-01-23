from mis_app.serializers.sale_serializers import SaleSerializer
from mis_app.models import *
from rest_framework import viewsets, permissions
from django.http import JsonResponse
from django.db.models import Sum, F, FloatField, ExpressionWrapper
from django.db.models.functions import TruncDate
from django.utils.timezone import now
from calendar import monthrange
from datetime import date, timedelta

class SaleViewSet(viewsets.ModelViewSet):
    serializer_class = SaleSerializer

    def get_sales(self, request):
      """
      Retrieve sales with totals.
      """
      try:
          sales = Sale.objects.all()
  
          total_qty = sales.aggregate(total=Sum('tonnage'))['total'] or 0
          total_value = sales.aggregate(total=Sum('total_sales'))['total'] or 0
          rate_for_month = total_value / total_qty if total_qty else 0
  
          serializer = self.get_serializer(sales, many=True)
  
          return JsonResponse({
              "success": True,
              "message": "Sales fetched successfully.",
              "totals": {
                  "total_quantity_mt": total_qty,
                  "average_rate_per_mt": round(rate_for_month, 2),
                  "total_value": total_value
              },
              "data": serializer.data
          }, status=200)
  
      except Exception as e:
          return JsonResponse({
              "success": False,
              "message": "Error retrieving sales data.",
              "errors": str(e)
          }, status=500)

    def add_sale(self, request):
        """
        Add a new sale.
        """
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return JsonResponse({'message': 'Sale added successfully', 'data': serializer.data}, status=201)
        except Exception as e:
            return JsonResponse({'error': f'An error occurred: {str(e)}'}, status=400)

    def update_sale(self, request):
        """
        Update an existing sale.
        """
        try:
            # Fetch primary key from GET data
            pk = request.data.GET.get('pk')
            if not pk:
                return JsonResponse({'error': 'Primary key (pk) not provided'}, status=400)

            # Fetch the sale using the primary key
            sale = Sale.objects.get(pk=pk)
            serializer = self.get_serializer(sale, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return JsonResponse({'message': 'Sale updated successfully', 'data': serializer.data}, status=200)
        except Sale.DoesNotExist:
            return JsonResponse({'error': 'Sale not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': f'An error occurred: {str(e)}'}, status=400)

    def delete_sale(self, request, pk=None):
        """
        Delete a sale.
        """
        try:
            sale = Sale.objects.get(pk=pk)
            sale.delete()
            return JsonResponse({'message': 'Sale deleted successfully'}, status=204)
        except Sale.DoesNotExist:
            return JsonResponse({'error': 'Sale not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': f'An error occurred: {str(e)}'}, status=500)

    def get_sales_tonnage(self, request):
        """
        Retrieve sales tonnage.
        """
        try:
            sales = Sale.objects.all()
            total_tonnage = sum(sale.tonnage for sale in sales)
            return JsonResponse({'message': 'Total tonnage retrieved successfully', 'total_tonnage': total_tonnage}, status=200)
        except Exception as e:
            return JsonResponse({'error': f'An error occurred: {str(e)}'}, status=500)

    def get_earnings(self, request):
        """
        Retrieve sales earnings.
        """
        try:
            sales = Sale.objects.all()
            total_earnings = sum(sale.earnings for sale in sales)
            return JsonResponse({'message': 'Total earnings retrieved successfully', 'total_earnings': total_earnings}, status=200)
        except Exception as e:
            return JsonResponse({'error': f'An error occurred: {str(e)}'}, status=500)
            
            
    def get_date_range_from_request(self, request):
        try:
            month = int(request.GET.get("month", now().month))
            year = int(request.GET.get("year", now().year))
            start_date = date(year, month, 1)
            end_date = date(year, month, monthrange(year, month)[1])
            return start_date, end_date
        except Exception:
            today = now().date()
            return today.replace(day=1), today

    def sales_cost_ratios(self,request):
        # Retrieve two ratios -> cumulative and daily 
        # sales/cost
        try:
            start_date, end_date = self.get_date_range_from_request(request)

            sales = Sale.objects.filter(sale_date__range=(start_date, end_date))
            costs = Cost.objects.filter(cost_date__range=(start_date, end_date))

            total_sales = sales.aggregate(total=Sum('total_sales'))['total'] or 0
            total_cost = costs.aggregate(total=Sum('cost_value'))['total'] or 0
            cumulative_ratio = round(total_sales / total_cost, 2) if total_cost else 0

            sales_daily = sales.annotate(day=TruncDate('sale_date')).values('day').annotate(total_sales=Sum('total_sales')).order_by('day')
            cost_daily = costs.annotate(day=TruncDate('cost_date')).values('day').annotate(total_cost=Sum('cost_value')).order_by('day')

            cost_dict = {entry['day']: entry['total_cost'] for entry in cost_daily}
            daily_ratios = []

            for entry in sales_daily:
                day = entry['day']
                day_sales = entry['total_sales']
                day_cost = cost_dict.get(day, 0)
                ratio = round(day_sales / day_cost, 2) if day_cost else 0
                daily_ratios.append({
                    'date': day,
                    'sales': day_sales,
                    'cost': day_cost,
                    'ratio': ratio
                })

            return JsonResponse({
                "success": True,
                "message": "Sales-to-cost ratios calculated successfully.",
                "cumulative_ratio": cumulative_ratio,
                "daily_ratios": daily_ratios
            }, status=200)

        except Exception as e:
            return JsonResponse({'success': False, 'error': f'An error occurred: {str(e)}'}, status=500)
        

    def sales_earnings_ratios(self,request):
        # retrieve two ratios -> cumulative and daily
        # earnings/cost
        try:
            start_date, end_date = self.get_date_range_from_request(request)

            sales = Sale.objects.filter(sale_date__range=(start_date, end_date))
            costs = Cost.objects.filter(cost_date__range=(start_date, end_date))

            total_sales = sales.aggregate(total=Sum('total_sales'))['total'] or 0
            total_cost = costs.aggregate(total=Sum('cost_value'))['total'] or 0
            earnings = total_sales - total_cost
            cumulative_ratio = round(earnings / total_cost, 2) if total_cost else 0

            sales_daily = sales.annotate(day=TruncDate('sale_date')).values('day').annotate(total_sales=Sum('total_sales')).order_by('day')
            cost_daily = costs.annotate(day=TruncDate('cost_date')).values('day').annotate(total_cost=Sum('cost_value')).order_by('day')

            cost_dict = {entry['day']: entry['total_cost'] for entry in cost_daily}
            daily_ratios = []

            for entry in sales_daily:
                day = entry['day']
                day_sales = entry['total_sales']
                day_cost = cost_dict.get(day, 0)
                day_earnings = day_sales - day_cost
                ratio = round(day_earnings / day_cost, 2) if day_cost else 0
                daily_ratios.append({
                    'date': day,
                    'sales': day_sales,
                    'cost': day_cost,
                    'earnings': day_earnings,
                    'ratio': ratio
                })

            return JsonResponse({
                "success": True,
                "message": "Earnings-to-cost ratios calculated successfully.",
                "totals": {
                    "sales": total_sales,
                    "cost": total_cost,
                    "earnings": earnings
                },
                "cumulative_ratio": cumulative_ratio,
                "daily_ratios": daily_ratios
            }, status=200)

        except Exception as e:
            return JsonResponse({'success': False, 'error': f'An error occurred: {str(e)}'}, status=500)
        

    def sales_tonnage_ratio(self, request):
      """
      Calculate sales tonnage metrics - total, daily, and by department
      """
      try:
          start_date, end_date = self.get_date_range_from_request(request)
  
          sales = Sale.objects.filter(sale_date__range=(start_date, end_date))
  
          # Total tonnage
          total_tonnage = sales.aggregate(total=Sum('tonnage'))['total'] or 0
  
          # Daily tonnage
          daily_tonnage = sales.annotate(day=TruncDate('sale_date')).values('day').annotate(
              tonnage=Sum('tonnage')
          ).order_by('day')
  
          # Tonnage by department
          dept_tonnage = sales.values('department__name').annotate(
              tonnage=Sum('tonnage')
          ).order_by('-tonnage')
  
          return JsonResponse({
              "success": True,
              "message": "Sales tonnage metrics calculated successfully.",
              "totals": {
                  "total_tonnage": total_tonnage,
                  "average_per_day": round(total_tonnage / len(daily_tonnage), 2) if daily_tonnage else 0
              },
              "daily_tonnage": list(daily_tonnage),
              "department_tonnage": list(dept_tonnage)
          }, status=200)
  
      except Exception as e:
          return JsonResponse({'success': False, 'error': f'An error occurred: {str(e)}'}, status=500)

    def cost_earnings_ratio(self, request):
        """
        Calculate cost-to-earnings ratio (how much cost per earning) - both cumulative and daily
        """
        try:
            start_date, end_date = self.get_date_range_from_request(request)
    
            sales = Sale.objects.filter(sale_date__range=(start_date, end_date))
            costs = Cost.objects.filter(cost_date__range=(start_date, end_date))
    
            # Calculate totals
            total_sales = sales.aggregate(total=Sum('total_sales'))['total'] or 0
            total_cost = costs.aggregate(total=Sum('cost_value'))['total'] or 0
            total_earnings = total_sales - total_cost
            cumulative_ratio = round(total_cost / total_earnings, 2) if total_earnings else 0
    
            # Get daily sales
            sales_daily = sales.annotate(day=TruncDate('sale_date')).values('day').annotate(
                total_sales=Sum('total_sales')
            ).order_by('day')
    
            # Get daily costs
            cost_daily = costs.annotate(day=TruncDate('cost_date')).values('day').annotate(
                total_cost=Sum('cost_value')
            ).order_by('day')
    
            # Create a dictionary for daily costs
            cost_dict = {entry['day']: entry['total_cost'] for entry in cost_daily}
    
            # Calculate daily ratios
            daily_ratios = []
            for entry in sales_daily:
                day = entry['day']
                day_sales = entry['total_sales']
                day_cost = cost_dict.get(day, 0)
                day_earnings = day_sales - day_cost
                ratio = round(day_cost / day_earnings, 2) if day_earnings else 0
                
                daily_ratios.append({
                    'date': day,
                    'sales': day_sales,
                    'cost': day_cost,
                    'earnings': day_earnings,
                    'ratio': ratio
                })
    
            return JsonResponse({
                "success": True,
                "message": "Cost-to-earnings ratios calculated successfully.",
                "totals": {
                    "total_sales": total_sales,
                    "total_cost": total_cost,
                    "total_earnings": total_earnings,
                    "cumulative_ratio": cumulative_ratio
                },
                "daily_ratios": daily_ratios
            }, status=200)
    
        except Exception as e:
            return JsonResponse({'success': False, 'error': f'An error occurred: {str(e)}'}, status=500)
    
    def revenue(self, request):
        """
        Calculate revenue metrics - total, daily, and by department
        """
        try:
            start_date, end_date = self.get_date_range_from_request(request)
    
            sales = Sale.objects.filter(sale_date__range=(start_date, end_date))
    
            # Total revenue
            total_revenue = sales.aggregate(total=Sum('total_sales'))['total'] or 0
    
            # Daily revenue
            daily_revenue = sales.annotate(day=TruncDate('sale_date')).values('day').annotate(
                revenue=Sum('total_sales')
            ).order_by('day')
    
            # Revenue by department
            dept_revenue = sales.values('department__name').annotate(
                revenue=Sum('total_sales')
            ).order_by('-revenue')
    
            # Calculate cumulative daily revenue
            cumulative_revenue = 0
            daily_with_cumulative = []
            for day in daily_revenue:
                cumulative_revenue += day['revenue']
                daily_with_cumulative.append({
                    'date': day['day'],
                    'daily_revenue': day['revenue'],
                    'cumulative_revenue': cumulative_revenue
                })
    
            return JsonResponse({
                "success": True,
                "message": "Revenue metrics calculated successfully.",
                "totals": {
                    "total_revenue": total_revenue,
                    "average_daily_revenue": round(total_revenue / len(daily_revenue), 2) if daily_revenue else 0
                },
                "daily_revenue": daily_with_cumulative,
                "department_revenue": list(dept_revenue)
            }, status=200)
    
        except Exception as e:
            return JsonResponse({'success': False, 'error': f'An error occurred: {str(e)}'}, status=500)