import json

from django.views.decorators.http import require_http_methods
from django.shortcuts import render
from django.http import JsonResponse

from app.builders.recipes_builders import build_recipes_table
from app.configs import ModalConfig, SelectConfig
from app.forms import AddIngredientForm
from app.models import Ingredient, Recipe


@require_http_methods(["GET"])
def list_recipes(request):
    recipes_table_config = build_recipes_table()

    add_recipe_modal_config = ModalConfig(
        modal_id='addRecipeModal',
        modal_class='add-recipe-modal',
        content=AddIngredientForm(),
        title='Add recipe',
        form_class='add-recipe-form'
    )

    add_recipe_select_ingredient = SelectConfig(
        queryset=Ingredient.objects.all(),
        options_field='name',
        klass="select-ingredients",
        live_search_placeholder="Search ingredients",
        title="Select ingredient to add it"
    )

    return render(request, 'app/recipes.html', {
        'recipes_table_config': recipes_table_config,
        'add_recipe_modal_config': add_recipe_modal_config,
        'add_recipe_select_ingredient': add_recipe_select_ingredient
    })

@require_http_methods(["GET"])
def get_recipes_as_json(request):
    recipes = Recipe.objects.all()
    ingredients = Ingredient.objects.all()
    response = json.dumps({
        'recipes': [recipe.to_dict() for recipe in recipes],
        'ingredients': [ingredient.to_json() for ingredient in ingredients]
    })
    import pdb; pdb.set_trace()
    try:
        return JsonResponse(response, status=200, safe=False)
    except Exception as exc:
        return JsonResponse({}, status=400)