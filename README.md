# What is Annotated Atlas?

This is a starting point for making a new frontend react application with typescript at Met Norway.

The purose is to make it easier to meet the requirements from our frontend architecture by

- Suggesting a solution on how to implement Met Norway visual profile (design)
- Using React and Material UI with example code
- Configuring test framework and include example tests
- Provide example of CI pipeline with setup, tests and build
- Configure useful tools and scripts

## Who is responsible?

IT Team Frontend (it-team-frontend@met.no) is responsible for this repository.

# Getting started

There is a room in [google chat](https://chat.google.com) called **MET - FAG - React** where we discuss React development at MET.
If you need access to the group, contact it-team-frontend@met.no

## Test it out

We recommend using the latest stabile version of node and npm in this project. If you want to test it without development tools, see description on how to run with docker below.

### Build and run with node

#### `npm ci`

Installs all dependencies (based on package-lock.json).\

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Build and run with docker

If you have docker you can build and run the app without any other dependencies this way.

```
docker build -t react-boilerplate .
docker run -p 8080:8080 react-boilerplate
```

The docker image is suitable for production in k8s.met.no.

## Use it for production

You will need to fork this repo and make your own. Further we reccomend:

- Remove example code that you do not need in your app.
- Apply for k8s.met.no project and extend current CI pipeline with deployment.
- Use provided docker file as a starting point for your app.
- Add appropriate license. Be aware that proveded fonts, part of Met Norway visual profile, are propietary.

## Documentation

- [React documentation](https://reactjs.org/)
- [Material UI](https://mui.com/core/)
- [Jest](https://jestjs.io/)
- [Prettier](https://prettier.io/docs/en/index.html)
- [WebPack](https://webpack.js.org/)

If you have browser support issues, consider adding [Babel](https://babeljs.io/)

# How to contribute

If you find bugs or other issues, please make merge requests.

- Test format with `npm run format:check`
- Make sure test pass with `npm run test`
- Ensure that CI pipeline does not fail
- Additional jest tests are very welcome
