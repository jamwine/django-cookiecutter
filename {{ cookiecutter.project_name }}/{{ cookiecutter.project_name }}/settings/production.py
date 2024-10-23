from .base import *  # noqa
from .base import env

ADMINS = [("{{ cookiecutter.admin_name }}", "{{ cookiecutter.admin_email }}")]

# TODO add domain names of the production server
CSRF_TRUSTED_ORIGINS = []
