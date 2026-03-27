from django.db import models
from django.conf import settings

class Payment(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    )
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='payments')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    receipt_image = models.ImageField(upload_to='receipts/', null=True, blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    submitted_at = models.DateTimeField(auto_now_add=True)
    approved_at = models.DateTimeField(null=True, blank=True)
    month = models.CharField(max_length=20) # e.g., "March 2026"

    def __str__(self):
        return f"{self.student.username} - {self.amount} - {self.status}"
