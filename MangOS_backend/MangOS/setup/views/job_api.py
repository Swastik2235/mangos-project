from rest_framework import status
from rest_framework import viewsets
from setup.models import BOMSheet, JobCard, ClientDetails, InventoryItem,Project
from setup.serializers.job_card_serializers import CreateJobCardSerializer, GetJobCardSerializer,JobCardMinimalSerializer
from django.http import HttpResponse,JsonResponse
from rest_framework.response import Response
from collections import defaultdict
import pandas as pd
import tempfile




class GetDataCard(viewsets.ModelViewSet):
    queryset= JobCard.objects.all()
    
    def process_bom_sheet_data(self, request):
        try:
            project_id = request.GET.get("project_id")
            print('project_id:',project_id)
            project = Project.objects.get(id=project_id)
    
            if not project.bom_sheet or not project.bom_sheet.bom_file:
                return JsonResponse({"error": "No BOM file associated with this project."}, status=400)
    
            bom_file = project.bom_sheet.bom_file
            with bom_file.open("rb") as f:
                df = pd.read_excel(f)
    
            # Validate expected columns
            expected_cols = {"Product Name", "Length", "Quantity"}
            if not expected_cols.issubset(df.columns):
                return JsonResponse({"error": f"BOM file missing columns: {expected_cols - set(df.columns)}"}, status=400)
    
        except Project.DoesNotExist:
            return JsonResponse({"error": "Project not found."}, status=404)
        except Exception as e:
            return JsonResponse({"error": f"Unexpected error: {str(e)}"}, status=500)
    
        print('gaurav'*100)
    
        df["job-done"] = False
        response_data = []
        leftover_pieces = defaultdict(list)
        inventory_updates = {}
    
        # Load inventory data
        inventory_data = InventoryItem.objects.values_list(
            "id",
            "item_id__name",
            "item_id__length",
            "quantity_available_pc"
        )
        inventory_dict = defaultdict(list)
        for inv_id, prod_name, length_mm, qty in inventory_data:
            inventory_dict[prod_name].append({
                "id": inv_id,
                "length": int(length_mm) if length_mm else 0,
                "qty": int(qty)
            })
            
        # Sort BOM by required length (descending)
        sorted_bom = df.sort_values(by="Length", ascending=False)
    
        for index, row in sorted_bom.iterrows():
            product_name = row["Product Name"]
            length_required_mm = int(row["Length"])
            quantity_required = int(row["Quantity"])
    
            inventory_items = inventory_dict.get(product_name, [])
            if not inventory_items:
                response_data.append({
                    "product_name": product_name,
                    "status": "Not found in inventory",
                    "quantity_required": quantity_required
                })
                continue
    
            fulfilled_quantity = 0
            remaining_needed = quantity_required
            rods_used = 0
            shortage = 0
            new_leftovers = []
    
            # Step 1: Use leftover pieces first
            for leftover in sorted(leftover_pieces[product_name], reverse=True):
                while leftover >= length_required_mm and remaining_needed > 0:
                    leftover -= length_required_mm
                    fulfilled_quantity += 1
                    remaining_needed -= 1
                if leftover > 0:
                    new_leftovers.append(leftover)
    
            leftover_pieces[product_name] = new_leftovers
    
            # Step 2: Use inventory rods
            for inventory in inventory_items:
                if remaining_needed <= 0:
                    break
    
                rod_length = inventory["length"]
                qty_available = inventory["qty"]
    
                if rod_length < length_required_mm or qty_available == 0:
                    continue
    
                pieces_per_rod = rod_length // length_required_mm
                if pieces_per_rod == 0:
                    continue
    
                rods_needed = -(-remaining_needed // pieces_per_rod)  # Ceiling division
    
                usable_rods = min(qty_available, rods_needed)
                total_pieces_from_rods = usable_rods * pieces_per_rod
                used_pieces = min(remaining_needed, total_pieces_from_rods)
    
                fulfilled_quantity += used_pieces
                remaining_needed -= used_pieces
                rods_used += usable_rods
                qty_available -= usable_rods
    
                # Update inventory
                inventory_updates[inventory["id"]] = qty_available
    
                # Calculate waste per rod
                for _ in range(usable_rods):
                    cuts = min(pieces_per_rod, used_pieces)
                    used_pieces -= cuts
                    leftover = rod_length - (cuts * length_required_mm)
                    if leftover > 0:
                        leftover_pieces[product_name].append(leftover)
                    if used_pieces <= 0:
                        break
    
            shortage = remaining_needed
            is_fulfilled = shortage == 0
            waste = sum(leftover_pieces[product_name]) if is_fulfilled else 0
    
            df.at[index, "job-done"] = is_fulfilled
    
            response_data.append({
                "product_name": product_name,
                "quantity_required": quantity_required,
                "required_length": length_required_mm,
                "quantity_available": sum(item["qty"] for item in inventory_items),
                "rods_used": rods_used,
                "shortage": shortage,
                "waste": waste,
                "leftover_pieces": leftover_pieces[product_name],
                "status": "Fulfilled" if is_fulfilled else "Partially Fulfilled"
            })
    
        # Save updated BOM DataFrame to temp file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".xlsx") as tmp:
            df.to_excel(tmp.name, index=False)
            print(f"Updated BOM sheet saved to: {tmp.name}")
    
        # Bulk update inventory
        InventoryItem.objects.bulk_update([
            InventoryItem(id=inv_id, quantity_available_pc=qty)
            for inv_id, qty in inventory_updates.items()
        ], ["quantity_available_pc"])
        
        # Get job card data
        job_card_response = self.get_job_card(request)
        if isinstance(job_card_response, Response):
            job_card_data = job_card_response.data
        else:
            job_card_data = job_card_response.content.decode('utf-8')
            job_card_data = json.loads(job_card_data)
    
        # Get allocation data
        allocation_response = self.get_allocation_data(request)
        if isinstance(allocation_response, Response):
            allocation_data = allocation_response.data
        else:
            allocation_data = allocation_response.content.decode('utf-8')
            allocation_data = json.loads(allocation_data)
    
        # Get header data
        header_response = self.get_header(request)
        if isinstance(header_response, Response):
            header_data = header_response.data
        else:
            header_data = header_response.content.decode('utf-8')
            header_data = json.loads(header_data)
    
        # Save all data to JobCard model
        try:
            for job_info in job_card_data:
                # Find corresponding allocation data
                allocation_info = next(
                    (item for item in allocation_data if item.get('serial_number') == job_info.get('serial_number')),
                    {}
                )
                
                # Find corresponding header data (assuming first section for simplicity)
                header_info = header_data[0]['jobs'][0] if header_data and header_data[0]['jobs'] else {}
        
                job_card_defaults = {
                    'section': job_info.get('section'),
                    'length': job_info.get('length'),
                    'width': job_info.get('width'),
                    'unit': job_info.get('unit'),
                    'wt_and_pcs': job_info.get('wt_and_pcs'),
                    'total_quantity': job_info.get('total_quantity'),
                    'total_weight': job_info.get('total_weight'),
                    'operations': job_info.get('operations', ''),
                    'remarks': job_info.get('remarks', ''),
                    'allocated_1': allocation_info.get('allocation_1', ''),
                    'count': allocation_info.get('count', ''),
                    'consumed_length': allocation_info.get('consumed_length', ''),
                    'inventory_length': allocation_info.get('inventory_length', ''),
                    'cutting_loss': allocation_info.get('cutting_loss', ''),
                    'pieces': allocation_info.get('pieces', ''),
                    'available_length': allocation_info.get('inventory_length', ''),
                    'serial_number': job_info.get('serial_number', ''),
                    'embossing': job_info.get('embossing', ''),
                    'sin_no': job_info.get('sin_no', ''),
                    'release_date': job_info.get('release_date', ''),
                    'jc_no': job_info.get('jc_no', ''),
                    'Job_order_no': header_info.get('Job Order No', ''),
                    'company_name': header_info.get('Client', ''),
                    'client_details_id': project.client,
                    'project_name': header_info.get('Project', ''),
                    'type_of_tower': header_info.get('Type of Tower', ''),
                    'note': header_info.get('Instruction', ''),
                    'bom_sheet_id': project.bom_sheet
                }
        
                JobCard.objects.update_or_create(
                    mark_no=job_info.get('mark_no'),
                    serial_number=job_info.get('serial_number'),
                    defaults=job_card_defaults
                )
                
                
                
                
                
        except Exception as e:
            return JsonResponse({"error": f"Failed to save job cards: {str(e)}"}, status=500)
    
        return JsonResponse({
            "status": "success",
            "message": "BOM processed successfully and job cards created/updated",
            "job_cards": job_card_data,
            "allocation_data": allocation_data,
            "header_data": header_data
        }, safe=False)
        
        
    
    
    def get_job_card(self, request, job_id=None):
        try:
            if job_id:
                # Get single job card
                job = JobCard.objects.get(pk=job_id)
                row_data = self._format_row_data(job)
                return Response(row_data, status=status.HTTP_200_OK)
            else:
                # Get all job cards
                jobs = JobCard.objects.all()
                response_data = [self._format_row_data(job) for job in jobs]
                return Response(response_data, status=status.HTTP_200_OK)
                
        except JobCard.DoesNotExist:
            return Response({"error": "Job card not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def _format_row_data(self, job):
        """Format the job card data into key-value pairs"""
        return {
            "mark_no": job.mark_no or "",
            "section":  job.section or "",
            "length": job.length or "",
            "width": job.width or "",
            "unit": job.unit or "",
            "wt_and_pcs":  job.wt_and_pcs or "",
            "total_quantity": job.total_quantity or "",
            "total_weight": job.total_weight or "",
        }



    def get_allocation_data(self, request, job_id=None):
        try:
            if job_id:
                job = JobCard.objects.get(pk=job_id)
                allocation_data = self._get_allocation_data([job])
                return Response(allocation_data[0] if allocation_data else {}, 
                              status=status.HTTP_200_OK)
            else:
                jobs = JobCard.objects.all().order_by('section')
                section_groups = {}
                for job in jobs:
                    if job.section not in section_groups:
                        section_groups[job.section] = []
                    section_groups[job.section].append(job)
                
                response_data = []
                for section, section_jobs in section_groups.items():
                    response_data.extend(self._get_allocation_data(section_jobs[:2]))
                
                return Response(response_data, status=status.HTTP_200_OK)
                
        except JobCard.DoesNotExist:
            return Response({"error": "Job card not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def _get_allocation_data(self, section_jobs):
        """Generate allocation data with descriptive keys"""
    
        # Fetch inventory data from related ItemMaster model
        inventory_data = InventoryItem.objects.select_related('item_id').values_list(
            "id", "item_id__name", "item_id__length"
        )
    
        allocation_data = []
    
        for i, job in enumerate(section_jobs):
            try:
                job_length = float(job.length)
            except (TypeError, ValueError):
                job_length = None
    
            # Find matching inventory length by comparing section name with item name
            matching_length = None
            for _, item_name, inv_length in inventory_data:
                if item_name == job.section:
                    try:
                        matching_length = float(inv_length)
                    except (TypeError, ValueError):
                        matching_length = None
                    break
    
            # Calculate values if lengths are valid
            if job_length and matching_length and job_length > 0:
                count = int(matching_length // job_length)
                cutting_loss = matching_length - (count * job_length)
                consumed_length = count * job_length
            else:
                count = cutting_loss = consumed_length = ''
    
            try:
                pcs = round(float(job.total_quantity) / count, 2) if count else ""
            except (TypeError, ValueError, ZeroDivisionError):
                pcs = ""
    
            allocation_data.append({
                "serial_number": i + 1,              # D
                "allocation_1": job.length or "",    # E
                "count": count,                      # F
                "consumed_length": consumed_length,  # M
                "inventory_length": matching_length, # N
                "pieces": pcs,                       # O
                "cutting_loss": cutting_loss,        # P
                "quantity": job.total_quantity or "" # Q
            })
    
        return allocation_data  



    def get_header(self, request):
        job_cards = JobCard.objects.all()
        if not job_cards:
            return Response({"error": "No job cards found"}, status=status.HTTP_404_NOT_FOUND)
        
        # Group by section
        section_groups = defaultdict(list)
        for job in job_cards:
            serializer = GetJobCardSerializer(job)
            section_groups[job.section].append(serializer.data)
        
        # Format the response
        response_data = []
        for section, jobs in section_groups.items():
            section_data = {
                "jobs": []
            }
            
            for job in jobs:
                job_details = {
                    "Job Order No": job.get('Job_order_no', 'N/A'),
                    "Client": job.get('client_name', 'N/A'),
                    "Project": job.get('project_name', 'N/A'),
                    "Type of Tower": job.get('type_of_tower', 'N/A'),
                    "Instruction": "Please fabricate the following Mark Nos. against with Mass Production.",
                    "Release Date": job.get('release_date', 'N/A'),
                    "JC No": job.get('jc_no', 'N/A')
                }
                section_data["jobs"].append(job_details)
            
            response_data.append(section_data)
        
        return Response(response_data, status=status.HTTP_200_OK)     
    
    
    
    
    
    
    
    
    
    
class JobCardAPI(viewsets.ModelViewSet): 
    
    
    
    queryset= JobCard.objects.all()
    
    def process_bom_sheet(self, request):
        try:
            project_id = request.GET.get("project_id")
            project = Project.objects.get(id=project_id)
    
            if not project.bom_sheet or not project.bom_sheet.bom_file:
                return JsonResponse({"error": "No BOM file associated with this project."}, status=400)
    
            bom_file = project.bom_sheet.bom_file
            with bom_file.open("rb") as f:
                df = pd.read_excel(f)
    
            # Validate expected columns
            expected_cols = {"Product Name", "Length", "Quantity"}
            if not expected_cols.issubset(df.columns):
                return JsonResponse({"error": f"BOM file missing columns: {expected_cols - set(df.columns)}"}, status=400)
    
        except Project.DoesNotExist:
            return JsonResponse({"error": "Project not found."}, status=404)
        except Exception as e:
            return JsonResponse({"error": f"Unexpected error: {str(e)}"}, status=500)
    
        df["job-done"] = False
        response_data = []
        leftover_pieces = defaultdict(list)
        inventory_updates = {}
    
        # Load inventory data
        inventory_data = InventoryItem.objects.values_list(
            "id",
            "item_id__name",
            "item_id__length",
            "quantity_available_pc"  # or quantity_available_kg, depending on use-case
        )
        inventory_dict = defaultdict(list)
        for inv_id, prod_name, length_mm, qty in inventory_data:
            inventory_dict[prod_name].append({
                "id": inv_id,
                "length": int(length_mm) if length_mm else 0,
                "qty": int(qty)
            })
            
        # Sort BOM by required length (descending)
        sorted_bom = df.sort_values(by="Length", ascending=False)
    
        for index, row in sorted_bom.iterrows():
            product_name = row["Product Name"]
            length_required_mm = int(row["Length"])
            quantity_required = int(row["Quantity"])
    
            inventory_items = inventory_dict.get(product_name, [])
            if not inventory_items:
                response_data.append({
                    "product_name": product_name,
                    "status": "Not found in inventory",
                    "quantity_required": quantity_required
                })
                continue
    
            fulfilled_quantity = 0
            remaining_needed = quantity_required
            rods_used = 0
            shortage = 0
            new_leftovers = []
    
            # Step 1: Use leftover pieces first
            for leftover in sorted(leftover_pieces[product_name], reverse=True):
                while leftover >= length_required_mm and remaining_needed > 0:
                    leftover -= length_required_mm
                    fulfilled_quantity += 1
                    remaining_needed -= 1
                if leftover > 0:
                    new_leftovers.append(leftover)
    
            leftover_pieces[product_name] = new_leftovers
    
            # Step 2: Use inventory rods
            for inventory in inventory_items:
                if remaining_needed <= 0:
                    break
    
                rod_length = inventory["length"]
                qty_available = inventory["qty"]
    
                if rod_length < length_required_mm or qty_available == 0:
                    continue
    
                pieces_per_rod = rod_length // length_required_mm
                if pieces_per_rod == 0:
                    continue
    
                rods_needed = -(-remaining_needed // pieces_per_rod)  # Ceiling division
    
                usable_rods = min(qty_available, rods_needed)
                total_pieces_from_rods = usable_rods * pieces_per_rod
                used_pieces = min(remaining_needed, total_pieces_from_rods)
    
                fulfilled_quantity += used_pieces
                remaining_needed -= used_pieces
                rods_used += usable_rods
                qty_available -= usable_rods
    
                # Update inventory
                inventory_updates[inventory["id"]] = qty_available
    
                # Calculate waste per rod
                for _ in range(usable_rods):
                    cuts = min(pieces_per_rod, used_pieces)
                    used_pieces -= cuts
                    leftover = rod_length - (cuts * length_required_mm)
                    if leftover > 0:
                        leftover_pieces[product_name].append(leftover)
                    if used_pieces <= 0:
                        break
    
            shortage = remaining_needed
            is_fulfilled = shortage == 0
            waste = sum(leftover_pieces[product_name]) if is_fulfilled else 0
    
            df.at[index, "job-done"] = is_fulfilled
    
            response_data.append({
                "product_name": product_name,
                "quantity_required": quantity_required,
                "required_length": length_required_mm,
                "quantity_available": sum(item["qty"] for item in inventory_items),
                "rods_used": rods_used,
                "shortage": shortage,
                "waste": waste,
                "leftover_pieces": leftover_pieces[product_name],
                "status": "Fulfilled" if is_fulfilled else "Partially Fulfilled"
            })
    
        # Save updated BOM DataFrame to temp file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".xlsx") as tmp:
            df.to_excel(tmp.name, index=False)
            print(f"Updated BOM sheet saved to: {tmp.name}")
    
        # Bulk update inventory
        InventoryItem.objects.bulk_update([
            InventoryItem(id=inv_id, quantity_available_pc=qty)
            for inv_id, qty in inventory_updates.items()
        ], ["quantity_available_pc"])
        
        
        
        
        for index, row in df.iterrows():
            product_name = row["Product Name"]
            try:
                # Find matching job card - now filtering by both section and bom_sheet for accuracy
                job_card = JobCard.objects.filter(
                    section=product_name,
                    bom_sheet_id=project.bom_sheet  # Added bom_sheet filter for more precise matching
                ).first()
                
                if job_card:
                    # Get allocation data for this product
                    allocation = next(
                        (item for item in response_data 
                         if item["product_name"] == product_name),
                        None
                    )
                    
                    if allocation:
                        # Update job card with allocation data using new field names
                        job_card.allocated_1 = str(allocation.get("rods_used", ""))  # rods_used
                        job_card.count = str(allocation.get("shortage", ""))          # was allocated_2
                        job_card.consumed_length = str(allocation.get("waste", ""))   # was allocated_3
                        job_card.inventory_length = str(len(allocation.get("leftover_pieces", [])))  # was allocated_4
                        job_card.consumption_length = str(allocation.get("required_length", ""))
                        job_card.pieces = str(allocation.get("quantity_required", ""))
                        job_card.cutting_loss = str(allocation.get("waste", ""))      # Added cutting_loss
                        
                        # Calculate and set available_length (same as inventory_length in this case)
                        job_card.available_length = job_card.inventory_length
                        
                        # Calculate total_length if needed
                        try:
                            req_length = float(allocation.get("required_length", 0))
                            qty = float(allocation.get("quantity_required", 0))
                            job_card.total_length = str(req_length * qty)
                        except (ValueError, TypeError):
                            job_card.total_length = "0"
                        
                        job_card.save()
            
            except Exception as e:
                print(f"Error updating JobCard for {product_name}: {str(e)}")
                continue
        
        final_response = {
            "job_card_data": self.get_job_card(request).data,
            "allocation_data": self.get_allocation_data(request).data,
            "header_data": self.get_header(request).data
        }
    
        return JsonResponse(final_response, safe=False)
    
    
    
    
    def save_allocation_data(self, job_card, allocation_data):
        """Save allocation data to a job card"""
        
        if not allocation:
            return job_card
        job_card.serial_number = allocation.get("serial_number", "")
        job_card.allocated_1 = allocation.get("allocation_1", "")
        job_card.count = allocation.get("count", "")
        job_card.consumed_length = allocation.get("consumed_length", "")
        job_card.inventory_length = allocation.get("inventory_length", "")
        job_card.available_length = allocation.get("available_length", "")
        job_card.pieces = allocation.get("pieces", "")
        job_card.cutting_loss = allocation.get("cutting_loss", "")
    
        # Calculate total length if needed
        try:
            length = float(job_card.length) if job_card.length else 0
            quantity = float(job_card.total_quantity) if job_card.total_quantity else 0
            job_card.total_length = str(length * quantity)
        except (TypeError, ValueError):
            job_card.total_length = "0"
    
        return job_card
        
    

    def get_job_card(self, request, job_id=None):
        try:
            if job_id:
                # Get single job card
                job = JobCard.objects.get(pk=job_id)
                row_data = self._format_row_data(job)
                return Response(row_data, status=status.HTTP_200_OK)
            else:
                # Get all job cards
                jobs = JobCard.objects.all()
                response_data = [self._format_row_data(job) for job in jobs]
                return Response(response_data, status=status.HTTP_200_OK)
                
        except JobCard.DoesNotExist:
            return Response({"error": "Job card not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def _format_row_data(self, job):
        """Format the job card data into key-value pairs"""
        return {
            "mark_no": job.mark_no or "",
            "section":  job.section or "",
            "length": job.length or "",
            "width": job.width or "",
            "unit": job.unit or "",
            "wt_and_pcs":  job.wt_and_pcs or "",
            "total_quantity": job.total_quantity or "",
            "total_weight": job.total_weight or "",
        }



    def get_allocation_data(self, request, job_id=None):
        try:
            if job_id:
                job = JobCard.objects.get(pk=job_id)
                allocation_data = self._get_allocation_data([job])
                return Response(allocation_data[0] if allocation_data else {}, 
                              status=status.HTTP_200_OK)
            else:
                jobs = JobCard.objects.all().order_by('section')
                section_groups = {}
                for job in jobs:
                    if job.section not in section_groups:
                        section_groups[job.section] = []
                    section_groups[job.section].append(job)
                
                response_data = []
                for section, section_jobs in section_groups.items():
                    response_data.extend(self._get_allocation_data(section_jobs[:2]))
                
                return Response(response_data, status=status.HTTP_200_OK)
                
        except JobCard.DoesNotExist:
            return Response({"error": "Job card not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def _get_allocation_data(self, section_jobs):
        """Generate allocation data with descriptive keys"""
    
        # Fetch inventory data from related ItemMaster model
        inventory_data = InventoryItem.objects.select_related('item_id').values_list(
            "id", "item_id__name", "item_id__length"
        )
    
        allocation_data = []
    
        for i, job in enumerate(section_jobs):
            try:
                job_length = float(job.length)
            except (TypeError, ValueError):
                job_length = None
    
            # Find matching inventory length by comparing section name with item name
            matching_length = None
            for _, item_name, inv_length in inventory_data:
                if item_name == job.section:
                    try:
                        matching_length = float(inv_length)
                    except (TypeError, ValueError):
                        matching_length = None
                    break
    
            # Calculate values if lengths are valid
            if job_length and matching_length and job_length > 0:
                count = int(matching_length // job_length)
                cutting_loss = matching_length - (count * job_length)
                consumed_length = count * job_length
            else:
                count = cutting_loss = consumed_length = ''
    
            try:
                pcs = round(float(job.total_quantity) / count, 2) if count else ""
            except (TypeError, ValueError, ZeroDivisionError):
                pcs = ""
    
            allocation_data.append({
                "serial_number": i + 1,              # D
                "allocation_1": job.length or "",    # E
                "count": count,                      # F
                "consumed_length": consumed_length,  # M
                "inventory_length": matching_length, # N
                "pieces": pcs,                       # O
                "cutting_loss": cutting_loss,        # P
                "quantity": job.total_quantity or "" # Q
            })
    
        return allocation_data  



    def get_header(self, request):
        job_cards = JobCard.objects.all()
        if not job_cards:
            return Response({"error": "No job cards found"}, status=status.HTTP_404_NOT_FOUND)
        
        # Group by section
        section_groups = defaultdict(list)
        for job in job_cards:
            serializer = GetJobCardSerializer(job)
            section_groups[job.section].append(serializer.data)
        
        # Format the response
        response_data = []
        for section, jobs in section_groups.items():
            section_data = {
                "jobs": []
            }
            
            for job in jobs:
                job_details = {
                    "Job Order No": job.get('Job_order_no', 'N/A'),
                    "Client": job.get('client_name', 'N/A'),
                    "Project": job.get('project_name', 'N/A'),
                    "Type of Tower": job.get('type_of_tower', 'N/A'),
                    "Instruction": "Please fabricate the following Mark Nos. against with Mass Production.",
                    "Release Date": job.get('release_date', 'N/A'),
                    "JC No": job.get('jc_no', 'N/A')
                }
                section_data["jobs"].append(job_details)
            
            response_data.append(section_data)
        
        return Response(response_data, status=status.HTTP_200_OK)  
        
        
        
        
        
        
    def get_list_of_job_card(self, request):
    
        job_cards = JobCard.objects.all()
        serializer = JobCardMinimalSerializer(job_cards, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)    
        
        
        
        
    def get_job_card_by_id(self, request):
    
        job_card_id = request.GET.get('id')
    
        if not job_card_id:
            return Response({"error": "ID is required"}, status=status.HTTP_400_BAD_REQUEST)
    
        try:
            job_card = JobCard.objects.get(id=job_card_id)
        except JobCard.DoesNotExist:
            return Response({"error": "JobCard not found"}, status=status.HTTP_404_NOT_FOUND)
    
        serializer = CreateJobCardSerializer(job_card)
        return Response(serializer.data, status=status.HTTP_200_OK)         
            
 