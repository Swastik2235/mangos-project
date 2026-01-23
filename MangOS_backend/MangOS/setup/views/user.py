  
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from setup.models import Employee
from setup.serializers.user_serializers import RegisterSerializer, LoginSerializer, ForgotPasswordSerializer, SetNewPasswordSerializer
from django.contrib.auth.hashers import check_password, make_password

class RegisterView(viewsets.ModelViewSet):

    queryset = Employee.objects.all()
    serializer_class = RegisterSerializer

    def register_user(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Account created successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        

class LoginView(viewsets.ModelViewSet):

    queryset = Employee.objects.all()
    serializer_class = LoginSerializer

    def login_user(self, request):
    
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            designation = serializer.validated_data['designation']
            try:
                user = Employee.objects.get(email=email, designation=designation)
                if check_password(password, user.password):
                    return Response({
                        'message': 'Login successful',
                        'employee_id': user.id,
                        'designation': user.designation
                    }, status=status.HTTP_200_OK)
                return Response({'error': 'Invalid password'}, status=status.HTTP_401_UNAUTHORIZED)
            except Employee.DoesNotExist:
                return Response({'error': 'User not found or incorrect designation'}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    
    
    
    
    
    
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = Employee.objects.get(email=serializer.validated_data['email'])
                if check_password(serializer.validated_data['password'], user.password):
                    return Response({
                        'message': 'Login successful',
                        'employee_id': user.id,
                        'designation': user.designation
                    })
                return Response({'error': 'Invalid password'}, status=status.HTTP_401_UNAUTHORIZED)
            except Employee.DoesNotExist:
                return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
        
        

class ForgotPasswordView(viewsets.ModelViewSet):

    queryset = Employee.objects.all()
    serializer_class = ForgotPasswordSerializer

    def forgot_password(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = Employee.objects.get(password=serializer.validated_data['password'])
                # Normally you'd send email here; for demo:
                return Response({'message': f"Password reset allowed for {user.email}"})
            except Employee.DoesNotExist:
                return Response({'error': 'Email not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
        

class SetNewPasswordView(viewsets.ModelViewSet):

    queryset = Employee.objects.all()
    serializer_class = SetNewPasswordSerializer


    def set_new_password(self, request):
        serializer = SetNewPasswordSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = Employee.objects.get(email=serializer.validated_data['email'])
                user.password = make_password(serializer.validated_data['new_password'])
                user.save()
                return Response({'message': 'Password updated successfully'})
            except Employee.DoesNotExist:
                return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  
        
        
        