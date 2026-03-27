from rest_framework import viewsets, permissions
from .models import Payment
from .serializers import PaymentSerializer

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == 'admin':
            return Payment.objects.filter(student__role='student')
        return Payment.objects.filter(student=self.request.user)

    def perform_create(self, serializer):
        if self.request.user.role == 'admin':
            # Allow admin to specify which student this payment is for
            student_id = self.request.data.get('userId')
            if student_id:
                serializer.save(student_id=student_id)
                return
        serializer.save(student=self.request.user)
