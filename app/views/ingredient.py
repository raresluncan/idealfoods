from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from django.template import loader
from django.db import IntegrityError
from django.db.models import ProtectedError

from app.models import Ingredient, Nutrient
from app.configs import ModalConfig, IconConfig
from app.forms import AddIngredientForm

from app.builders.ingredient import build_edit_ingredient_icon, \
    build_remove_ingredient_icon, build_cancel_ingredient_edit_icon, \
    build_confirm_ingredient_edit_icon


@require_http_methods(["GET"])
def list_ingredients(request):
    edit_icon = build_edit_ingredient_icon()
    remove_icon = build_remove_ingredient_icon()
    confirm_edit_icon = build_confirm_ingredient_edit_icon()
    cancel_edit_icon = build_cancel_ingredient_edit_icon()

    add_ingredient_modal_config = ModalConfig(
        modal_id='addIngredientModal',
        modal_class='add-ingredient-modal',
        content=AddIngredientForm(),
        title='Add ingredient',
        form_class='add-ingredient-form'
    )

    return render(request, 'app/ingredients.html', {
        'add_ingredient_modal_config': add_ingredient_modal_config,
        'ingredients': Ingredient.objects.all(),
        'remove_icon_config': remove_icon,
        'edit_icon_config': edit_icon,
        'confirm_edit_icon_config': confirm_edit_icon,
        'cancel_edit_icon_config': cancel_edit_icon,
    })


@require_http_methods(['POST'])
def create_ingredients(request):
    add_ingredient_form = AddIngredientForm(request.POST)
    edit_icon = build_edit_ingredient_icon()
    remove_icon = build_remove_ingredient_icon()

    if add_ingredient_form.is_valid():
        ingredient_name = add_ingredient_form.cleaned_data['name']
        add_ingredient_form.fields.pop('name')
        nutrient = add_ingredient_form.save()
        ingredient = Ingredient(name=ingredient_name, nutrient=nutrient)
        try:
            ingredient.save()

            edit_icon_html = loader.get_template('app/partials/_icon.html').\
                render({'config': edit_icon})
            remove_icon_html = loader.get_template('app/partials/_icon.html').\
                render({'config': remove_icon})

            return JsonResponse({
                'ingredient': ingredient.to_dict(),
                'ingredient_actions': edit_icon_html + remove_icon_html
            })
        except IntegrityError:
            return JsonResponse({
                'errors': {'name': [u'Ingredient already exists.']}
            }, status=400)
    return JsonResponse({'errors': add_ingredient_form.errors}, status=400)


@require_http_methods(['DELETE'])
def delete_ingredients(request, ingredient_id):
    try:
        ingredient = Ingredient.objects.get(id=ingredient_id);
    except Ingredient.DoesNotExist:
        return JsonResponse({}, status=404)
    try:
        ingredient.delete()
    except ProtectedError:
        return JsonResponse({}, status=422)
    return JsonResponse({}, status=204)