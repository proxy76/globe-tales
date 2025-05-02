from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from .models import User
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
import json
import logging
from django.core.cache import cache

# Import OpenAI API key from environment variables!!!

@csrf_exempt
def register(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

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
    # If the user is already authenticated, return a failure response
    if request.user.is_authenticated:
        logging.warning(f"User already authenticated: {request.user}")
        return JsonResponse({"message": "Already authenticated", "status": "failed"}, status=403)

    # Only handle POST requests for login
    if request.method == "POST":
        # Parse the JSON data from the request body
        try:
            data = json.loads(request.body)
            username = data.get("username")
            password = data.get("password")
        except json.JSONDecodeError:
            return JsonResponse({"message": "Invalid JSON", "status": "failed"}, status=400)

        logging.warning(f"Attempting to authenticate: {username}")

        # Authenticate the user using Django's authenticate function
        user = authenticate(request, username=username, password=password)

        if user is not None:
            # Log the user in
            login(request, user)
            logging.warning(f"User logged in successfully: {request.user}")
            return JsonResponse({"message": "Username logged in", "status": "success"}, status=200)
        else:
            logging.warning(f"Authentication failed for: {username}")
            return JsonResponse({"message": "Username or password incorrect", "status": "failed"}, status=403)

    # If the request method is not POST, return a 405 Method Not Allowed
    return JsonResponse({"message": "Method not allowed", "status": "failed"}, status=405)
        
@login_required
@csrf_exempt
def logout_view(request):
    if request.user.is_authenticated:
        logout(request)
        return JsonResponse({"message": "Username logged out", "status":"success"}, status=200)
    else:
        return JsonResponse({"message": "User not logged in", "status":"failed"}, status=403)

@csrf_exempt
def user_info(request):
    if request.method == "GET":
        user_id = request.user.id
        cache_key = f"user_info_{user_id}"
        user_data = cache.get(cache_key)

        if not user_data:
            # Fetch user data from the database (expensive operation)
            user_data = {
                "username": request.user.username,
                "email": request.user.email,
                "countriesVisited": request.user.countriesVisited,
                "countriesWishlist": request.user.countriesWishlist,
            }
            cache.set(cache_key, user_data, timeout=60 * 15)  # Cache for 15 minutes

        return JsonResponse(user_data, status=200)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def check_login_view(request):
    if request.method == "GET":
        if request.user.is_authenticated:
            return JsonResponse({"isLogged": True}, status=200)
        else:
            return JsonResponse({"isLogged": False}, status=200)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def add_bucketlist(request):
    if request.method == "POST":
        if request.user.is_authenticated:
            data = json.loads(request.body)
            country = data.get('country')
            user = request.user

            # Add the country to the user's wishlist
            if country not in user.countriesWishlist:
                user.countriesWishlist.append(country)
                user.save()

                # Update the cache
                cache_key = f"user_info_{user.id}"
                user_data = {
                    "username": user.username,
                    "email": user.email,
                    "countriesVisited": user.countriesVisited,
                    "countriesWishlist": user.countriesWishlist,
                }
                cache.set(cache_key, user_data, timeout=60 * 15)  # Cache for 15 minutes

            return JsonResponse({"isAdded": True}, status=200)
        else:
            return JsonResponse({"isAdded": False}, status=200)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def remove_bucketlist(request):
    if request.method == "POST":
        if request.user.is_authenticated:
            data = json.loads(request.body)
            country = data.get('country')
            user = request.user

            # Remove the country from the user's wishlist
            if country in user.countriesWishlist:
                user.countriesWishlist.remove(country)
                user.save()

                # Update the cache
                cache_key = f"user_info_{user.id}"
                user_data = {
                    "username": user.username,
                    "email": user.email,
                    "countriesVisited": user.countriesVisited,
                    "countriesWishlist": user.countriesWishlist,
                }
                cache.set(cache_key, user_data, timeout=60 * 15)  # Cache for 15 minutes

            return JsonResponse({"isRemoved": True}, status=200)
        else:
            return JsonResponse({"isRemoved": False}, status=403)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def add_journal(request):
    if request.method == "POST":
        if request.user.is_authenticated:
            data = json.loads(request.body)
            country = data.get('country')
            user = request.user

            # Add the country to the user's visited list
            if country not in user.countriesVisited:
                user.countriesVisited.append(country)
                user.save()

                # Update the cache
                cache_key = f"user_info_{user.id}"
                user_data = {
                    "username": user.username,
                    "email": user.email,
                    "countriesVisited": user.countriesVisited,
                    "countriesWishlist": user.countriesWishlist,
                }
                cache.set(cache_key, user_data, timeout=60 * 15)  # Cache for 15 minutes

            return JsonResponse({"isAdded": True}, status=200)
        else:
            return JsonResponse({"isAdded": False}, status=200)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def remove_journal(request):
    if request.method == "POST":
        if request.user.is_authenticated:
            data = json.loads(request.body)
            country = data.get('country')
            user = request.user

            # Remove the country from the user's visited list
            if country in user.countriesVisited:
                user.countriesVisited.remove(country)
                user.save()

                # Update the cache
                cache_key = f"user_info_{user.id}"
                user_data = {
                    "username": user.username,
                    "email": user.email,
                    "countriesVisited": user.countriesVisited,
                    "countriesWishlist": user.countriesWishlist,
                }
                cache.set(cache_key, user_data, timeout=60 * 15)  # Cache for 15 minutes

            return JsonResponse({"isRemoved": True}, status=200)
        else:
            return JsonResponse({"isRemoved": False}, status=403)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)
    
        

# @csrf_exempt
# def generate_country_description(request):
#     if request.method == "POST":
#         try:
#             data = json.loads(request.body)
#             country = data.get("country")

#             if not country:
#                 return JsonResponse({"error": "Country name is required"}, status=400)

#             # Generate text using OpenAI
#             response = openai.Completion.create(
#                 model="text-davinci-003",
#                 prompt=f"Write a short travel description for {country}.",
#                 max_tokens=100,
#             )

#             generated_text = response.choices[0].text.strip()
#             return JsonResponse({"description": generated_text}, status=200)

#         except Exception as e:
#             return JsonResponse({"error": str(e)}, status=500)

#     return JsonResponse({"error": "Invalid request method"}, status=405)

