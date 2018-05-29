import json

from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required, user_passes_test
from django.shortcuts import render
from django.http import JsonResponse

from app.builders.users_builders import build_users_table
from app.configs import ModalConfig, SelectConfig, FormConfig
from app.forms import AddRecipeForm
from app.models import Ingredient, Recipe
from app.helper_functions import is_super_admin, is_admin

@login_required
@user_passes_test(is_super_admin, login_url='/login/')
@require_http_methods(["GET"])
def list_users(request):
    users_table_config = build_users_table()

    add_user_form_config = FormConfig(
        form=AddRecipeForm()
    )

    add_user_modal_config = ModalConfig(
        modal_id='addUserModal',
        modal_class='add-user-modal',
        content=[add_user_form_config],
        title='Add user',
        form_class='add-user-form'
    )

    return render(request, 'app/users.html', {
        'users_table_config': users_table_config,
        'add_user_modal_config': add_user_modal_config,
    })