from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from rest_framework.authentication import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import views

from .models import ApplicationUser
from .serializers import UserSerializer


class Register(views.APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Login(views.APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = None
        if '@' in email:
            try:
                user = ApplicationUser.objects.get(email=email)
            except ObjectDoesNotExist:
                print('invalid email')

        if not user:
            user = authenticate(email=email, password=password)

        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class Logout(views.APIView):
    def get(self, request, format=None):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)
