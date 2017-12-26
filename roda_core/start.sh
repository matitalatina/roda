#!/usr/bin/env bash

./manage.py migrate
./manage.py bootstrap_data
./manage.py runserver 0.0.0.0:8000