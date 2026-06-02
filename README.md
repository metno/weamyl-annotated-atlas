# Annotated Atlas

The Annotated Atlas is a web application for operational and research meteorologists.
Operational meteorologists use it to analyze CAP (Common Alerting Protocol) weather warning proposals by
reviewing historical warnings and grading their hit rates. Research meteorologists use it to identify
good training data for machine learning algorithms by accessing source observation datasets.

## Who is responsible?

Hans Christian Nenseth (hanscn@met.no) is responsible for this repository.

## Tech stack

- [React 19](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- [Material UI v9](https://mui.com/material-ui/) for UI components
- [React Leaflet v5](https://react-leaflet.js.org/) for interactive maps
- [react-oidc-context](https://github.com/authts/react-oidc-context) for OIDC authentication
- [Webpack 5](https://webpack.js.org/) as bundler
- [Jest](https://jestjs.io/) + [Testing Library](https://testing-library.com/) for tests
- [Prettier](https://prettier.io/) for code formatting

# Getting started

There is a room in [Google Chat](https://chat.google.com) called **WeaMyL-chatroom** where we discuss development.
If you need access to the group, contact hanscn@met.no.

## Configuration

If you need to run against a different backend/database, edit the `.env` file to point to the correct address.

## Build and run with Node

```
npm ci
```

Installs all dependencies from `package-lock.json`.

```
npm start
```

Runs the app in development mode. Open [http://localhost:8080](http://localhost:8080) in your browser.
The page reloads on edits and lint errors appear in the console.

```
npm run build
```

Produces a production build in the `dist/` folder.

## Build and run with Docker

Build and run without any local Node installation:

```
docker build -t annotated-atlas .
docker run --name annotated-atlas -p 8080:8080 annotated-atlas
```

The multi-stage Dockerfile builds with Node 22 and serves with nginx (unprivileged). The image is suitable for deployment on k8s.met.no.

## Use it for production

Fork this repo and add an appropriate license before deploying publicly.

# How to contribute

If you find bugs or other issues, please open a merge request.

- Check formatting: `npm run format:check`
- Run tests: `npm test`
- Ensure the CI pipeline passes
- Additional Jest tests are very welcome
