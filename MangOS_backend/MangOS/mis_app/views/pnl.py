from mis_app.models import ProfitLossSummary
from mis_app.serializers.PNL_serializers import ProfitLossSummarySerializer
from django.http import JsonResponse
from rest_framework import viewsets, status
from django.db import models
from django.db.models import Sum


class ProfitLossSummaryViewSet(viewsets.ModelViewSet):
    serializer_class = ProfitLossSummarySerializer

    def get_Profit_Loss_Summary(self, request):
        try:
            # Get the ProfitLossSummary data from the database
            profit_loss_summary = ProfitLossSummary.objects.all()
            serializer = self.get_serializer(profit_loss_summary, many=True)
            return JsonResponse({'message': 'Profit Loss Summary fetched successfully', 'data': serializer.data}, status=status.HTTP_200_OK)
        except models.ObjectDoesNotExist:
            return JsonResponse({"error": "ProfitLossSummary not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def add_Profit_Loss_Summary(self, request):
        try:
            # Create a new ProfitLossSummary instance
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({'message': 'Profit Loss Summary created successfully', 'data': serializer.data}, status=status.HTTP_201_CREATED)
            return JsonResponse({'error': 'Invalid data', 'details': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def update_Profit_Loss_Summary(self, request, pk=None):
        try:
            # Update an existing ProfitLossSummary instance
            profit_loss_summary = self.get_object(pk)
            serializer = self.get_serializer(profit_loss_summary, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({'message': 'Profit Loss Summary updated successfully', 'data': serializer.data}, status=status.HTTP_200_OK)
            return JsonResponse({'error': 'Invalid data', 'details': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except models.ObjectDoesNotExist:
            return JsonResponse({"error": "ProfitLossSummary not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def delete_Profit_Loss_Summary(self, request, pk=None):
        try:
            # Delete a ProfitLossSummary instance
            profit_loss_summary = self.get_object(pk)
            profit_loss_summary.delete()
            return JsonResponse({"message": "ProfitLossSummary deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except models.ObjectDoesNotExist:
            return JsonResponse({"error": "ProfitLossSummary not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def get_by_date(self, request, *args, **kwargs):
        """
        Get ProfitLossSummary by date
        """
        try:
            date = request.GET.get('summary_date')
            if not date:
                return JsonResponse({"error": "Date parameter is required"}, status=status.HTTP_400_BAD_REQUEST)
            
            profit_loss_summary = ProfitLossSummary.objects.filter(summary_date=date)
            if profit_loss_summary.exists():
                serializer = self.get_serializer(profit_loss_summary, many=True)
                return JsonResponse({'message': 'Profit Loss Summary fetched successfully', 'data': serializer.data}, status=status.HTTP_200_OK)
            return JsonResponse({"error": "No Profit Loss Summary found for the given date"}, status=status.HTTP_404_NOT_FOUND)
        except models.ObjectDoesNotExist:
            return JsonResponse({"error": "ProfitLossSummary not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)  
            
            
    def get_earnings(self, request):
      """
      Calculate daily earnings with total sales, adjusted costs (including zinc savings),
      and profit metrics for each day
      """
      try:
          # Get date range parameters (optional)
          start_date = request.GET.get('start_date')
          end_date = request.GET.get('end_date')
          
          # Base query
          earnings_data = ProfitLossSummary.objects.all()
          
          # Apply date filters if provided
          if start_date and end_date:
              earnings_data = earnings_data.filter(
                  summary_date__range=[start_date, end_date]
              )
          elif start_date:
              earnings_data = earnings_data.filter(
                  summary_date__gte=start_date
              )
          elif end_date:
              earnings_data = earnings_data.filter(
                  summary_date__lte=end_date
              )
          
          # Group by day and annotate with daily totals
          daily_data = earnings_data.values('summary_date').annotate(
              daily_sales=Sum('total_sale_value'),
              daily_costs=Sum('total_cost'),
              daily_zinc_savings=Sum('zinc_saved_value'),
              daily_profit=Sum('profit_or_loss')
          ).order_by('summary_date')
          
          # Calculate daily metrics
          daily_earnings = []
          for day in daily_data:
              sales = day['daily_sales'] or 0
              costs = day['daily_costs'] or 0
              zinc_savings = day['daily_zinc_savings'] or 0
              profit = day['daily_profit'] or 0
              
              adjusted_costs = costs - zinc_savings
              margin_percentage = (profit / sales * 100) if sales > 0 else 0
              
              daily_earnings.append({
                  'date': day['summary_date'],
                  'total_sales': sales,
                  'total_costs': costs,
                  'zinc_savings': zinc_savings,
                  'adjusted_costs': adjusted_costs,
                  'total_profit': profit,
                  'margin_percentage': round(margin_percentage, 2)
              })
          
          # Also calculate totals if needed
          aggregates = earnings_data.aggregate(
              total_sales=Sum('total_sale_value'),
              total_costs=Sum('total_cost'),
              zinc_savings=Sum('zinc_saved_value'),
              total_profit=Sum('profit_or_loss')
          )
          
          response_data = {
              'daily_earnings': daily_earnings,
              'totals': {
                  'total_sales': aggregates['total_sales'] or 0,
                  'total_costs': aggregates['total_costs'] or 0,
                  'zinc_savings': aggregates['zinc_savings'] or 0,
                  'adjusted_costs': (aggregates['total_costs'] or 0) - (aggregates['zinc_savings'] or 0),
                  'total_profit': aggregates['total_profit'] or 0,
                  'margin_percentage': round(
                      (aggregates['total_profit'] / aggregates['total_sales'] * 100) 
                      if aggregates['total_sales'] and aggregates['total_sales'] > 0 
                      else 0, 
                      2
                  )
              },
              'start_date': start_date,
              'end_date': end_date
          }
          
          return JsonResponse({
              'message': 'Daily earnings calculated successfully',
              'data': response_data
          }, status=status.HTTP_200_OK)
          
      except Exception as e:
          return JsonResponse(
              {"error": f"An error occurred: {str(e)}"}, 
              status=status.HTTP_500_INTERNAL_SERVER_ERROR
          )
