web: gunicorn creative_text_generator.wsgi:application --log-file - --log-level debug
python manage.py collectstatic --noinput
manage.py migrate
