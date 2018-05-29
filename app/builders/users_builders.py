from .ingredients_builders import build_edit_ingredient_icon, build_remove_ingredient_icon,\
    build_cancel_ingredient_edit_icon, build_confirm_ingredient_edit_icon

from app.configs import ModalConfig, TableConfig, IconConfig, ColumnConfig
from app.models import User

def build_view_details_icon():
    return IconConfig(
        icon_class = 'glyphicon glyphicon-list-alt table-icon icon-details',
        tooltip = True,
        tooltip_title = "Details"
    )

def build_users_table():
    confirm_edit_icon = build_confirm_ingredient_edit_icon()
    cancel_edit_icon = build_cancel_ingredient_edit_icon()

    edit_icon = build_edit_ingredient_icon()
    remove_icon = build_remove_ingredient_icon()

    view_details_icon = build_view_details_icon()

    ingredients_table = TableConfig(
        table_name="users-table",
        edit_actions = [confirm_edit_icon, cancel_edit_icon],
        editable=True,
        queryset=User.objects.all(),
        has_foreign_keys=False
    )

    user_email_column = ColumnConfig(
        title="Email",
        field="email",
        data_classes="table-col table-data-left",
        responsive_classes="col-xs-12 col-sm-3 col-md-3",
        mobile_toggler_column = True
    )

    first_name_column = ColumnConfig(
        title="Surname",
        field="first_name",
        responsive_classes="col-xs-12 col-sm-2 col-md-2",
    )

    last_name_column = ColumnConfig(
        title="Name",
        field="last_name",
        responsive_classes="col-xs-12 col-sm-2 col-md-2",
    )

    address_column = ColumnConfig(
        title="Address",
        field="address",
        responsive_classes="col-xs-12 col-sm-3 col-md-2",
    )

    level_column = ColumnConfig(
        title="Level",
        field="level",
        responsive_classes="col-xs-12 hidden-sm col-md-1"
    )

    actions_column = ColumnConfig(
        title="Actions",
        actions=[view_details_icon, edit_icon, remove_icon],
        responsive_classes="col-xs-12 col-sm-3 col-md-2",
    )

    ingredients_table.set_column_configs([
        user_email_column,
        first_name_column,
        last_name_column,
        address_column,
        level_column,
        actions_column,
    ])

    return ingredients_table