from django.db import models

# Create your models here.
class Role(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    permissions = models.ManyToManyField('permissions.Permission', related_name='role_permissions', blank=True)

    def __str__(self):
        return self.name
