 
 
from rest_framework import viewsets, status
from rest_framework.response import Response
from setup.models import Sales, Cost
from setup.serializers.sales_serializers import SalesSerializer, CostSerializer
from collections import defaultdict
from datetime import datetime
from django.db.models import Sum, F, FloatField
from django.db.models.functions import TruncDay
from django.http import JsonResponse
import datetime
from django.utils.timezone import localdate
from datetime import date


class SalesViewSet(viewsets.ModelViewSet):
    queryset = Sales.objects.all()
    serializer_class = SalesSerializer

    def list(self, request, *args, **kwargs):
        from_date = request.GET.get('from_date')
        to_date = request.GET.get('to_date')

        sales_qs = Sales.objects.all()
        cost_qs = Cost.objects.all()

        result = []
        current_id = 1

        earnings_data_by_day = defaultdict(lambda: {"sales": 0, "cost": 0, "qty": 0})

        def process_data(qs, header_name, color=None, category=None):
            nonlocal current_id
            sub_items = []
            header_total_qty = 0
            header_total_amount = 0
            unit_rate = 0

            grouped = defaultdict(lambda: defaultdict(list))

            for obj in qs:
                grouped[obj.type][obj.date.strftime('%d')].append(obj)
                
            def extract_qty(unit_str):
                try:
                    return float(unit_str.split()[0])
                except:
                    return 0.0    
                

            for sub_type, days in grouped.items():
                daily_values = {}
                cumulative_qty = 0
                cumulative_amt = 0
                for day, entries in days.items():
                    total_qty = sum(extract_qty(e.unit) for e in entries)
                    rate = float(entries[0].rate)
                    amount = total_qty * rate

                    daily_values[day] = {
                        "quantity": f"{total_qty:.1f} MT",
                        "amount": f"?{amount / 100000:.1f} L"
                    }

                    cumulative_qty += total_qty
                    cumulative_amt += amount
                    unit_rate = rate

                    # Collect earnings data
                    if header_name == "Sales":
                        earnings_data_by_day[day]["sales"] += amount
                        earnings_data_by_day[day]["qty"] += total_qty
                    elif header_name == "Cost":
                        earnings_data_by_day[day]["cost"] += amount

                sub_items.append({
                    "id": current_id + 1,
                    "type": "subitem",
                    "activity": sub_type,
                    "qty": cumulative_qty,
                    "rate": unit_rate,
                    "cumulativeValues": int(cumulative_amt),
                    "color": color or "",
                    "category": category or header_name,
                    "dailyValues": daily_values
                })
                current_id += 1
                header_total_qty += cumulative_qty
                header_total_amount += cumulative_amt

            # Add header
            result.append({
                "id": current_id,
                "type": "header",
                "activity": header_name,
                "qty": header_total_qty,
                "rate": unit_rate,
                "cumulativeValues": int(header_total_amount),
                "category": category or header_name,
                "dailyValues": {}  # Optional
            })
            current_id += 1

            result.extend(sub_items)

        # SALES
        process_data(sales_qs, "Sales", color="blue", category="Sales")

        # COST
        process_data(cost_qs, "Cost", color="orange", category="Cost")

        # EARNINGS
        # Add header
        total_sales = sum(v["sales"] for v in earnings_data_by_day.values())
        total_cost = sum(v["cost"] for v in earnings_data_by_day.values())
        total_profit = total_sales - total_cost
        total_qty = sum(v["qty"] for v in earnings_data_by_day.values())

        result.append({
            "id": current_id,
            "type": "header",
            "activity": "Earnings",
            "qty": total_qty,
            "rate": 0,
            "cumulativeValues": int(total_profit),
            "category": "Earnings",
            "dailyValues": {}
        })
        current_id += 1

        # Subitem 1: Total Sales
        sales_daily = {}
        for day, data in earnings_data_by_day.items():
            sales_daily[day] = {
                "quantity": f"{data['qty']:.1f} MT",
                "amount": f"?{data['sales'] / 100000:.1f} L"
            }

        result.append({
            "id": current_id,
            "type": "subitem",
            "activity": "Total sales",
            "qty": total_qty,
            "rate": 0,
            "cumulativeValues": int(total_sales),
            "color": "blue",
            "category": "Earnings",
            "dailyValues": sales_daily
        })
        current_id += 1

        # Subitem 2: Total Cost
        cost_daily = {}
        for day, data in earnings_data_by_day.items():
            cost_daily[day] = {
                "quantity": f"-",
                "amount": f"?{data['cost'] / 100000:.1f} L"
            }

        result.append({
            "id": current_id,
            "type": "subitem",
            "activity": "Total cost",
            "qty": 0,
            "rate": 0,
            "cumulativeValues": int(total_cost),
            "color": "orange",
            "category": "Earnings",
            "dailyValues": cost_daily
        })
        current_id += 1

        # Subitem 3: Profitability
        profit_daily = {}
        for day, data in earnings_data_by_day.items():
            profit = data["sales"] - data["cost"]
            profit_daily[day] = {
                "quantity": "-",
                "amount": f"?{profit / 100000:.1f} L"
            }

        result.append({
            "id": current_id,
            "type": "subitem",
            "activity": "Profitability",
            "qty": 0,
            "rate": 0,
            "cumulativeValues": int(total_profit),
            "color": "green",
            "category": "Earnings",
            "dailyValues": profit_daily
        })

        return Response({
            "status": True,
            "message": "Sales list fetched successfully.",
            "data": result
        })
        
        
        
        

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({
            "status": True,
            "message": "Sale record fetched successfully.",
            "data": serializer.data
        })
        
        
        
        

    def create(self, request, *args, **kwargs):
    
        sale_type = request.data.get('type')
        sale_date = request.data.get('date')
        new_rate = request.data.get('rate')
    
        if not sale_type or not sale_date or new_rate is None:
            return Response({
                "status": False,
                "message": "Missing required fields: 'type', 'date', or 'rate'."
            }, status=status.HTTP_400_BAD_REQUEST)
    
        # Check if entry with same type and date exists
        existing_sale = Sales.objects.filter(type=sale_type, date=sale_date).first()
        if existing_sale:
            # Update only the rate
            existing_sale.rate = new_rate
            existing_sale.save()
            serializer = self.get_serializer(existing_sale)
            return Response({
                "status": True,
                "message": f"Rate updated for '{sale_type}' on date '{sale_date}'.",
                "data": serializer.data
            }, status=status.HTTP_200_OK)
    
        # Else, create a new entry
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "status": True,
                "message": "Sale created successfully.",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
    
        return Response({
            "status": False,
            "message": "Validation failed.",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
        
        
         
        
        

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "status": True,
                "message": "Sale updated successfully.",
                "data": serializer.data
            })
        return Response({
            "status": False,
            "message": "Update failed.",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
        
        
        
        
        

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({
            "status": True,
            "message": "Sale deleted successfully."
        }, status=status.HTTP_204_NO_CONTENT)
        
        
        
        
        
        
    def get_sales_report(self,request):
    
    
        sales_qs = Sales.objects.all()

        grouped = {}
        total_qty = 0.0
        total_amt = 0.0
        daily_totals = {}
    
        for sale in sales_qs:
            sale_type = sale.type
            day = sale.date.strftime("%d")
            qty = float(sale.quantity)
            rate = float(sale.rate)
            amt = qty * rate
    
            # Group individual types
            if sale_type not in grouped:
                grouped[sale_type] = {
                    "id": len(grouped) + 1,
                    "type": sale_type,
                    "qty": 0.0,
                    "rate": rate,
                    "unit": sale.unit,
                    "rate_unit": sale.rate_unit,
                    "cumulativeValue": 0.0,
                    "daily": {}
                }
    
            grouped[sale_type]["qty"] += qty
            grouped[sale_type]["cumulativeValue"] += amt
    
            if day not in grouped[sale_type]["daily"]:
                grouped[sale_type]["daily"][day] = {"qty": 0.0, "amt": 0.0}
            grouped[sale_type]["daily"][day]["qty"] += qty
            grouped[sale_type]["daily"][day]["amt"] += amt
    
            # Add to overall totals
            total_qty += qty
            total_amt += amt
    
            if day not in daily_totals:
                daily_totals[day] = {"qty": 0.0, "amt": 0.0}
            daily_totals[day]["qty"] += qty
            daily_totals[day]["amt"] += amt
    
        # Format individual groups
        for val in grouped.values():
            val["cumulativeValue"] = f"{round(val['cumulativeValue'], 2)}"
            for d in val["daily"].values():
                d["amt"] = f"{round(d['amt'], 2)}"
    
        # Prepare overall sales summary
        total_rate = round(total_amt / total_qty, 2) if total_qty else 0.0
    
        sales_summary = {
            "id": 0,
            "type": "Sales",
            "qty": round(total_qty, 1),
            "rate": total_rate,
            "unit": "MT",
            "rate_unit": "L",
            "cumulativeValue": f"{round(total_amt, 2)}",
            "daily": {
                day: {
                    "qty": round(daily_totals[day]["qty"], 1),
                    "amt": f"{round(daily_totals[day]["amt"], 2)}"
                }
                for day in sorted(daily_totals.keys())
            }
        }
    
        return JsonResponse({
            "status": True,
            "message": "Sales report fetched successfully.",
            "data": list(grouped.values()),
            "total": sales_summary
        })
    
    
    
    
    
    
    
       
        
        


class CostViewSet(viewsets.ModelViewSet):
    queryset = Cost.objects.all()
    serializer_class = CostSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            "status": True,
            "message": "Costs list fetched successfully.",
            "data": serializer.data
        })

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({
            "status": True,
            "message": "Cost record fetched successfully.",
            "data": serializer.data
        })

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "status": True,
                "message": "Cost created successfully.",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "status": False,
            "message": "Validation failed.",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "status": True,
                "message": "Cost updated successfully.",
                "data": serializer.data
            })
        return Response({
            "status": False,
            "message": "Update failed.",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({
            "status": True,
            "message": "Cost deleted successfully."
        }, status=status.HTTP_204_NO_CONTENT) 
        
        
        
        
        
    def get_cost_report(self,request):
    
        cost_qs = Cost.objects.all()
        grouped = {}
    
        total_qty = 0.0
        total_amt = 0.0
        daily_total = defaultdict(lambda: {"qty": 0.0, "amt": 0.0})
    
        for cost in cost_qs:
            cost_type = cost.type
            day = cost.date.strftime("%d")
            qty = float(cost.quantity)
            rate = float(cost.rate)
            amt = qty * rate
    
            if cost_type not in grouped:
                grouped[cost_type] = {
                    "id": len(grouped) + 1,
                    "type": cost_type,
                    "qty": 0.0,
                    "rate": rate,
                    "unit": cost.unit,
                    "rate_unit": cost.rate_unit,
                    "cumulativeValue": 0.0,
                    "daily": {}
                }
    
            grouped[cost_type]["qty"] += qty
            grouped[cost_type]["cumulativeValue"] += amt
    
            if day not in grouped[cost_type]["daily"]:
                grouped[cost_type]["daily"][day] = {"qty": 0.0, "amt": 0.0}
            grouped[cost_type]["daily"][day]["qty"] += qty
            grouped[cost_type]["daily"][day]["amt"] += amt
    
            # Overall totals
            total_qty += qty
            total_amt += amt
            daily_total[day]["qty"] += qty
            daily_total[day]["amt"] += amt
    
        # Format individual group values
        for val in grouped.values():
            val["cumulativeValue"] = f"{round(val['cumulativeValue'], 2)}"
            for d in val["daily"].values():
                d["amt"] = f"{round(d['amt'], 2)}"
    
        # Calculate total rate
        total_rate = round(total_amt / total_qty, 2) if total_qty else 0.0
    
        # Prepare total object
        cost_summary = {
            "id": 0,
            "type": "Cost",
            "qty": round(total_qty, 1),
            "rate": total_rate,
            "unit": "MT",
            "rate_unit": "L",
            "cumulativeValue": f"{round(total_amt, 2)}",
            "daily": {
                day: {
                    "qty": round(d["qty"], 1),
                    "amt": f"{round(d['amt'], 2)}"
                } for day, d in sorted(daily_total.items())
            }
        }
    
        return JsonResponse({
            "status": True,
            "message": "Cost report fetched successfully.",
            "data": list(grouped.values()),
            "total": cost_summary
        })
    
    
    
    
    
      
        
        
        
        
        
class EarningViewSet(viewsets.ModelViewSet):

    def get_earnings_report(self,request):
    
        sales_qs = Sales.objects.all()
        cost_qs = Cost.objects.all()
    
        sales_by_day = defaultdict(lambda: {"qty": 0.0, "amt": 0.0})
        cost_by_day = defaultdict(lambda: {"qty": 0.0, "amt": 0.0})
    
        total_sales_amt = 0.0
        total_cost_amt = 0.0
        total_qty = 0.0
    
        for s in sales_qs:
            day = s.date.strftime("%d")
            qty = float(s.quantity)
            rate = float(s.rate)
            amt = qty * rate
            sales_by_day[day]["qty"] += qty
            sales_by_day[day]["amt"] += amt
            total_sales_amt += amt
            total_qty += qty
    
        for c in cost_qs:
            day = c.date.strftime("%d")
            qty = float(c.quantity)
            rate = float(c.rate)
            amt = qty * rate
            cost_by_day[day]["qty"] += qty
            cost_by_day[day]["amt"] += amt
            total_cost_amt += amt
    
        profitability_amt = total_sales_amt - total_cost_amt
        profitability_rate = round(profitability_amt / total_qty, 2) if total_qty else 0.0
    
        all_days = sorted(set(sales_by_day.keys()) | set(cost_by_day.keys()))
    
        profit_by_day = {}
        for day in all_days:
            sale_amt = sales_by_day.get(day, {}).get("amt", 0.0)
            cost_amt = cost_by_day.get(day, {}).get("amt", 0.0)
            profit_amt = sale_amt - cost_amt
            profit_by_day[day] = {
                "qty": 0,
                "amt": f"{round(profit_amt, 2)}"
            }
    
        data = [
            {
                "id": 1,
                "type": "Total sales",
                "qty": round(total_qty, 1),
                "rate": 0,
                "unit": "MT",
                "rate_unit": "L",
                "cumulativeValue": f"{round(total_sales_amt, 2)}",
                "daily": {
                    day: {
                        "qty": round(sales_by_day[day]["qty"], 1),
                        "amt": f"{round(sales_by_day[day]['amt'], 2)}"
                    } for day in all_days
                }
            },
            {
                "id": 2,
                "type": "Total cost",
                "qty": round(sum(d["qty"] for d in cost_by_day.values()), 1),
                "rate": 0,
                "unit": "MT",
                "rate_unit": "L",
                "cumulativeValue": f"{round(total_cost_amt, 2)}",
                "daily": {
                    day: {
                        "qty": round(cost_by_day[day]["qty"], 1),
                        "amt": f"{round(cost_by_day[day]['amt'], 2)}"
                    } for day in all_days
                }
            },
            {
                "id": 3,
                "type": "Profitability",
                "qty": round(total_qty, 1),
                "rate": profitability_rate,
                "unit": "MT",
                "rate_unit": "L",
                "cumulativeValue": f"{round(profitability_amt, 2)}",
                "daily": profit_by_day
            }
        ]
    
        # separate summary object
        summary = {
            "id": 0,
            "type": "Earnings Summary",
            "qty": round(total_qty, 1),
            "rate": profitability_rate,
            "unit": "MT",
            "rate_unit": "L",
            "cumulativeValue": f"{round(profitability_amt, 2)}",
            "daily": profit_by_day
        }
    
        return JsonResponse({
            "status": True,
            "message": "Earnings report generated successfully.",
            "data": data,
            **summary  # Merge the summary at top level
        })

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        sales_qs = Sales.objects.all()
        cost_qs = Cost.objects.all()
    
        sales_by_day = defaultdict(lambda: {"qty": 0.0, "amt": 0.0})
        cost_by_day = defaultdict(lambda: {"qty": 0.0, "amt": 0.0})
    
        total_sales_amt = 0.0
        total_cost_amt = 0.0
        total_qty = 0.0
    
        for s in sales_qs:
            day = s.date.strftime("%d")
            qty = float(s.quantity)
            rate = float(s.rate)
            amt = qty * rate
            sales_by_day[day]["qty"] += qty
            sales_by_day[day]["amt"] += amt
            total_sales_amt += amt
            total_qty += qty
    
        for c in cost_qs:
            day = c.date.strftime("%d")
            qty = float(c.quantity)
            rate = float(c.rate)
            amt = qty * rate
            cost_by_day[day]["qty"] += qty
            cost_by_day[day]["amt"] += amt
            total_cost_amt += amt
    
        profitability_amt = total_sales_amt - total_cost_amt
        profitability_rate = round(profitability_amt / total_qty, 2) if total_qty else 0.0
    
        profit_by_day = {}
        all_days = sorted(set(sales_by_day.keys()) | set(cost_by_day.keys()))
        for day in all_days:
            sale_amt = sales_by_day.get(day, {}).get("amt", 0.0)
            cost_amt = cost_by_day.get(day, {}).get("amt", 0.0)
            profit_amt = sale_amt - cost_amt
            profit_by_day[day] = {
                "qty": 0.0,
                "amt": f"{round(profit_amt, 2)}"
            }
    
        data = [
            {
                "id": 1,
                "type": "Total sales",
                "qty": round(total_qty, 1),
                "rate": 0,
                "unit": "MT",
                "rate_unit": "?",
                "cumulativeValue": f"{round(total_sales_amt, 2)}",
                "daily": {
                    day: {
                        "qty": round(sales_by_day[day]["qty"], 1),
                        "amt": f"{round(sales_by_day[day]['amt'], 2)}"
                    } for day in sorted(sales_by_day)
                }
            },
            {
                "id": 2,
                "type": "Total cost",
                "qty": round(sum(d["qty"] for d in cost_by_day.values()), 1),
                "rate": 0,
                "unit": "MT",
                "rate_unit": "?",
                "cumulativeValue": f"{round(total_cost_amt, 2)}",
                "daily": {
                    day: {
                        "qty": round(cost_by_day[day]["qty"], 1),
                        "amt": f"{round(cost_by_day[day]['amt'], 2)}"
                    } for day in sorted(cost_by_day)
                }
            },
            {
                "id": 3,
                "type": "Profitability",
                "qty": round(total_qty, 1),
                "rate": profitability_rate,
                "unit": "MT",
                "rate_unit": "?",
                "cumulativeValue": f"{round(profitability_amt, 2)}",
                "daily": profit_by_day
            },
            {
                "id": 0,
                "type": "Earnings Summary",
                "qty": round(total_qty, 1),
                "rate": profitability_rate,
                "unit": "MT",
                "rate_unit": "?",
                "cumulativeValue": f"{round(profitability_amt, 2)}",
                "daily": profit_by_day
            }
        ]
    
        return JsonResponse({
            "status": True,
            "message": "Earnings report generated successfully.",
            "data": data
        })
    
    

    
    
    
    
    
    
        
        
        
    def get_highlight_report(self,request):
    
        sales_qs = Sales.objects.all()
        cost_qs = Cost.objects.all()
    
        # ----------- SALES SECTION -----------
        sales_grouped = {}
        sales_daily = defaultdict(lambda: {"qty": 0.0, "amt": 0.0})
        total_sales_amt = 0.0
        total_sales_qty = 0.0
    
        for s in sales_qs:
            key = s.type
            day = s.date.strftime("%d")
            qty = float(s.quantity)
            rate = float(s.rate)
            amt = qty * rate
    
            if key not in sales_grouped:
                sales_grouped[key] = {
                    "id": len(sales_grouped) + 1,
                    "type": key,
                    "qty": 0.0,
                    "rate": rate,
                    "unit": s.unit,
                    "rate_unit": s.rate_unit,
                    "cumulativeValue": 0.0,
                    "daily": {}
                }
    
            sales_grouped[key]["qty"] += qty
            sales_grouped[key]["cumulativeValue"] += amt
            sales_grouped[key]["daily"].setdefault(day, {"qty": 0.0, "amt": 0.0})
            sales_grouped[key]["daily"][day]["qty"] += qty
            sales_grouped[key]["daily"][day]["amt"] += amt
    
            total_sales_amt += amt
            total_sales_qty += qty
            sales_daily[day]["qty"] += qty
            sales_daily[day]["amt"] += amt
    
        sales_list = list(sales_grouped.values())
        sales_list.append({
            "id": 0,
            "type": "Total (Sales)",
            "qty": round(total_sales_qty, 1),
            "rate": round(total_sales_amt / total_sales_qty, 2) if total_sales_qty else 0.0,
            "unit": "MT",
            "rate_unit": "?",
            "cumulativeValue": round(total_sales_amt, 2),
            "daily": {
                day: {
                    "qty": round(data["qty"], 1),
                    "amt": round(data["amt"], 2)
                } for day, data in sorted(sales_daily.items())
            }
        })
    
        # ----------- COST SECTION -----------
        cost_grouped = {}
        cost_daily = defaultdict(lambda: {"qty": 0.0, "amt": 0.0})
        total_cost_amt = 0.0
        total_cost_qty = 0.0
    
        for c in cost_qs:
            key = c.type
            day = c.date.strftime("%d")
            qty = float(c.quantity)
            rate = float(c.rate)
            amt = qty * rate
    
            if key not in cost_grouped:
                cost_grouped[key] = {
                    "id": len(cost_grouped) + 1,
                    "type": key,
                    "qty": 0.0,
                    "rate": rate,
                    "unit": c.unit,
                    "rate_unit": c.rate_unit,
                    "cumulativeValue": 0.0,
                    "daily": {}
                }
    
            cost_grouped[key]["qty"] += qty
            cost_grouped[key]["cumulativeValue"] += amt
            cost_grouped[key]["daily"].setdefault(day, {"qty": 0.0, "amt": 0.0})
            cost_grouped[key]["daily"][day]["qty"] += qty
            cost_grouped[key]["daily"][day]["amt"] += amt
    
            total_cost_amt += amt
            total_cost_qty += qty
            cost_daily[day]["qty"] += qty
            cost_daily[day]["amt"] += amt
    
        cost_list = list(cost_grouped.values())
        cost_list.append({
            "id": 0,
            "type": "Total (Cost)",
            "qty": round(total_cost_qty, 1),
            "rate": round(total_cost_amt / total_cost_qty, 2) if total_cost_qty else 0.0,
            "unit": "MT",
            "rate_unit": "?",
            "cumulativeValue": round(total_cost_amt, 2),
            "daily": {
                day: {
                    "qty": round(data["qty"], 1),
                    "amt": round(data["amt"], 2)
                } for day, data in sorted(cost_daily.items())
            }
        })
    
        # ----------- EARNINGS SECTION -----------
        profit_amt = total_sales_amt - total_cost_amt
        profitability_rate = round(profit_amt / total_sales_qty, 2) if total_sales_qty else 0.0
        all_days = sorted(set(sales_daily.keys()) | set(cost_daily.keys()))
    
        daily_profit = {}
        for day in all_days:
            s_amt = sales_daily.get(day, {}).get("amt", 0.0)
            c_amt = cost_daily.get(day, {}).get("amt", 0.0)
            daily_profit[day] = {
                "qty": 0.0,
                "amt": round(s_amt - c_amt, 2)
            }
    
        earnings_list = [
            {
                "id": 1,
                "type": "Total sales",
                "qty": round(total_sales_qty, 1),
                "rate": round(total_sales_amt / total_sales_qty, 2) if total_sales_qty else 0.0,
                "unit": "MT",
                "rate_unit": "L",
                "cumulativeValue": round(total_sales_amt, 2),
                "daily": {
                    day: {
                        "qty": round(sales_daily[day]["qty"], 1),
                        "amt": round(sales_daily[day]["amt"], 2)
                    } for day in all_days
                }
            },
            {
                "id": 2,
                "type": "Total cost",
                "qty": round(total_cost_qty, 1),
                "rate": round(total_cost_amt / total_cost_qty, 2) if total_cost_qty else 0.0,
                "unit": "MT",
                "rate_unit": "L",
                "cumulativeValue": round(total_cost_amt, 2),
                "daily": {
                    day: {
                        "qty": round(cost_daily[day]["qty"], 1),
                        "amt": round(cost_daily[day]["amt"], 2)
                    } for day in all_days
                }
            },
            {
                "id": 3,
                "type": "Profitability",
                "qty": round(total_sales_qty, 1),
                "rate": profitability_rate,
                "unit": "MT",
                "rate_unit": "L",
                "cumulativeValue": round(profit_amt, 2),
                "daily": daily_profit
            },
            {
                "id": 0,
                "type": "Total (Earnings)",
                "qty": round(total_sales_qty, 1),
                "rate": profitability_rate,
                "unit": "MT",
                "rate_unit": "L",
                "cumulativeValue": round(profit_amt, 2),
                "daily": daily_profit
            }
        ]
    
        # ----------- FINAL RESPONSE -----------
        return JsonResponse({
            "status": True,
            "message": "Dashboard report generated successfully.",
            "data": {
                "sales": sales_list,
                "cost": cost_list,
                "earnings": earnings_list
            }
        })
        
    
    
    
    
    
    
    
    
    
    
    
    
        sales_qs = Sales.objects.all()
        cost_qs = Cost.objects.all()
    
        # ----------- SALES SECTION -----------
        sales_grouped = {}
        sales_daily = defaultdict(lambda: {"qty": 0.0, "amt": 0.0})
        total_sales_amt = 0.0
        total_sales_qty = 0.0
    
        for s in sales_qs:
            key = s.type
            day = s.date.strftime("%d")
            qty = float(s.quantity)
            rate = float(s.rate)
            amt = qty * rate
    
            if key not in sales_grouped:
                sales_grouped[key] = {
                    "id": len(sales_grouped) + 1,
                    "type": key,
                    "qty": 0.0,
                    "rate": rate,
                    "unit": s.unit,
                    "rate_unit": s.rate_unit,
                    "cumulativeValue": 0.0,
                    "daily": {}
                }
    
            sales_grouped[key]["qty"] += qty
            sales_grouped[key]["cumulativeValue"] += amt
            sales_grouped[key]["daily"].setdefault(day, {"qty": 0.0, "amt": 0.0})
            sales_grouped[key]["daily"][day]["qty"] += qty
            sales_grouped[key]["daily"][day]["amt"] += amt
    
            total_sales_amt += amt
            total_sales_qty += qty
            sales_daily[day]["qty"] += qty
            sales_daily[day]["amt"] += amt
    
        sales_list = list(sales_grouped.values())
        sales_list.append({
            "id": 0,
            "type": "Total (Sales)",
            "qty": round(total_sales_qty, 1),
            "rate": 0,
            "unit": "MT",
            "rate_unit": "?",
            "cumulativeValue": round(total_sales_amt, 2),
            "daily": {
                day: {
                    "qty": round(data["qty"], 1),
                    "amt": round(data["amt"], 2)
                } for day, data in sorted(sales_daily.items())
            }
        })
    
        # ----------- COST SECTION -----------
        cost_grouped = {}
        cost_daily = defaultdict(lambda: {"qty": 0.0, "amt": 0.0})
        total_cost_amt = 0.0
        total_cost_qty = 0.0
    
        for c in cost_qs:
            key = c.type
            day = c.date.strftime("%d")
            qty = float(c.quantity)
            rate = float(c.rate)
            amt = qty * rate
    
            if key not in cost_grouped:
                cost_grouped[key] = {
                    "id": len(cost_grouped) + 1,
                    "type": key,
                    "qty": 0.0,
                    "rate": rate,
                    "unit": c.unit,
                    "rate_unit": c.rate_unit,
                    "cumulativeValue": 0.0,
                    "daily": {}
                }
    
            cost_grouped[key]["qty"] += qty
            cost_grouped[key]["cumulativeValue"] += amt
            cost_grouped[key]["daily"].setdefault(day, {"qty": 0.0, "amt": 0.0})
            cost_grouped[key]["daily"][day]["qty"] += qty
            cost_grouped[key]["daily"][day]["amt"] += amt
    
            total_cost_amt += amt
            total_cost_qty += qty
            cost_daily[day]["qty"] += qty
            cost_daily[day]["amt"] += amt
    
        cost_list = list(cost_grouped.values())
        cost_list.append({
            "id": 0,
            "type": "Total (Cost)",
            "qty": round(total_cost_qty, 1),
            "rate": 0,
            "unit": "MT",
            "rate_unit": "?",
            "cumulativeValue": round(total_cost_amt, 2),
            "daily": {
                day: {
                    "qty": round(data["qty"], 1),
                    "amt": round(data["amt"], 2)
                } for day, data in sorted(cost_daily.items())
            }
        })
    
        # ----------- EARNINGS SECTION -----------
        profit_amt = total_sales_amt - total_cost_amt
        profitability_rate = round(profit_amt / total_sales_qty, 2) if total_sales_qty else 0.0
        all_days = sorted(set(sales_daily.keys()) | set(cost_daily.keys()))
    
        daily_profit = {}
        for day in all_days:
            s_amt = sales_daily.get(day, {}).get("amt", 0.0)
            c_amt = cost_daily.get(day, {}).get("amt", 0.0)
            daily_profit[day] = {
                "qty": 0.0,
                "amt": round(s_amt - c_amt, 2)
            }
    
        earnings_list = [
            {
                "id": 1,
                "type": "Total sales",
                "qty": round(total_sales_qty, 1),
                "rate": 0,
                "unit": "MT",
                "rate_unit": "?",
                "cumulativeValue": round(total_sales_amt, 2),
                "daily": {
                    day: {
                        "qty": round(sales_daily[day]["qty"], 1),
                        "amt": round(sales_daily[day]["amt"], 2)
                    } for day in all_days
                }
            },
            {
                "id": 2,
                "type": "Total cost",
                "qty": round(total_cost_qty, 1),
                "rate": 0,
                "unit": "MT",
                "rate_unit": "?",
                "cumulativeValue": round(total_cost_amt, 2),
                "daily": {
                    day: {
                        "qty": round(cost_daily[day]["qty"], 1),
                        "amt": round(cost_daily[day]["amt"], 2)
                    } for day in all_days
                }
            },
            {
                "id": 3,
                "type": "Profitability",
                "qty": round(total_sales_qty, 1),
                "rate": profitability_rate,
                "unit": "MT",
                "rate_unit": "?",
                "cumulativeValue": round(profit_amt, 2),
                "daily": daily_profit
            },
            {
                "id": 0,
                "type": "Total (Earnings)",
                "qty": round(total_sales_qty, 1),
                "rate": profitability_rate,
                "unit": "MT",
                "rate_unit": "?",
                "cumulativeValue": round(profit_amt, 2),
                "daily": daily_profit
            }
        ]
    
        # ----------- FINAL RESPONSE -----------
        return JsonResponse({
            "status": True,
            "message": "Dashboard report generated successfully.",
            "data": {
                "sales": sales_list,
                "cost": cost_list,
                "earnings": earnings_list
            }
        })
    
    
    
    
    
    def get_production_chart_data(self,request):
    
    
        filter_type = request.GET.get('type')  

        sales_qs = Sales.objects.all()
        if filter_type:
            sales_qs = sales_qs.filter(type=filter_type)
    
        cost_qs = Cost.objects.all()
    
        production_data = defaultdict(lambda: {
            "sales_quantity": 0.0,
            "cost_quantity": 0.0,
            "profit": 0.0
        })
    
        # Only quantity from Sales
        for s in sales_qs:
            day = s.date.strftime("%d")
            qty = float(s.quantity)
            production_data[day]["sales_quantity"] += qty
    
        # Only quantity from Cost
        for c in cost_qs:
            day = c.date.strftime("%d")
            qty = float(c.quantity)
            production_data[day]["cost_quantity"] += qty
    
        # Calculate profit
        for day, entry in production_data.items():
            entry["profit"] = round(entry["sales_quantity"] - entry["cost_quantity"], 2)
    
        result = []
        for day in sorted(production_data.keys()):
            result.append({
                "day": day,
                "sales_quantity": production_data[day]["sales_quantity"],
                "cost_quantity": production_data[day]["cost_quantity"],
                "profit": production_data[day]["profit"]
            })
    
        return JsonResponse({
            "status": True,
            "message": "Filtered production chart data fetched successfully.",
            "data": result
        })
    
    

        
            
        
        
    def get_earnings_chart(self,request):
        sales_qs = Sales.objects.all()
        cost_qs = Cost.objects.all()
    
        sales_by_day = defaultdict(float)
        cost_by_day = defaultdict(float)
    
        for s in sales_qs:
            day = s.date.strftime("%d")
            amt = float(s.quantity) * float(s.rate)
            sales_by_day[day] += amt
    
        for c in cost_qs:
            day = c.date.strftime("%d")
            amt = float(c.quantity) * float(c.rate)
            cost_by_day[day] += amt
    
        all_days = sorted(set(sales_by_day) | set(cost_by_day), key=lambda d: int(d))
        result = []
    
        for day in all_days:
            sale_amt = sales_by_day.get(day, 0.0)
            cost_amt = cost_by_day.get(day, 0.0)
            profit_amt = sale_amt - cost_amt
            result.append({
                "day": day,
                "profit": round(profit_amt)  # Convert ? to Lakh
            })
    
        return JsonResponse({
            "status": True,
            "message": "Earnings chart data fetched successfully.",
            "data": result
        })       
        
        
        
        
        
        
    def get_total_sales_chart(self,request):
        sales_qs = Sales.objects.all()
        chart_data = []
    
        grouped = defaultdict(float)  # {date_label: total_amount}
    
        for s in sales_qs:
            date_str = s.date.strftime("%-d %b")  # e.g., "1 Mar"
            qty = float(s.quantity)
            rate = float(s.rate)
            amt = qty * rate
            grouped[date_str] += amt
    
        # Build response data
        for date_str, amount in grouped.items():
            chart_data.append({
                "date": date_str,
                "amount": round(amount, 2)
            })
    
        # Sort by actual date
        chart_data.sort(key=lambda x: datetime.datetime.strptime(x["date"], "%d %b"))
    
        return JsonResponse({
            "status": True,
            "message": "Total sales chart data fetched successfully.",
            "data": chart_data
        })   
        
        
        
        
    def get_total_cost_chart(self, request):
        cost_qs = Cost.objects.all()
        chart_data = []
    
        grouped = defaultdict(float)  # {date_label: total_amount}
    
        for c in cost_qs:
            date_str = c.date.strftime("%-d %b")  # e.g., "2 Jan"
            qty = float(c.quantity)
            rate = float(c.rate)
            amt = qty * rate
            grouped[date_str] += amt
    
        # Build final response data
        for date_str, amount in grouped.items():
            chart_data.append({
                "label": date_str,
                "amount": round(amount, 3)
            })
    
        # Sort by actual date
        chart_data.sort(key=lambda x: datetime.datetime.strptime(x["label"], "%d %b"))
    
        return JsonResponse({
            "status": True,
            "message": "Total cost chart data fetched successfully.",
            "data": chart_data
        })     
        
        
        
        
    def get_sales_cost_ratio(self, request):
        sales_qs = Sales.objects.all()
        cost_qs = Cost.objects.all()
    
        # Calculate total sales amount
        total_sales = 0.0
        for s in sales_qs:
            qty = float(s.quantity)
            rate = float(s.rate)
            amt = qty * rate
            total_sales += amt
    
        # Calculate total cost amount
        total_cost = 0.0
        for c in cost_qs:
            qty = float(c.quantity)
            rate = float(c.rate)
            amt = qty * rate
            total_cost += amt
    
        # Handle division
        if total_cost > 0:
            ratio = round(total_sales / total_cost, 2)
            ratio_percent = f"{round((total_sales / total_cost) * 100, 2)}%"
        else:
            ratio = None
            ratio_percent = "undefined"
    
        # Dummy values for change (can be made dynamic based on previous period comparison)
        change = "0.5%"
        change_direction = "up"
    
        # Format response
        return JsonResponse({
            "status": True,
            "message": "Sales to cost ratio calculated successfully.",
            "data": {
                "total_sales": round(total_sales, 2),
                "total_cost": round(total_cost, 2),
                "ratio": ratio,
                "ratio_percent": ratio_percent,
                "change": change,
                "change_direction": change_direction
            }
        })
        
        
        
        
        
    def get_sales_cost_ratio_today(self,request):
        today = localdate()  # Gets today's date in timezone-aware way
    
        # Filter sales and costs for today only
        sales_qs = Sales.objects.filter(date=today)
        cost_qs = Cost.objects.filter(date=today)
    
        # Calculate total sales for today
        total_sales = sum(float(s.quantity) * float(s.rate) for s in sales_qs)
    
        # Calculate total cost for today
        total_cost = sum(float(c.quantity) * float(c.rate) for c in cost_qs)
    
        # Calculate ratio
        if total_cost > 0:
            ratio = round(total_sales / total_cost, 2)
            ratio_percent = f"{round((total_sales / total_cost) * 100, 2)}%"
        else:
            ratio = None
            ratio_percent = "0"
    
        # Dummy values for UI arrows and color
        change = "0"
        change_direction = "up"
    
        return JsonResponse({
            "status": True,
            "message": "Today's sales to cost ratio calculated successfully.",
            "data": {
                "total_sales": round(total_sales, 2),
                "total_cost": round(total_cost, 2),
                "ratio": ratio,
                "ratio_percent": ratio_percent,
                "change": change,
                "change_direction": change_direction
            }
        })        
                      
        
        
        
        
    def get_earnings_sales_ratio(self,request):
        # Optional: allow date filtering (future enhancement)
        sales_qs = Sales.objects.all()
        cost_qs = Cost.objects.all()
    
        total_sales = sum(float(s.quantity) * float(s.rate) for s in sales_qs)
        total_cost = sum(float(c.quantity) * float(c.rate) for c in cost_qs)
        total_earnings = total_sales - total_cost
    
        if total_sales > 0:
            ratio = round(total_earnings / total_sales, 2)
            ratio_percent = f"{round((total_earnings / total_sales) * 100, 2)}%"
        else:
            ratio = None
            ratio_percent = "undefined"
    
        # Dummy values for trend (replace with actual logic if needed)
        change = "0.5%"
        change_direction = "up"
    
        return JsonResponse({
            "status": True,
            "message": "Earnings to sales ratio calculated successfully.",
            "data": {
                "total_earnings": round(total_earnings, 2),
                "total_sales": round(total_sales, 2),
                "ratio": ratio,
                "ratio_percent": ratio_percent,
                "change": change,
                "change_direction": change_direction
            }
        })    
        
        
        
    def get_earnings_sales_ratio_today(self,request):
        today = localdate()
    
        # Filter sales and cost for today only
        sales_qs = Sales.objects.filter(date=today)
        cost_qs = Cost.objects.filter(date=today)
    
        total_sales = sum(float(s.quantity) * float(s.rate) for s in sales_qs)
        total_cost = sum(float(c.quantity) * float(c.rate) for c in cost_qs)
        total_earnings = total_sales - total_cost
    
        if total_sales > 0:
            ratio = round(total_earnings / total_sales, 2)
            ratio_percent = f"{round((total_earnings / total_sales) * 100, 2)}%"
        else:
            ratio = None
            ratio_percent = "0"
    
        # Dummy trend (replace with real trend logic if needed)
        change = "0.5%"
        change_direction = "up"
    
        return JsonResponse({
            "status": True,
            "message": "Today's earnings to sales ratio calculated successfully.",
            "data": {
                "date": today.strftime("%Y-%m-%d"),
                "total_earnings": round(total_earnings, 2),
                "total_sales": round(total_sales, 2),
                "ratio": ratio,
                "ratio_percent": ratio_percent,
                "change": change,
                "change_direction": change_direction
            }
        })            
        
        
        
        
        
    def get_sales_tonnage_ratio(self,request):
        sales_qs = Sales.objects.all()
    
        total_sales_amt = sum(float(s.quantity) * float(s.rate) for s in sales_qs)
        total_tonnage = sum(float(s.quantity) for s in sales_qs)
    
        if total_tonnage > 0:
            ratio = round(total_sales_amt / total_tonnage, 2)
            ratio_percent = f"{round((total_sales_amt / total_tonnage) * 100, 2)}%"
        else:
            ratio = None
            ratio_percent = "undefined"
    
        # Dummy change
        change = "0.5%"
        change_direction = "up"
    
        return JsonResponse({
            "status": True,
            "message": "Sales to tonnage ratio calculated successfully.",
            "data": {
                "total_sales_amt": round(total_sales_amt, 2),
                "total_tonnage": round(total_tonnage, 2),
                "ratio": ratio,
                "ratio_percent": ratio_percent,
                "change": change,
                "change_direction": change_direction
            }
        })     
        
        
        
    def get_today_sales_tonnage_ratio(self,request):
        today = date.today()
        today_sales = Sales.objects.filter(date=today)
    
        total_sales_amt = sum(float(s.quantity) * float(s.rate) for s in today_sales)
        total_qty = sum(float(s.quantity) for s in today_sales)
    
        if total_qty > 0:
            ratio = round(total_sales_amt / total_qty, 2)
            ratio_percent = f"{round(ratio * 100, 2)}%"
        else:
            ratio = None
            ratio_percent = "undefined"
    
        return JsonResponse({
            "status": True,
            "message": "Today's revenue (sales to tonnage) ratio calculated successfully.",
            "data": {
                "total_sales_amt": round(total_sales_amt, 2),
                "total_tonnage": round(total_qty, 2),
                "ratio": ratio,
                "ratio_percent": ratio_percent,
                "change": "0.5%",
                "change_direction": "up"
            }
        })           
        
                   
         
         
         
    def get_today_sales_cost_ratio(self,request):
        today = date.today()
    
        # Filter today's records
        sales_today = Sales.objects.filter(date=today)
        cost_today = Cost.objects.filter(date=today)
    
        # Calculate total sales and cost amounts
        total_sales_amt = sum(float(s.quantity) * float(s.rate) for s in sales_today)
        total_cost_amt = sum(float(c.quantity) * float(c.rate) for c in cost_today)
    
        # Calculate ratio and format output
        if total_cost_amt > 0:
            ratio = round(total_sales_amt / total_cost_amt, 2)
            ratio_percent = f"{round(ratio * 100, 2)}%"
        else:
            ratio = None
            ratio_percent = "undefined"
    
        return JsonResponse({
            "status": True,
            "message": "Today's sales to cost ratio calculated successfully.",
            "data": {
                "total_sales_amt": round(total_sales_amt, 2),
                "total_cost_amt": round(total_cost_amt, 2),
                "ratio": ratio,
                "ratio_percent": ratio_percent,
                "change": "0.5%",  # Static placeholder
                "change_direction": "up"  # You can make this dynamic
            }
        })  
        
        
        
        
        
    def get_cost_to_earnings_ratio(self,request):
        # Step 1: Fetch all data
        sales_qs = Sales.objects.all()
        cost_qs = Cost.objects.all()
    
        # Step 2: Calculate total sales and cost
        total_sales_amt = sum(float(s.quantity) * float(s.rate) for s in sales_qs)
        total_cost_amt = sum(float(c.quantity) * float(c.rate) for c in cost_qs)
    
        # Step 3: Calculate earnings
        total_earnings = total_sales_amt - total_cost_amt
    
        # Step 4: Compute ratio
        if total_earnings > 0:
            ratio = round(total_cost_amt / total_earnings, 2)
            ratio_percent = f"{round(ratio * 100, 2)}%"
        else:
            ratio = None
            ratio_percent = "undefined"
    
        return JsonResponse({
            "status": True,
            "message": "Cost to earnings ratio calculated successfully.",
            "data": {
                "total_cost_amt": round(total_cost_amt, 2),
                "total_earnings": round(total_earnings, 2),
                "ratio": ratio,
                "ratio_percent": ratio_percent,
                "change": "0.5%",  # static placeholder
                "change_direction": "up"  # or "down" if calculated
            }
        })        
        
               
         
            