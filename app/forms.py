from django.forms import CharField, ModelForm
from app.models import Nutrient, Ingredient, Recipe
from django.core.validators import MaxLengthValidator, MinLengthValidator

class AddIngredientForm(ModelForm):
    """ a form for adding a new project.If the validation doesn't raise any
        exceptions a new project object is saved to the database """

    name = CharField(max_length=32, validators=[
        MaxLengthValidator(32, 'Ingredient name must be at most 32 characters.'),
        MinLengthValidator(2, 'Ingredient name must be at least 2 characters.'),
    ])

    class Meta:
        model = Nutrient
        fields = ('name', 'kcals', 'proteins', 'carbohydrates', 'fats', 'fibers')
        labels = {
            'kcals': 'Kilocalories',
            'proteins': 'Proteins',
            'carbohydrates': 'Carbs',
            'fats': 'Fats',
            'fibers': 'Fibers',
        }
        error_messages = {
            'name': {
                'max_length': "Name must be at most 32 characters",
                'min_length': "Name must be at least 3 characters",
                'required': "Name is required for an ingredient."
            },
            'kcals': {
                'required': "Kilocalories are required.",
                'max_value': "Kilocalories can't be over 10000.",
                'min_value': "Nutrients can't be negative.",
                'max_decimal_places': "Nutrients must have at most 2 decimals.",
                'max_whole_digits': "Kilocalories can't be over 10000.",
                'invalid': 'This field is invalid.',
            },
            'proteins': {
                'required': "Proteins are required.",
                'max_value': "Proteins can't be over 1000.",
                'min_value': "Nutrients can't be negative.",
                'max_decimal_places': "Nutrients must have at most 2 decimals.",
                'max_whole_digits': "Proteins can't be over 1000.",
                'invalid': 'This field is invalid.',
            },
            'fats': {
                'required': "Fats are required.",
                'max_value': "Fats can't be over 1000.",
                'min_value': "Nutrients can't be negative.",
                'max_decimal_places': "Nutrients must have at most 2 decimals.",
                'max_whole_digits': "Fats can't be over 1000.",
                'invalid': 'This field is invalid.',
            },
            'fibers': {
                'required': "Fibers are required.",
                'max_value': "Fibers can't be over 1000.",
                'min_value': "Nutrients can't be negative.",
                'max_decimal_places': "Nutrients must have at most 2 decimals.",
                'max_whole_digits': "Fibers can't be over 1000.",
                'invalid': 'This field is invalid.',
            },
            'carbohydrates': {
                'required': "Carbohydrates are required.",
                'max_value': "Carbohydrates can't be over 1000.",
                'min_value': "Nutrients can't be negative.",
                'max_decimal_places': "Nutrients must have at most 2 decimals.",
                'max_whole_digits': "Carbohydrates can't be over 1000.",
                'invalid': 'This field is invalid.',
            },
        }


class AddRecipeForm(ModelForm):
    """ a form for adding a new project.If the validation doesn't raise any
        exceptions a new project object is saved to the database """

    name = CharField(max_length=32, validators=[
        MaxLengthValidator(32, 'Recipe name must be at most 32 characters.'),
        MinLengthValidator(2, 'Recipe name must be at least 2 characters.'),
    ])

    class Meta:
        model = Recipe
        fields = ('name',)

        labels = {
            'name': 'Name'
        }
        error_messages = {
            'name': {
                'max_length': "Name must be at most 32 characters",
                'min_length': "Name must be at least 3 characters",
                'required': "Name is required for an ingredient."
            },
        }