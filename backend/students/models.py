from django.db import models
from django.conf import settings

class StudentProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    grade = models.CharField(max_length=20)
    school = models.CharField(max_length=255, blank=True)
    district = models.CharField(max_length=100, blank=True)
    parent_phone = models.CharField(max_length=15, blank=True)
    address = models.TextField(blank=True)
    joined_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.grade}"
