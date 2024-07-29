# Generated by Django 5.0.7 on 2024-07-29 15:14

from django.db import migrations


def create_roles(apps, schema_editor):
    Role = apps.get_model('roles', 'Role')

    perms = [
        ('CanLogin', 'Can login to the system'),
        ('MustChangePassword', 'Must change password on first login'),
        ('CanCreateUser', 'Can create a new user'),
        ('CanEditUser', 'Can edit user details'),
        ('CanDeleteUser', 'Can delete a user'),
        ('CanViewUser', 'Can view user details'),
        ('CanCreateRole', 'Can create a new role'),
        ('CanEditRole', 'Can edit role details'),
        ('CanDeleteRole', 'Can delete a role'),
        ('CanViewRole', 'Can view role details'),
        ('Administrator', 'Can perform any action on the system'),
    ]

    roles = [
        ('Administrator', 'Can perform any action on the system', [perm[0] for perm in perms]),
        ('UserManager', 'Can manage users', perms[2:8][0]),
        ('RoleManager', 'Can manage roles', perms[8:11][0]),
        ('User', 'Can login to the system', ['CanLogin']),
        ('MustChangePassword', 'Must change password on first login', ['MustChangePassword']),
        ('AccountDisabled', 'Account is disabled', []),
        ('BasicUser', 'Basic user', ['CanLogin']),
    ]

    role_objs = Role.objects.bulk_create([Role(name=name, description=desc, permissions=pms) for name, desc, pms in roles])
    role_objs.save()

    # for name, desc, pms in roles:
    #     role = Role.objects.create(name=name, description=desc)
    #     role.permissions.set(pms)
    #     role.save()


class Migration(migrations.Migration):

    dependencies = [
        ('roles', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_roles)
    ]
