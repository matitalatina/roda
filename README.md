# Röda Project

Telemetry system that shows gathered tyres data on graphs. The measurements are grouped by timestamp and every graph shows the tyres of the selected car.

![Röda Project screenshot](https://github.com/matitalatina/roda/raw/master/docs/resources/roda-project-screen.png)

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

The Django App created is `monitoring`.

#### DB

The chosen DB is [PostgreSQL](https://www.postgresql.org/) with these reasons:
- The passed data have all the same structure so we can leverage on SQL schemas.
- For this project we don't have any heavy write/read throughput since data are loaded from the CSV.
- In the future we can leverage on JOINS: I imagined that every measurement can have as foreign key to Car and Tyre models.
- It fits very well with Django.

### Frontend

Frontend code in `web/` folder. It's written in ES6 Javascript, HTML and CSS. I used [React library](https://reactjs.org/) to build the UI.
- Project seed is the [official one](https://github.com/facebookincubator/create-react-app) for React.
- I adopted [atomic design](http://bradfrost.com/blog/post/atomic-web-design/) to build reusable components.
- I decoupled presentation and logic layers using [Container/Presentational components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0).

## Scale Up

### Overall Architecture

Since this project is completely dockerized, we can use [Amazon Elastic Container Service](https://aws.amazon.com/ecs/) with [auto scaling](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-auto-scaling.html) and a [load balancer](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-load-balancing.html) in order to handle heavy workload for both frontend and backend. A useful [cloudwatch metric](https://aws.amazon.com/cloudwatch/) to trigger the scaling could be CPU usage.

### DB

The tasks in order to scale the database really depend on its usage and queries used on it. First thing to do is host the DB on cloud like [Amazon RDS](https://aws.amazon.com/rds/). If we have lot of reads we can leverage on [RDS read replicas](https://aws.amazon.com/rds/details/read-replicas/). If we have high write throughput we can scale up vertically using more powerful instances.
Another solution that helps scaling the db is partition measurement tables based on timestamp and car id. So we don't end up with a single huge table. DB partitioning requires more informations to be effective: I think lot of users uses more often latest data so this partition can be very effective.

#### NoSQL

If we don't use lot of joins, [ACID](https://en.wikipedia.org/wiki/ACID) properties are not a requirement, we are paying to much, and all the options above aren't enough to scale up properly, we can switch to a NoSQL database like MongoDB. Using it we don't have to use a fixed schema and more importantly we can shard the measurement collection to scale horizontally.

## FAQ

- *What does it mean Röda?* Röda means wheel in Bergamo's dialect.