from django.urls import path
from .views import SignUp, LogIn, LogOut, Info

urlpatterns = [
    path("", Info.as_view(),name="info"),
    path("signup/", SignUp.as_view(), name="signup"),
    path("login/", LogIn.as_view(), name="login"),
    path("logout/", LogOut.as_view(), name="logout"),
    
]