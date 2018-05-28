from .ingredients_builders import build_edit_ingredient_icon, build_remove_ingredient_icon,\
    build_cancel_ingredient_edit_icon, build_confirm_ingredient_edit_icon

from app.configs import ModalConfig, TableConfig, IconConfig, ColumnConfig
from app.models import Recipe


def build_edit_recipe_icon():
    return build_edit_ingredient_icon()


def build_remove_recipe_icon():
    return build_remove_ingredient_icon()


def build_confirm_recipe_edit_icon():
    return build_confirm_ingredient_edit_icon()


def build_cancel_recipe_edit_icon():
    return build_cancel_ingredient_edit_icon()

def build_recipes_table():
    confirm_edit_icon = build_confirm_ingredient_edit_icon()
    cancel_edit_icon = build_cancel_ingredient_edit_icon()

    edit_icon = build_edit_ingredient_icon()
    remove_icon = build_remove_ingredient_icon()

    ingredients_table = TableConfig(
        table_name="recipes-table",
        edit_actions = [confirm_edit_icon, cancel_edit_icon],
        editable=True,
        queryset=Recipe.objects.all()
    )

    ingredient_name_column = ColumnConfig(
        title="Name",
        field="name",
        data_classes="table-col table-data-left",
        responsive_classes="col-xs-12 col-sm-6 col-md-6",
        mobile_toggler_column = True
    )

    kcals_column = ColumnConfig(
        title="Kcals",
        field="kcals",
        responsive_classes="col-xs-12 col-sm-1 col-md-1",
    )

    proteins_column = ColumnConfig(
        title="Proteins",
        field="proteins",
        responsive_classes="col-xs-12 col-sm-1 col-md-1",
    )

    carbohydrates_column = ColumnConfig(
        title="Carbs",
        field="carbohydrates",
        responsive_classes="col-xs-12 col-sm-1 col-md-1",
    )

    fats_column = ColumnConfig(
        title="Fats",
        field="fats",
        responsive_classes="col-xs-12 col-sm-1 col-md-1"
    )

    fibers_column = ColumnConfig(
        title="Fibers",
        field="fibers",
        responsive_classes="col-xs-12 col-sm-1 col-md-1"
    )

    actions_column = ColumnConfig(
        title="Actions",
        actions=[edit_icon, remove_icon],
        responsive_classes="col-xs-1 col-sm-1 col-md-1",
    )

    ingredients_table.set_column_configs([
        ingredient_name_column,
        kcals_column,
        proteins_column,
        carbohydrates_column,
        fats_column,
        fibers_column,
        actions_column
    ])

    return ingredients_table