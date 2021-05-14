from django.urls import path
from base.views import product_views as views

urlpatterns = [
    path('upload/', views.uploadImage, name='upload'),
    path('create/', views.createProduct, name='create-product'),

    path('getproduct/<str:pk>/', views.getProduct, name='get-product'),
    path('getproducts/<str:query>/<str:cat>/<str:page>/<str:order>/',
         views.getProducts, name='get-products'),

    path('delete/<str:pk>/', views.deleteProduct, name='delete-product'),
    path('update/<str:pk>/', views.updateProduct, name='update-product')

]
