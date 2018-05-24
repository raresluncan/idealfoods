from django import template

register = template.Library()

@register.filter
def get_toggler_column(table_config):
    if not table_config.columns:
        return None
    for column in table_config.columns:
        if column.mobile_toggler_column:
            return column
    return columns[0]

@register.filter
def get_field_value(object, field):
    if not field:
        return

    foreign_key_objects = object.get_foreign_key_objects()

    try:
        return getattr(object, field)
    except AttributeError:
        for fk_object in foreign_key_objects:
            try:
                return getattr(fk_object, field)
            except AttributeError:
                continue

    raise ValueError("Field " + field + "is incorrect.")