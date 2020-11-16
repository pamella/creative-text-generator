from django.shortcuts import render
from django.views.generic import TemplateView, RedirectView

from core.helpers.generator import generate_text_from_cache


# https://docs.djangoproject.com/en/3.1/topics/class-based-views/

class SelectArtistsTemplateView(TemplateView):
    template_name = 'core/select_artists.html'


class GenerateTextTemplateView(TemplateView):
    template_name = 'core/select_artists.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        artists_names = self.request.GET.getlist('artists_names')
        context['result'] = generate_text_from_cache(artists_names)
        return context
