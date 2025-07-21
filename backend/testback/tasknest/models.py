
from django.db import models
from django.utils import timezone


class Users(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    password = models.CharField(max_length=255)
    profile_pic = models.CharField(max_length=255, null=True, blank=True) 

    class Meta:
        managed = True
        db_table = 'users'


class Projects(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    created_by = models.ForeignKey(Users, on_delete=models.SET_NULL, null=True, db_column='created_by')
    created_at = models.DateField(default=timezone.now)                    # New field
    due_date = models.DateField(null=True, blank=True)                    # New field
    icon = models.CharField(max_length=255, null=True, blank=True)        # New field

    class Meta:
        managed = True
        db_table = 'projects'


class ProjectMembers(models.Model):
    project = models.ForeignKey('Projects', on_delete=models.CASCADE)
    user = models.ForeignKey('Users', on_delete=models.CASCADE)

    class Meta:
        db_table = 'project_members'
        unique_together = (('project', 'user'),)


class Tasks(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    due_date = models.DateField(blank=True, null=True)
    created_by = models.ForeignKey(Users, models.DO_NOTHING, db_column='created_by', blank=True, null=True)
    assigned_to = models.ForeignKey(Users, models.DO_NOTHING, db_column='assigned_to', related_name='tasks_assigned_to_set', blank=True, null=True)
    project = models.ForeignKey(Projects, models.DO_NOTHING, blank=True, null=True)
    status = models.CharField(max_length=20, default='pending') 

    class Meta:
        managed = False
        db_table = 'tasks'


