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
    icon_class = ""
    tooltip = False
    tooltip_title = ""


class ColumnConfig(ConfigInitChecker):
    __name__ = "ColumnConfig"

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

    table_name = ""
    columns = []
    editable = False
    edit_actions = []

    queryset = None

    def set_column_configs(self, column_configs=[]):
        self.columns = column_configs


class SelectConfig(ConfigInitChecker):
    __name__ = "SelectConfig"

    options_field = ""
    klass = ""
    type = "basic"
    live_search = True
    live_search_placeholder = "Search items"
    mobile = True
    queryset = None