from rest_framework import serializers
from .models import StudentProfile
from users.serializers import UserSerializer
from payments.models import Payment
import datetime

class StudentProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    payment_status = serializers.SerializerMethodField()

    class Meta:
        model = StudentProfile
        fields = ('id', 'user', 'grade', 'school', 'district', 'parent_phone', 'address', 'joined_at', 'payment_status')

    def get_payment_status(self, obj):
        # Determine the current month string (e.g., "March 2026")
        now = datetime.datetime.now()
        current_month_str = now.strftime("%B %Y")
        
        # Check if there's an approved payment for this student for the current month
        payment = Payment.objects.filter(
            student=obj.user,
            month=current_month_str,
            status='approved'
        ).first()
        
        if payment:
            return 'Paid'
        
        # Also check for pending
        pending_payment = Payment.objects.filter(
            student=obj.user,
            month=current_month_str,
            status='pending'
        ).first()
        
        if pending_payment:
            return 'Pending'
            
        return 'Unpaid'
