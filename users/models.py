from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.urls import reverse
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.hashers import make_password

from .managers import ApplicationUserManager


class ApplicationUser(AbstractBaseUser, PermissionsMixin):
    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    email = models.EmailField(_('email address'), unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=30, blank=True)

    permissions = models.ManyToManyField('permissions.Permission', related_name='user_permissions', blank=True)
    roles = models.ManyToManyField('roles.Role', related_name='user_roles', blank=True)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = ApplicationUserManager()

    def __str__(self):
        return self.email

    def get_absolute_url(self):
        return reverse('user_detail', kwargs={'pk': self.pk})

    def set_password(self, raw_password):
        self.password = make_password(raw_password)
        self._password = raw_password
