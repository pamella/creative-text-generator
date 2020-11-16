from django.urls import path

from core.views import GenerateTextTemplateView, SelectArtistsTemplateView

app_name = 'core'

urlpatterns = [
    path('', SelectArtistsTemplateView.as_view(), name='select-artists'),
    path('generate/', GenerateTextTemplateView.as_view(), name='generate-text'),
]
