from django.forms import CharField, ModelForm
from app.models import Nutrient

class AddIngredientForm(ModelForm):
    """ a form for adding a new project.If the validation doesn't raise any
        exceptions a new project object is saved to the database """

    name = CharField(max_length=32)

    class Meta:
        model = Nutrient
        fields = ('name','kcals', 'proteins', 'carbohydrates', 'fats', 'fibers')
        labels = {
            'kcals': 'Kilocalories',
            'proteins': 'Proteins',
            'carbohydrates': 'Carbs',
            'fats': 'Fats',
            'fibers': 'Fibers',
        }
        # error_messages = {
        #     'name': {
        #         'max_length': "Name must be at most 32 characters",
        #         'min_length': "Name must be at least 3 characters",
        #     },
        #     'description': {
        #         'max_length': "Description must be at most 1024 characters",
        #     },
        # }

class AddNutrientForm(ModelForm):
    class Meta(AddIngredientForm.Meta):
        fields = ('kcals', 'proteins', 'carbohydrates', 'fats', 'fibers')