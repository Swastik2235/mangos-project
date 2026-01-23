from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import viewsets, status
from setup.models import Workflow, Step
from setup.serializers.workflow_serializers import WorkflowSerializer

class WorkflowViewSet(viewsets.ModelViewSet):
    serializer_class = WorkflowSerializer
    
    def get_all_workflows(self,request):
        try:
            workflows = Workflow.objects.all()
            serializer = WorkflowSerializer(workflows, many=True)
            return JsonResponse({
                "success": True,
                "data": serializer.data
            }, status=status.HTTP_200_OK)
        
        except Exception as e:
            return JsonResponse({
                "success": False,
                "message": "Failed to fetch workflows",
                "error": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            
    def add_workflow(self, request):
      try:
          data = request.data
  
          name = data.get("name")
          description = data.get("description", "")
          step_1 = data.get("step_1")
          step_2 = data.get("step_2")
          step_3 = data.get("step_3")
          step_4 = data.get("step_4")
          step_5 = data.get("step_5")
  
          # Validate name
          if not name:
              return JsonResponse({
                  "success": False,
                  "message": "Workflow name is required."
              }, status=status.HTTP_400_BAD_REQUEST)
  
          # Validate all steps
          if not all([step_1, step_2, step_3, step_4, step_5]):
              return JsonResponse({
                  "success": False,
                  "message": "Please select 5 steps (step_1 to step_5)."
              }, status=status.HTTP_400_BAD_REQUEST)
  
          # Fetch and validate step objects
          step_ids = [step_1, step_2, step_3, step_4, step_5]
          steps = Step.objects.filter(id__in=step_ids)
          if steps.count() != 5:
              return JsonResponse({
                  "success": False,
                  "message": "Invalid step IDs. Please ensure all 5 selected steps are valid."
              }, status=status.HTTP_400_BAD_REQUEST)
  
          # Create Workflow
          workflow = Workflow.objects.create(
              name=name,
              description=description,
              step_1_id=step_1,
              step_2_id=step_2,
              step_3_id=step_3,
              step_4_id=step_4,
              step_5_id=step_5
          )
  
          # Create a lookup dict for step names
          step_lookup = {str(step.id): step.name for step in steps}
  
          return JsonResponse({
              "success": True,
              "message": "Workflow created successfully!",
              "data": {
                  "id": workflow.id,
                  "name": workflow.name,
                  "description": workflow.description,
                  "created_at": workflow.created_at,
                  "updated_at": workflow.updated_at,
                  "step_1": {
                      "id": step_1,
                      "name": step_lookup.get(str(step_1))
                  },
                  "step_2": {
                      "id": step_2,
                      "name": step_lookup.get(str(step_2))
                  },
                  "step_3": {
                      "id": step_3,
                      "name": step_lookup.get(str(step_3))
                  },
                  "step_4": {
                      "id": step_4,
                      "name": step_lookup.get(str(step_4))
                  },
                  "step_5": {
                      "id": step_5,
                      "name": step_lookup.get(str(step_5))
                  }
              }
          }, status=status.HTTP_201_CREATED)
  
      except Exception as e:
          return JsonResponse({
              "success": False,
              "message": "Something went wrong while creating the workflow.",
              "error": str(e)
          }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
