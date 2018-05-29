from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect
from django.urls import reverse
from django.views.decorators.http import require_http_methods

from app.forms import LoginForm
from app.managers.user import UserManager

@require_http_methods(["GET", "POST"])
def auth_login(request):
    """ the view for the login form
        -verifies the data entered is correct and authenticates the user
        -if authentication is sucessfull, reidrects to the homepage
        -otherwise shows the errors that occured"""
    if request.user.is_authenticated():
        return redirect(reverse('app:home'))
    if request.method == 'POST':
        login_form = LoginForm(request.POST)
        if login_form.is_valid():
            email = UserManager.normalize_email(login_form.cleaned_data["email"])
            password = login_form.cleaned_data["password"]
            user = authenticate(request, email=email, password=password)
            if user:
                login(request, user)
                return redirect(request.META['HTTP_REFERER'])
            login_form.add_error('email', 'Invalid email or password')
        return render(request, 'app/login.html', {'login_form': login_form,})
    return render(request, 'app/login.html', {'login_form': LoginForm()})


def auth_logout(request):
    """ view for logging the user out
        -doesn't throw any exceptions if user isn't logged in"""
    logout(request)
    return redirect('/')