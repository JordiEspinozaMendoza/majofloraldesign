from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.models import Product, Categorie
from base.serializers import CategorieSerializer

from rest_framework import status


@api_view(['GET'])
def getCategories(request):
    try:
        categories = Categorie.objects.all()
        serializer = CategorieSerializer(categories, many=True)
        print("GET success")
        return Response(serializer.data)
    except Exception as e:
        print('Error details: '+str(e))
        message = {'detail': 'Something bad happened'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getCategorie(request, pk):
    try:
        category = Categorie.objects.get(_id=pk)
        serializer = CategorieSerializer(category, many=False)
        return Response(serializer.data)
    except Exception as e:
        print('Error details: '+str(e))
        message = {'detail': 'Something bad happened'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createCategorie(request):
    try:
        data = request.data
        category = Categorie.objects.create(
            name=data['name']
        )
        category.save()
        message = {'detail': 'Categoria creada correctamente'}
        return Response(message)
    except Exception as e:
        print('Error details: '+str(e))
        message = {'detail': 'Something bad happened'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateCategorie(request, pk):
    try:
        data = request.data
        category = Categorie.objects.get(_id=pk)
        category.name = data['name']
        category.save()
        message = {'detail': 'Categoria editada correctamente'}
        return Response(message)
    except Exception as e:
        print('Error details: '+str(e))
        message = {'detail': 'Something bad happened'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteCategorie(request, pk):
    try:
        category = Categorie.objects.filter(_id=pk)
        category.delete()
        message = {'detail': 'Categoria editada correctamente'}
        return Response(message)

    except Exception as e:
        print('Error details: '+str(e))
        message = {'detail': 'Something bad happened'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
