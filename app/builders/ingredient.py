from app.configs import ModalConfig, IconConfig

def build_edit_ingredient_icon():
    return IconConfig(
        icon_class = 'glyphicon glyphicon-pencil table-icon icon-edit',
        tooltip = True,
        tooltip_title = "Edit"
    )

def build_remove_ingredient_icon():
    return IconConfig(
        icon_class = 'glyphicon glyphicon-remove table-icon icon-remove',
        tooltip = True,
        tooltip_title = "Remove"
    )