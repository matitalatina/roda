# Röda Project

Telemetry system that shows gathered tyres data on graphs. The measurements are grouped by timestamp and every graph shows the tyres of the selected car.

![Röda Project screenshot]()

## Getting started with Docker 

- Install [Docker](https://www.docker.com/).
- Clone [this repo](https://github.com/matitalatina/roda). Enter in project root.
- Add full version of `data_measurements_finals.csv` inside `roda_core/resources/` in order to have some sample data.
- `docker-compose build`
- `docker-compose up -d`
- Have fun!

If you add a huge `data_measurements_finals.csv`, it takes a while to start the first time.
Using `docker-compose logs -f --tail 200` you can track import progress.

The UI project is on http://localhost:3000/, while the backend is http://localhost:8000/
## Links

- [UI Endpoint](http://localhost:3000/)
- [API Documentation (Swagger)](http://localhost:8000/)

## Architecture

### Backend

Backend code is in `roda_core/` folder. It's written in Python and the used framework is [Django](https://www.djangoproject.com/).
I adopted Django and [Django Rest Framework](http://www.django-rest-framework.org/) conventions to build the APIs. I also used the PEP8 style for my code.

### Frontend

Frontend code in `web/` folder. It's written in ES6 Javascript, HTML and CSS. I used React library to build the UI.
- Project seed is the [official one](https://github.com/facebookincubator/create-react-app) for React.
- I adopted [atomic design](http://bradfrost.com/blog/post/atomic-web-design/) to build reusable components.
- I decoupled presentation and logic layers using [Container/Presentational components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0).

## FAQ

- *What does it mean Röda?* Röda means wheel in Bergamo's dialect.