def is_super_admin(user):
    """ checks if a user is an admin.IF not, returns False, otherwise True """
    return user.is_super_admin()

def is_admin(user):
    """ checks if a user is an admin.IF not, returns False, otherwise True """
    if user.is_super_admin():
        return True

    return user.is_admin()