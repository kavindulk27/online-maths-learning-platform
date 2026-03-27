from django.db import models

class Material(models.Model):
    TYPE_CHOICES = (
        ('recording', 'Recording'),
        ('homework', 'Homework Sheet'),
    )
    title = models.CharField(max_length=255)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    file = models.FileField(upload_to='materials/', blank=True, null=True)
    video_url = models.URLField(blank=True, null=True)
    grade = models.CharField(max_length=20)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
