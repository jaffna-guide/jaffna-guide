# jaffna-guide

## Features

* User registration with Facebook oAuth

## Technology stack

* React
* mongodb
* mongoose
* node.js

## Working with git

### Create a working branch

```sh
$ git checkout -b feature/review-section develop
# or
$ git checkout -b fix/review-section develop

$ git push --set-upstream origin feature/review-section
```

### Release develop branch into production

```sh
$ git checkout master
$ git pull --rebase origin develop
```

## Project setup

### node
```sh
$ nvm install stable
$ npm install -g npx
# Use node_module binaries, example:
$ npx babel-node --version
```

### root

```sh
$ touch README.md
$ touch Dockerfile
$ touch .gitignore
```

### server

```sh
$ mkdir -p server/src
$ cd server
$ npm init
$ npm install express
$ touch src/index.js

# Enable ES6 syntax
$ touch .babelrc
$ npm install --save @babel/runtime
$ npm install --save-dev @babel/cli @babel/core @babel/node @babel/preset-env
```

### client

```sh
# wip
```
