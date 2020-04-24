# Baltic Stocks
https://laane.xyz/stonks
> Java + React app that aggregates stock data from Baltic exchanges and concisely displays 
> them in a single page. Updated daily.

[![GitHub Actions - Frontend](https://github.com/StenAL/Baltic-stocks/workflows/Frontend%20-%20build%20and%20deploy/badge.svg)](https://github.com/StenAL/Baltic-stocks/actions?query=workflow%3A%22Frontend+-+build+and+deploy%22) 
[![GitHub Actions - Backend](https://github.com/StenAL/Baltic-stocks/workflows/Backend%20-%20build%20and%20deploy/badge.svg)](https://github.com/StenAL/Baltic-stocks/actions?query=workflow%3A%22Backend+-+build+and+deploy%22) 
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE.md) 

## Tools
Baltic Stocks uses Java and MariaDB for its backend and a React and TypeScript for frontend.
Deployment is automated using GitHub Actions and AWS. The deployed backend is fully
containerized using Docker.

## Reflections
Back when I started this project I was somewhat new to React and just started hacking
together code that worked. If I were to redo this project, I'd do the following differently
* Use functional components and React Hooks instead of classes. Some of the classes have
currently grown quite large with complex and intertwined state management that could
be avoided by using hooks
* Use a more centralized state management model (either Redux or context Hooks).
Currently most state is stored in the huge App class and is modified
with callbacks that have to be passed down multiple levels.
* Use a prebuilt component library instead of creating my own implementation for everything (mostly the big table)
* Use Sass instead of vanilla CSS

Backend-wise I'm pretty satisfied with the stack and overall structure of this project.

## Development
To locally run this you need [Java 11](https://adoptopenjdk.net/), 
[NodeJS](https://nodejs.org/en/),
[Docker + Docker Compose](https://docs.docker.com/get-docker/) or [MariaDB](https://mariadb.org/download/),
[Gradle](https://gradle.org/install/) (optional).

### Backend
The following instructions use `server` as their root directory
1. Run `docker-compose up` in `docker/dev/docker-compose.yml` to start a preconfigured
 database in a Docker container. Alternatively set up the database manually using MariaDB
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
