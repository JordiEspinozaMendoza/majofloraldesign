from django.db import models
from cloudinary.models import CloudinaryField


class Categorie(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(decimal_places=2, max_digits=8)
    category = models.ForeignKey(
        Categorie, blank=True, related_name='categories', on_delete=models.SET_NULL, null=True)
    inStock = models.BooleanField(blank=True)
    _id = models.AutoField(primary_key=True, editable=False)
    img = CloudinaryField('image')
    img2 = CloudinaryField('image')

    def __str__(self):
        return self.name
