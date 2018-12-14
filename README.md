# jaffna-guide

## Getting started

```sh
$ cd server
$ npm install
$ npm start

$ cd client
$ npm install
$ npm start
```

## Technology stack

* React
* mongodb
* node.js
+ Facebook oAuth
* Draft.js

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

## Authentication

We authenticate our user through Facebook oAuth. Upon successful authentication a jwt token is issued for subsequent authorization against the backend.

For testing purposes you may only want to get a hold of the jwt token. In such cases just visit the following url in the browser: `https://jaffna.guide/auth/facebook`.

As a result you will get back a json object containing the token, i.e.:
```json
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YmQ2ODZmNzliN2EwYTRjYzM1ZGZhM2UiLCJpYXQiOjE1NDEwNDE2NTM1NzF9.6Jfz0w7ZiQq4z4xTve_1I88_l9ffruDfVubh0GOeeig"
}
```

When you want to authenticate from the frontend in most cases you want the user to be redirected to a particular url upon successful authentication. This can be achieved by attaching the redirect url into the auth endpoint as a query param, i.e. `https://jaffna.guide/auth/facebook?redirect=/voting/2018`.

The implemented authentication flow will take care of redirecting the using to the specified location and attaching the jwt token as a url query param, i.e.: `https://jaffna.guide/voting/2018?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YmQ2ODZmNzliN2EwYTRjYzM1ZGZhM2UiLCJpYXQiOjE1NDEwNDE4NjU3OTl9.Ep4cbbRXGQeBcPc4F47JP6RREgw-mVZmMCK-tAXvGcc#_=_`

The frontend needs to read out the query param token and store it in localStorage. When making authenticated calls to the backend the token must be attached to the header, i.e. `Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YmQ2ODZmNzliN2EwYTRjYzM1ZGZhM2UiLCJpYXQiOjE1NDEwNDE4NjU3OTl9.Ep4cbbRXGQeBcPc4F47JP6RREgw-mVZmMCK-tAXvGcc`
