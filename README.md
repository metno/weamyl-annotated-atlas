# Annotated Atlas

Web application for reviewing CAP weather warning proposals and browsing observation data for training and analysis.

## Quick start

### Prerequisites

- [Node.js](https://nodejs.org/) 22.x
- npm

### Configure

Edit `.env` to point to the backend/database you want to use.

### Run locally

```bash
npm ci
npm start
```

Open [http://localhost:8080](http://localhost:8080).

## Build, test, and format

```bash
npm run build
npm test
npm run format:check
```

## Docker

```bash
docker build -t annotated-atlas .
docker run --name annotated-atlas -p 8080:8080 annotated-atlas
```

## OIDC notes

The Keycloak client `annotatedatlas` at `login.met.no` must use authorization code flow with PKCE (`S256`) and have **Direct Access Grants** disabled.

Register exact redirect URIs (no wildcards), including:

- `http://localhost:8080/oidc-callback`
- `https://annotated-atlas.k8s.met.no/oidc-callback`

## Contributing

Open a merge request for bugs or improvements.

Before submitting:

- `npm run format:check`
- `npm test`
- Ensure CI passes
