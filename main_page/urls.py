from django.urls import path
from main_page import views
from django.conf.urls import url

urlpatterns = [
    url(r'^weather/$', views.weather, name='weather'),
    path('', views.index),
]