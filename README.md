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

## Backlog
jaffna-guide.com v2.0
- fix: add all 'culture' places
  - description tamil
  - description english
- fix: add all 'restaurant' places
  - coordinates
  - cover
  - marker
  - description tamil
  - description english
  - logo
- fix: add all 'hotel' places
  - coordinates
  - cover
  - marker
  - description tamil
  - description english
  - logo
- fix: add all 'education' places
  - coordinates
  - cover
  - marker
  - description tamil
  - description english
  - logo
- feature: add all 'village' places
  - coordinates
  - cover
  - marker
  - description tamil
  - description english
  - references to places that are located in a particular village
    - add 'children' property on place model
    - basically cards with the place cover ranked by votes
    - display filter to toggle only cards belonging to a particular category if 'children' > 5
- feature: user-uploaded photographs
  - extend node.js endpoint /api/places/:placeId/images
    - add 'approvedBy' and 'uploadedBy' key on image subdocument schema
    - check whether uploader is an admin user, if so approved is 'true', else it is 'false'
  - user has credit property
  - After "Login w/ Facebook" the <CreditOptions /> button group will be displayed. If credit is not set, Anonymous will be selected.
  - Whenever they click on one of the items, i.e. Twitter, they go through the oAuth process and upon successful
    oAuth the user.credit field will be set https://twitter.co/soosap.
  - Now when they upload an image the credit that was there at the time of the upload on the user model will be applied to the images
  - At first images are uploaded as always, i.e. the full image as well as an automatic generation of a thumbnail.
  - In the admin panel, when you click on an item in the approve-images-table, you will see a modal appear...
    - with the image and 3 potential placeholders, the active one is white, all other ones have a high opacity
    - there will also be a big decline button in case the image is not good enough
      - if you decline what will happen is that that particular image subdocument is deleted from the place document
      - we dont give further notice
      - in the main ui we provide an info box and explain that uploads are subject to approval. Approval depends on the
        quality of the image, whether or not similar motives already exist that are even better.
        For the case of decline we cannot provide individual feedback on what premises the decision has been made. 
  - Upon approval in the admin panel
    - creditPosition is associated to the image, i.e. "upper-left", "upper-right", or "lower-left" (lower-right is reserved to "love" button)
    - new image is generated with engraved "jaffna guide" logo (in a subtle way) as well es engraved "username"
    - image is constrained to maximum size in case someone uploads a mega sized image
    - the previous image will be deleted including thumbnail
  - for regular user only display the images that are approved and those that were uploaded by the current user
    - if a particular image is currently not approved, then it will have a gray overlay or filter applied.
    - once approved, above the creditPosition place a square that represents a link to the uploader (i.e. link to credit)
  - in the admin panel add a table for photograph approval
    Example: placeBodyEn: Nallur Kandaswamy Kovil | imageId: 128923748778ds372g342 | credit: Prasath ZooZai ThaZan
- feature: on-hover of category display tamil category name
- feature: comments
  - evaluate how good that "coraltalk" project really is and how we can integrate it.
  - how to install plugin to authenticate user with facebook account.
- feature: sitemap
  - create a sitemap for google to be able to more intelligently crawl the available pages
