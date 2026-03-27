from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from users.models import User
from payments.models import Payment
from students.models import StudentProfile

class DashboardStatsView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        stats = {
            'total_students': User.objects.filter(role='student').count(),
            'pending_payments': Payment.objects.filter(status='pending').count(),
            'total_revenue': sum(p.amount for p in Payment.objects.filter(status='approved')),
            'new_students_this_month': StudentProfile.objects.filter(joined_at__month=3).count(), # Simplistic for now
        }
        return Response(stats)
