import json

from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required, user_passes_test
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse

from app.builders.users_builders import build_users_table
from app.configs import ModalConfig, SelectConfig, FormConfig, DetailTableConfig
from app.forms import AddRecipeForm
from app.models import User
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

    return render(request, 'app/users/users.html', {
        'users_table_config': users_table_config,
        'add_user_modal_config': add_user_modal_config,
    })

@login_required
@require_http_methods(["GET"])
def user_details(request, user_id):
    user = get_object_or_404(User, pk=user_id)

    user_details_table_config = DetailTableConfig(
        data_dictionary=user.to_dict(),
        title="Profile info"
    )

    return render(request, 'app/users/user_details.html', {
        'user_details_table_config': user_details_table_config
    })