# <img src=./public/pirated_eagle.gif width=100px /> Ipsutin [![Deploy to production](https://github.com/UniversityOfHelsinkiCS/ipsutin/actions/workflows/production.yml/badge.svg)](https://github.com/UniversityOfHelsinkiCS/ipsutin/actions/workflows/production.yml) [![Deploy to staging](https://github.com/UniversityOfHelsinkiCS/ipsutin/actions/workflows/staging.yml/badge.svg)](https://github.com/UniversityOfHelsinkiCS/ipsutin/actions/workflows/staging.yml) [![E2E Tests](https://github.com/UniversityOfHelsinkiCS/ipsutin/actions/workflows/test.yml/badge.svg)](https://github.com/UniversityOfHelsinkiCS/ipsutin/actions/workflows/test.yml)

## Requirements

- Docker
- Docker Compose
- Node.js

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
