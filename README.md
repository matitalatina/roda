# Röda Project

## Getting started

- Install [Docker](https://www.docker.com/).
- Clone [this repo](https://github.com/matitalatina/roda). Enter in project root.
- Add full version of `data_measurements_finals.csv` inside `roda_core/resources/` in order to have some sample data.
- `docker-compose build`
- `docker-compose up -d`

If you add a huge `data_measurements_finals.csv`, it takes a while to start the first time.
Using `docker-compose logs -f --tail 200` you can track import progress.

