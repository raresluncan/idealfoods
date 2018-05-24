from django.views.decorators.http import require_http_methods
from django.shortcuts import render

from app.builders.recipes_builders import build_recipes_table
from app.configs import ModalConfig, SelectConfig
from app.forms import AddIngredientForm
from app.models import Ingredient


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

    sc = SelectConfig(
        queryset=Ingredient.objects.all(),
        options_field='name',
        klass="select-ingredients"
    )

    return render(request, 'app/recipes.html', {
        'recipes_table_config': recipes_table_config,
        'add_recipe_modal_config': add_recipe_modal_config,
        'sc': sc
    })