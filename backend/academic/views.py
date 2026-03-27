from rest_framework import viewsets, permissions
from .models import Mark
from .serializers import MarkSerializer

class MarkViewSet(viewsets.ModelViewSet):
    queryset = Mark.objects.all()
    serializer_class = MarkSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == 'admin':
            return Mark.objects.all()
        return Mark.objects.filter(student=self.request.user)
