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


class Date(Model):
    """ Abstract class to store common attributes for all 'app' models.

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
            'proteins': self.proteins,
            'fats': self.fats,
            'fibers': self.fibers,
            'kcals': self.kcals,
            'carbohydrates': self.carbohydrates,
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
        ]
    )

    nutrient = ForeignKey(Nutrient, on_delete=PROTECT, related_name='ingredient', null=True, blank=True)

    class Meta:
        db_table = 'ingredients'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'nutrient': self.nutrient.to_dict()
        }


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

    def save(self, *args, **kwargs):
        super(Recipe, self).save(*args, **kwargs)
        self._calculate_ingredients()