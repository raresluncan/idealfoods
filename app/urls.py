from django.conf.urls import url

from app import views

app_name = 'app'

urlpatterns = [
    #ingredient views
    url(r'^ingredients/$', views.ingredient.list_ingredients, name="list_ingredients"),
    url(r'^ingredients/create/$', views.ingredient.create_ingredients, name="create_ingredients"),
    url(r'^ingredients/(?P<ingredient_id>[0-9]+)/delete/$',
        views.ingredient.delete_ingredients, name="delete_ingredients"),

    #home view
    url(r'^$', views.home.home_get, name='home'),
]
