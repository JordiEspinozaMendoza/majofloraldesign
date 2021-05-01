from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from django.contrib.auth.models import User
from base.models import Product, Categorie
from base.serializers import ProductSerializer

from rest_framework import status


@api_view(['GET'])
def getProducts(request, cat, query, page):
    try:
        if query == 'all':
            if cat == "all":
                products = Product.objects.all()
                paginator = Paginator(products, 8)
                products = paginator.page(page)
                serializer = ProductSerializer(products, many=True)
                return Response({"products": serializer.data, 'pages': paginator.num_pages})
            else:
                products = Product.objects.filter(category=cat)
                paginator = Paginator(products, 8)
                products = paginator.page(page)
                serializer = ProductSerializer(products, many=True)
                return Response({"products": serializer.data, 'pages': paginator.num_pages})
        else:
            products = Product.objects.filter(name__icontaints=query)
            paginator = Paginator(products, 8)
            products = paginator.page(page)
            serializer = ProductSerializer(products, many=True)
            return Response({"products": serializer.data, 'pages': paginator.num_pages})

    except Exception as e:
        print('Error details: ' + ' ' + str(e))
        message = {'detail': 'Something bad happen'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getProduct(request, pk):
    try:
        product = Product.objects.get(_id=pk)
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)
    except Exception as e:
        print('Error details: ' + ' ' + str(e))
        message = {'detail': 'Something bad happen'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    try:
        product = Product.objects.create(
            name='Sample Name',
            price=0,
            description='',
            inStock=0,
        )
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)

    except Exception as e:
        print('Error details: ' + ' ' + str(e))
        message = {'detail': 'Something bad happen'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    try:
        product = Product.objects.get(_id=pk)
        product.delete()
        return Response({'detail': 'Producto eliminado correctamente'})
    except Exception as e:
        print('Error details: ' + ' ' + str(e))
        message = {'detail': 'Something bad happen'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    try:
        data = request.data
        product = Product.objects.get(_id=pk)
        print(data)
        product.name = data['name']
        product.description = data['description']
        product.price = data['price']
        if data['category'] != 'undefined':
            product.category = Categorie.objects.get(_id=data['category'])
        else:
            product.category = None
        product.inStock = data['inStock']

        product.save()

        return Response({'detail': 'Producto actualizado correctamente'})

    except Exception as e:
        print('Error details: ' + ' ' + str(e))
        message = {'detail': 'Something bad happen'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def uploadImage(request):
    try:
        data = request.data
        product_id = data['product_id']
        product = Product.objects.get(_id=product_id)

        product.img = request.FILES.get('image')
        product.save()

        return Response('Imagen actualizada correctamente')

    except Exception as e:
        print('Error details: ' + ' ' + str(e))
        message = {'detail': 'Something bad happen'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
