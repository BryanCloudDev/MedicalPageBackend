<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

This is the backend for the `Red Medica` application. It has 3 types of users: patient, doctor, and administrator. All of them are authenticated with a JWT token in order to take certain actions on specific endpoints. There are also non-authenticated endpoints available for public use by non-registered users.

## Installation

### Dependency installation
We can install the dependencies by running

```bash
$ yarn install
```
### Set variables

We need to copy the sample variables from the file `.env.example` and create a new file named `.env`. Paste the variable names into the new file and set the required values for the app to work.

### Start the database container

Make sure you have installed Docker. If not, you can follow this tutorial [here](https://docs.docker.com/engine/install). This will allow us to run the app locally and retain the data even when the container is stopped.

All initial data is set to be loaded when the app starts for the first time. This includes: country, state, city, region, phone number, specialty, clinic, hospital, and sponsor-level.

This also includes the credentials for the admin user. The credentials are:
```
email: admin@email.com
password: 4dm1n1970@
```
Script to run container:
```bash
$ docker compose up -d
```

## Open API Documentation

The API is documented using Swagger, it can be found in this path: `http://localhost:3000/api`

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
