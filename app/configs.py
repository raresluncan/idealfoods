class ModalConfig(object):
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

    def __init__(self, *args, **kwargs):
        for arg in kwargs:
            if hasattr(self, arg):
                setattr(self, arg, kwargs[arg])
            else:
                raise KeyError('Arg ' + arg + ' is not allowed for ' \
                               + self.__name___)