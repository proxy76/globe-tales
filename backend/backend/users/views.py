from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from .models import User
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
import json
import logging


@csrf_exempt
def register(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")
        confirmation = data.get("confirmation")
        
        if password != confirmation:
            return JsonResponse({"message": "Passwords don't match", "status":"failed"}, status=403)
        
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except:
            return JsonResponse({"message": "Username aleady taken", "status":"failed"}, status=403)
        try:
            login(request, user)
            return JsonResponse({"message": "Username logged in", "status":"success"}, status=200)
        except:
            return JsonResponse({"message": "Couldn't log in", "status":"failed"}, status=403)
    else:
        return JsonResponse({"message": "Invalid method", "status":"failed"}, status=403)
    
@csrf_exempt
def login_view(request):
    if request.user.is_authenticated: 
        logging.warning(request.user)
        return JsonResponse({"message": "Already authenticated", "status":"failed"}, status=403)

    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")

        logging.warning("incerc sa autentific " + username + password )
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            logging.warning(request.user)
            return JsonResponse({"message": "Username logged in", "status":"success"}, status=200)
        else:
            return JsonResponse({"message": "Username or password incorrect", "status":"failed"}, status=403)
        
@login_required
@csrf_exempt
def logout_view(request):
    if request.user.is_authenticated:
        logout(request)
        return JsonResponse({"message": "Username logged out", "status":"success"}, status=200)
    else:
        return JsonResponse({"message": "User not logged in", "status":"failed"}, status=403)

@csrf_exempt
@login_required
def user_info(request):
    if request.method == "GET":
        if not request.user:
             return JsonResponse({"message": "Username not logged in", "status":"failed"}, status=403)
    user = request.user
    return JsonResponse({"username": user.username, "email": user.email, "profile_picture": user.profile_picture, "countriesVisited" : user.countriesVisited, "countriesWishlist": user.countriesWishlist}, status=200)
    
@csrf_exempt
def check_login_view(request):
    if request.method == "GET":
        if request.user.is_authenticated:
            return JsonResponse({"isLogged": True}, status=200)
        else:
            return JsonResponse({"isLogged": False}, status=200)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)