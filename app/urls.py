from django.conf.urls import url

from app import views

app_name = 'app'

urlpatterns = [
    url(r'^ingredients/$', views.ingredient.list_ingredients, name="list_ingredients"),
    url(r'^ingredients/create/$', views.ingredient.create_ingredients, name="create_ingredients"),
    url(r'^$', views.home.home_get, name='home'),
]
