# Ipsutin

## Requirements

- Docker
- Docker Compose
- Node.js

## Installation

1.  Install Docker by following the instructions for your platform:

    - [Docker for Mac](https://docs.docker.com/docker-for-mac/install/)
    - [Docker for Windows](https://docs.docker.com/docker-for-windows/install/)
    - [Docker for Linux](https://docs.docker.com/engine/install/)

2.  Install Docker Compose by following the instructions for your platform:

    - [Docker Compose for Mac](https://docs.docker.com/compose/install/)
    - [Docker Compose for Windows](https://docs.docker.com/compose/install/)
    - [Docker Compose for Linux](https://docs.docker.com/compose/install/)

3.  Install NPM
    You can download and install Node.js from the official website: https://nodejs.org/en/

## Scripts

Run project locally on your machine.

```bash
npm start # or
docker compose up
```

Run all e2e tests

```bash
npm run test
```

Open cypress, then run the container (set the port [here](cypress/support/e2e.ts))

```bash
npm run test:cypress
```

Run eslint

```bash
npm run lint
```

## Development

Typescript? `as unknown as ...` and `: any` are allowed.

> "Dynamic types are customer value"
>
> – mluukkai, maybe

## Environment configuration

Create a `.env` file inside the project's root directory. In that file, copy the contents of the `.env.template` file and add correct values for the variables based on the documentation.

Get the JAMI api key from Openshift JAMI pod. Use version.helsinki.fi documentation for that.

Get the OPENAI api key from someone developing currently.
