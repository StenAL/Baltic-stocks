# Baltic Stocks

https://laane.xyz/stonks

> Java + React app that aggregates stock data from Baltic exchanges and concisely displays
> them in a single page. Updated daily.

[![GitHub Actions - Frontend](https://github.com/StenAL/Baltic-stocks/workflows/Frontend%20-%20build%20and%20deploy/badge.svg)](https://github.com/StenAL/Baltic-stocks/actions?query=workflow%3A%22Frontend+-+build+and+deploy%22)
[![GitHub Actions - Backend](https://github.com/StenAL/Baltic-stocks/workflows/Backend%20-%20build%20and%20deploy/badge.svg)](https://github.com/StenAL/Baltic-stocks/actions?query=workflow%3A%22Backend+-+build+and+deploy%22)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE.md)

## Tools

Baltic Stocks uses Java and MariaDB for its backend and React and TypeScript for the frontend.
Deployment is automated using GitHub Actions and AWS. The deployed backend is
containerized using Docker.

## Development

To locally run this you need [Java](https://adoptium.net/),
[NodeJS](https://nodejs.org/en/),
[Docker + Docker Compose](https://docs.docker.com/get-docker/) or [MariaDB](https://mariadb.org/download/),
[Gradle](https://gradle.org/install/) (optional).

### Backend

The following instructions use `server` as their root directory

1. Run `docker compose up` in `docker/dev/docker-compose.yml` to start a preconfigured
   database in a Docker container. Alternatively set up the database manually using MariaDB.
2. Insert sample data to DB from `data` directory `.sql` files
3. Start the backend using `gradle bootRun` (local Gradle installation)
   or `./gradlew bootRun` (macOS, Linux) or `gradlew.bat bootRun` (Windows)

### Frontend

The following instructions use `client` as their root directory

1. Install necessary dependencies with `npm install`
2. Run the frontend application with `npm start`

## Contributing and Issues

Contributions are always welcome. Anyone can open issues and
pull requests on [GitHub](https://github.com/StenAL/baltic-stocks)

## License

This project is licensed under the [MIT license](https://github.com/StenAL/baltic-stocks/blob/master/LICENSE)
