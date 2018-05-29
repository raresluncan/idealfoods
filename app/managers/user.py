from django.contrib.auth.models import BaseUserManager

class UserManager(BaseUserManager):
    """ Extends the BaseUserManager class from Django """

    def _new_user(self, email, password, first_name, last_name, address,
                  level, *args, **kwargs):
        email = self.normalize_email(email)
        user = self.model(
            first_name=first_name,
            last_name=last_name,
            email=email,
            level=level,
            address=address,
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_user(self, email, password, first_name, last_name, address,
                    level, *args, **kwargs):
        """ specify a first name, last name, email, and a password, to create a
            a user for a company """

        return self._new_user(
            email,
            first_name,
            last_name,
            password,
            address,
            level
        )