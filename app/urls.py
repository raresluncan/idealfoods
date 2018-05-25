from django.conf.urls import url

from app import views

app_name = 'app'

urlpatterns = [
    #ingredient views
    url(r'^ingredients/$', views.ingredient.list_ingredients, name="list_ingredients"),
    url(r'^ingredients/create/$', views.ingredient.create_ingredients, name="create_ingredients"),
    url(r'^ingredients/(?P<ingredient_id>[0-9]+)/delete/$',
        views.ingredient.delete_ingredients, name="delete_ingredients"),
    url(r'^ingredients/(?P<ingredient_id>[0-9]+)/edit/$',
        views.ingredient.edit_ingredient, name="edit_ingredient"),

    #recipe views
    url(r'^recipes/$', views.recipes.list_recipes, name="list_recipes"),
    url(r'^recipes/getJSON/$', views.recipes.get_recipes_as_json, name="list_recipes_json"),
    #home view
    url(r'^$', views.home.home_get, name='home'),
]
