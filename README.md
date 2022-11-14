# What is the Annotated Atlas? (Draft)

The main end-users of the Annotated Atlas are both the operational and the research meteorologists.
The operational meteorologists will use the atlas for analyzing the weather warning(CAP) proposal by 
reviewing historical weather warnings, but also to review earlier situations and give the earlier 
warnings hit rate grades.  For the research meteorologist, the atlas will be a convenient tool for 
identifying good training data for machine learning algorithms by giving easy access to source 
observation datasets.

## Who is responsible?

Hans Christian Nenseth (hanscn@met.no) is responsible for this repository.

# Getting started

There is a room in [google chat](https://chat.google.com) called **WeaMyL-chatroom** where we discuss development.
If you need access to the group, contact someone@met.no

## Test it out

We recommend using the latest stable version of node and npm in this project. If you want to test it without 
development tools, see description on how to run with docker below.

If you need to run against another backend/database you have set up on your own system you have to edit 
the `.env`-file to point to the right address.

### Build and run with node

#### `npm ci`

Installs all dependencies (based on package-lock.json).

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Build and run with docker

If you have docker you can build and run the app without any other dependencies this way.

```
docker build -t annotated-atlas .
docker run -p 8080:8080 annotated-atlas
```

The docker image is suitable for production in k8s.met.no.

## Use it for production

You will need to fork this repo and make your own. Further we reccomend:

- Add appropriate license.

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
