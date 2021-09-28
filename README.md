# SWEET & SWEAT

## Description

This project was inspired by the current lockdown circumstances where people are isolated inside and might not have enough motivation to get out there and exercise! We created an activity-based dating app to light that fire in their hearts.

React and Google cloud Firebase (Firestore & Realtime Databases) are the main technologies utalised for building this app.

Live demo: [Sweet & Sweat](https://sweet-sweat.web.app/).


## How to get satrted

In the project directory, run the following commands:

```
# To install dependencies
npm install

# To run the server
npm run start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Technologies

* React Js
* Firebase (Google cloud)
    * Firestore database - NoSQL db used for storing users & activities info including images
    * Realtime database - for our messaging system
* Ant Design / Material UI


## Deployment

1. Install Firebase tools CLI
```
npm install -g firebase-tools
```

2. Login Firebase using CLI
```
firebase login
```

3. Setup Firebase project from CLI
```
cd project-name
firebase init

    . Confirm YES.
    . Create a new Firebase project, e.g. "xyz-firebase-react"
    . Input a project ID, e.g. "xyz-firebase-react"
    . Choose a directory where the contents will be deployed to Firebase, type "build"
    . Confirm "YES". This is important since we are not deploying the static html!
    . Confirm NO.
    . Confirm NO.
```

4. Build react app locally
```
cd project-name
yarn build
```
5. Deploy react app to Firebase
```
firebase deploy
```

## Contributors

This project was a collaboration work of the following contributors:

* **Hess Taba** https://github.com/hesstab
* **Mo Abyari** https://github.com/MoAbyari
