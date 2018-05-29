from __future__ import unicode_literals
import datetime
from django.db.models import Model, CharField, IntegerField, ForeignKey, \
    BooleanField, DateTimeField, EmailField, DateField, CASCADE, SET_NULL, \
    PositiveIntegerField, DecimalField, PROTECT, ManyToManyField
from django.core.validators import EmailValidator, MaxLengthValidator, \
    MinLengthValidator, URLValidator, MaxValueValidator, MinValueValidator
from django.utils import timezone
from django.conf import settings
from django.contrib.auth import models
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.postgres.fields import JSONField
from django.db.models import ProtectedError
from django.contrib.auth.models import AbstractBaseUser

from managers.user import UserManager

class Date(Model):
    """ Abstract class to store common attributes for all 'app' models

        Use: Inherit from this class if you want your data timestamped at
        creation and at each update. """

    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)

    class Meta():
        abstract = True


class Nutrient(Date):
    """ This class contains nutrients for ingredients """

    proteins = DecimalField(
        default=0.00,
        max_digits=6,
        decimal_places=2,
        validators = [MaxValueValidator(1000), MinValueValidator(0)]
    )

    carbohydrates = DecimalField(
        default=0.00,
        max_digits=6,
        decimal_places=2,
        validators = [MaxValueValidator(1000), MinValueValidator(0)]
    )

    fats = DecimalField(
        default=0.00,
        max_digits=6,
        decimal_places=2,
        validators = [MaxValueValidator(1000), MinValueValidator(0)]
    )

    fibers = DecimalField(
        default=0.00,
        max_digits=6,
        decimal_places=2,
        validators = [MaxValueValidator(1000), MinValueValidator(0)]
    )

    kcals = DecimalField(
        default=0.00,
        max_digits=7,
        decimal_places=2,
        validators = [MaxValueValidator(10000), MinValueValidator(0)]
    )

    def to_dict(self):
        return {
            'id': self.id,
            'proteins': self.proteins,
            'fats': self.fats,
            'fibers': self.fibers,
            'kcals': self.kcals,
            'carbohydrates': self.carbohydrates,
        }

    def to_json(self):
        return {
            'id': self.id,
            'proteins': str(self.proteins),
            'fats': str(self.fats),
            'fibers': str(self.fibers),
            'kcals': str(self.kcals),
            'carbohydrates': str(self.carbohydrates),
        }

    class Meta:
        db_table = 'nutrients'


class Ingredient(Date):
    """ This class contains ingredients used to make meals """

    name = CharField(
        max_length=32,
        validators=[
            MaxLengthValidator(32,  message="Ingredient name must contain at \
                               most 32 characters"),
            MinLengthValidator(2,   message="Ingredient name must contain at \
                               least 2 characters"),
        ],
        unique=True
    )

    nutrient = ForeignKey(Nutrient, on_delete=SET_NULL, related_name='ingredient', null=True, blank=True)

    class Meta:
        db_table = 'ingredients'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'nutrient': self.nutrient.to_dict()
        }

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'nutrient': self.nutrient.to_json()
        }

    def delete(self):
        nutrient = self.nutrient
        nutrient.delete()
        super(Ingredient, self).delete()

    def get_foreign_key_objects(self):
        return [self.nutrient]



class Recipe(Date):
    """ This class contains ingredients used to make meals """

    name = CharField(
        max_length=32,
        validators=[
            MaxLengthValidator(32,  message="Food name must contain at \
                               most 32 characters"),
            MinLengthValidator(2,   message="Ingredient name must contain at \
                               least 2 characters"),
        ]
    )

    ingredients = ManyToManyField(Ingredient, db_table='food_ingredients', related_name="recipes")
    nutrients = ForeignKey(Nutrient, on_delete=PROTECT, null=True, blank=True)

    def _calculate_ingredients(self):
        return

    def get_foreign_key_objects(self):
        return [self.nutrients, self.ingredients]

    def save(self, *args, **kwargs):
        super(Recipe, self).save(*args, **kwargs)
        self._calculate_ingredients()

    def get_ingredients(self):
        return Ingredient.objects.filter(
            id__in=Recipe.objects.values_list('ingredients', flat=True)
        )

    def to_dict(self):
        return dict({
            'id': self.id,
            'name': self.name,
            'ingredients': [
                ingredient.to_json() for ingredient in self.get_ingredients()
            ],
            'nutrients': self.nutrients.to_json()
        })


class User(AbstractBaseUser):
    """ defines a user model """

    class Meta:
        db_table = 'users'

    REGULAR_USER_LEVEL = 'regular_user'
    ADMIN_LEVEL = 'website_admin'
    SUPERADMIN_LEVEL = 'super_admin'

    USER_LEVELS = [
        (REGULAR_USER_LEVEL, 'Regular User'),
        (ADMIN_LEVEL, 'Company admin'),
        (SUPERADMIN_LEVEL, 'Super Admin')
    ]

    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = ['password', 'first_name', 'last_name']

    objects = UserManager()

    email = EmailField(max_length=64, unique=True)

    password = CharField(max_length=256)

    first_name = CharField(max_length=64)

    last_name = CharField(max_length=64)

    address = CharField(max_length=128, default=None, null=True, blank=True)

    level = CharField(
        max_length=32,
        default=REGULAR_USER_LEVEL,
        choices=USER_LEVELS
    )

    created_at = DateTimeField(auto_now_add=True)

    updated_at = DateTimeField(auto_now=True)

    def is_admin(self):
        return self.level == self.ADMIN_LEVEL

    def is_super_admin(self):
        return self.level == self.SUPERADMIN_LEVEL

    def is_regular_user(self):
        return self.level == self.REGULAR_USER_LEVELx

    def get_foreign_key_objects(self):
        pass