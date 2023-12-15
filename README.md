<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

This is a medical application backend that provides multiple features to users created in NestJS.

## Installation

```bash
$ yarn install
```

Then we need to copy the variables in the file `.env.example` and create a new file with the name `.env`, paste the variable names and set the values for the variables.

## Start the database container

```bash
$ docker compose up -d
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Stay in touch

- Author - [Bryan Portillo](https://bryancloud.dev)
- Linkedin - [here](https://www.linkedin.com/in/bryancloud)
