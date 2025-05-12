from django.urls import path
from . import views 

urlpatterns = [
    path("register", views.register, name="register"),
    path("logout", views.logout_view, name="logout"),
    path("login", views.login_view, name="login"),
    path("user_info", views.user_info, name="user_info"),
    path("check_login", views.check_login_view, name="check_login"),
    path("add_wishlist", views.add_bucketlist, name="add_wishlist"),
    path("add_journal", views.add_journal, name="add_journal"),
    path("remove_bucketlist", views.remove_bucketlist, name="remove_bucketlist"),
    path("remove_journal", views.remove_journal, name="remove_journal"),
]