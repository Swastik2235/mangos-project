from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import viewsets, status
from setup.models import Step
from setup.serializers.steps_serializers import StepSerializer

class StepViewSet(viewsets.ModelViewSet):
    serializer_class = StepSerializer
    
    def get_all_steps(self,request):
        try:
            steps = Step.objects.all()
            serializer = StepSerializer(steps, many=True)
            return JsonResponse({
                "success": True,
                "data": serializer.data
            }, status=status.HTTP_200_OK)
        
        except Exception as e:
            return JsonResponse({
                "success": False,
                "message": "Failed to fetch steps",
                "error": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
    def add_step(self, request):
        try:
            name = request.data.get("name")
            process_type = request.data.get("process_type", "")
            step_descr = request.data.get("step_descr", "")
            order = request.data.get("order")

            if not name:
                return JsonResponse({
                    "success": False,
                    "message": "Name is required to create a step."
                }, status=status.HTTP_400_BAD_REQUEST)

            step = Step.objects.create(
                name=name,
                process_type=process_type,
                step_descr=step_descr,
                order=order
            )
            serializer = StepSerializer(step)

            return JsonResponse({
                "success": True,
                "message": "Step created successfully.",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return JsonResponse({
                "success": False,
                "message": "Failed to create step.",
                "error": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)