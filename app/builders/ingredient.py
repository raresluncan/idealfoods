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

def build_confirm_ingredient_edit_icon():
    return IconConfig(
        icon_class = 'glyphicon glyphicon-ok-circle table-icon big-icon icon-edit-ok',
        tooltip = True,
        tooltip_title = "Confirm"
    )

def build_cancel_ingredient_edit_icon():
    return IconConfig(
        icon_class = 'glyphicon glyphicon-remove-circle table-icon big-icon icon-edit-cancel',
        tooltip = True,
        tooltip_title = "Cancel"
    )