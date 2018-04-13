from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods

from app.models import Ingredient, Nutrient
from app.configs import ModalConfig
from app.forms import AddIngredientForm, AddNutrientForm


@require_http_methods(["GET"])
def list_ingredients(request):
    add_ingredient_modal_config = ModalConfig(
        modal_id="addIngredientModal",
        modal_class="add-ingredient-modal",
        content=AddIngredientForm(),
        title="Add ingredient",
        form_class="add-ingredient-form"
    )

    return render(request, 'app/ingredients.html', {
        'add_ingredient_modal_config': add_ingredient_modal_config,
        'ingredients': Ingredient.objects.all(),

    })

@require_http_methods(['POST'])
def create_ingredients(request):
    post_data = request.POST.copy()
    ingredient_name = post_data.pop('name')
    
    import pdb; pdb.set_trace()