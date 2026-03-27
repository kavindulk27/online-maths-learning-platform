from django.db import models
from django.conf import settings

class Mark(models.Model):
    TYPE_CHOICES = (
        ('exam', 'Exam'),
        ('homework', 'Homework'),
    )
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='marks')
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    subject = models.CharField(max_length=100)
    score = models.FloatField()
    total_possible = models.FloatField(default=100)
    date = models.DateField()
    remarks = models.TextField(blank=True)

    def __str__(self):
        return f"{self.student.username} - {self.type} - {self.score}"
