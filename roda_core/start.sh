#!/usr/bin/env bash

./manage.py migrate
./manage.py bootstrap_data
echo "from django.contrib.auth.models import User; User.objects.filter(email='admin@admin.it').delete(); User.objects.create_superuser('admin', 'admin@admin.it', 'admin')" | python manage.py shell
./manage.py runserver 0.0.0.0:8000