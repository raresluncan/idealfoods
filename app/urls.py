from django.conf.urls import url

from app import views

app_name = 'app'

urlpatterns = [
    #auth
    url(r'^login/$', views.authenticate.auth_login, name='auth_login'),
    url(r'^logout/$', views.authenticate.auth_logout, name='auth_logout'),

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

    #users views
    url(r'^users/$', views.users.list_users, name="list_users"),

    #home view
    url(r'^$', views.home.home_get, name='home'),
]
