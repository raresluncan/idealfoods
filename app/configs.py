class ConfigInitChecker(object):
    def __init__(self, *args, **kwargs):
        for arg in kwargs:
            if hasattr(self, arg):
                setattr(self, arg, kwargs[arg])
            else:
                raise KeyError('Arg ' + arg + ' is not allowed for ' \
                               + self.__name__)


class ModalConfig(ConfigInitChecker):
    __name__ = "ModalConfig"
    partial_path = "app/partials/modal.html"

    modal_class = ""
    form_class = ""
    modal_id = ""
    title = None
    confirm_button_text = "Submit"
    cancel_button_text = "Cancel"
    confirm_button_class = "btn btn-success pull-left add-ingredient-submit"
    cancel_button_class = "btn btn-default"
    content = "no-content"


class IconConfig(ConfigInitChecker):
    __name__ = "IconConfig"
    partial_path = "app/partials/select/_icon.html"

    icon_class = ""
    tooltip = False
    tooltip_title = ""


class ColumnConfig(ConfigInitChecker):
    __name__ = "ColumnConfig"
    partial_path = ""

    title = ""
    field = ""
    actions = None

    header_classes = "th table-col table-data-center"
    data_classes = "table-col table-data-center"
    responsive_classes = ""
    edit_responsive_classes = ""

    mobile_toggler_column = False


class TableConfig(ConfigInitChecker):
    __name__ = "TableConfig"
    partial_path = ""

    table_name = ""
    columns = []
    editable = False
    edit_actions = []

    queryset = None

    def set_column_configs(self, column_configs=[]):
        self.columns = column_configs


class SelectConfig(ConfigInitChecker):
    __name__ = "SelectConfig"
    partial_path = "app/partials/select.html"

    options_field = ""
    klass = ""
    type = "basic"
    live_search = True
    live_search_placeholder = "Search items"
    mobile = True
    queryset = None
    live_search_style = "contains"
    header = False
    title = "Select an item"
    wrapper_title = "Select"


class FormConfig(ConfigInitChecker):
    partial_path = "app/partials/form.html"
    form = None