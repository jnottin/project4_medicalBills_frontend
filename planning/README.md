# FINAL PROJECT: MEDI-SHARE

## Description
Medi-Share is a price sharing app to help people who are not insured find the best prices for medical procedures. Users can see the average prices that real patients have paid for 10 of the most common medical procedures. They can also submit their own medical bills to help grow our database.

## List of features/User Stories

- Users can see the average price per procedure per hospital to be able to choose the most afforable option.

- Users can submit their own medical bills which we will add to our database and update corresponding procedure's average price. 

- Users can use google maps to locate the hospitals near them that have prices available on the app. 

- Users can sort the hospitals based on the lowest price for the particular procedure they need to have.

![Link to Picture of Project: Home Page]   (https://i.imgur.com/3zrow9N.png)

![Link to Picture of Project: Search Hospitals / Map]   (https://i.imgur.com/cR0zcZR.png)

# Future Ideas:
-Implementing a Procedure model so that there can be an unlimited number of procedures that will update by user input. Instead of the now limited number of 10 static procedures.

-Show hospitals in Hospital List based on how close they are to the area that the respondent is searching.

-Hospital markers will inflate when respondent hovers over the particular hospital in the hostpital list. 

-HOSPITALS NEAR ME button - this will find the users longitude and latitude based on their browser and reposition the map center around that.


## Technologies Used
- Node.js
- Express
- React
- JSX
- Google Maps React
- Google Places React

## Installation Instructions / Getting Started:
You are able to Fork and clone the application from Github.

Forking a repository is a simple two-step process, below are the steps:
1. On GitHub, navigate to the jnottin/italian_practice repository.
2. In the top-right corner of the page, click Fork.

That's it! Now, you have a fork of the original. You can clone it down to your local drive and make changes!

## Contribution Guidelines:

Anyone is welcome to make contributions! Simply fork the repo and clone it to your own computer, then make a pull request!

[Link to main repo backend]   (https://github.com/jnottin/project4_medicalBills_backend)

[Link to main repo backend]   (https://github.com/jnottin/project4_medicalBills_frontend)

[Link to deployed project]   (https://http://medi-share.surge.sh)

## Requirements
For development, you will only need Node.js installed on your environement.

### Node
Node is really easy to install & now include NPM. You should be able to run the following command after the installation procedure below.

```
$ node --version
v0.10.24
```

```
$ npm --version
1.3.21
```

### Node installation on OS X
You will need to use a Terminal. On OS X, you can find the default terminal in /Applications/Utilities/Terminal.app.

Please install Homebrew if it's not already done with the following command.

```
$ ruby -e "$(curl -fsSL 
https://raw.github.com/Homebrew/homebrew/go/install)"
```
If everything when fine, you should run

```
brew install node
Node installation on Linux
sudo apt-get install python-software-properties
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs
```

### Node installation on Windows
Just go on official Node.js website & grab the installer. Also, be sure to have git available in your PATH, npm might need it.



## Available Scripts
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm install`
Once you clone down the project you will need to run npm install in both the frontend repo and the backend repo. 

In the backend you will also have to run npm init like so:

```
$ cd PROJECT
$ npm init
$ npm install
```

For the frontend just below:

```
$ cd PROJECT
$ npm install
```

### Dependencies
Backend:
```
 "body-parser": "^1.18.3",
    "cors": "^2.8.5",
    "dotenv": "^6.2.0",
    "express": "^4.16.4",
    "method-override": "^3.0.0",
    "mongoose": "^5.4.1"
```


Frontend:
```
    "axios": "^0.18.0",
    "cors": "^2.8.5",
    "dotenv": "^6.2.0",
    "google-map-react": "^1.1.2",
    "google-maps-react": "^2.0.2",
    "mdbreact": "^4.8.6",
    "react": "^16.7.0",
    "react-dom": "^16.7.0",
    "react-geocode": "^0.1.2",
    "react-places-autocomplete": "^7.2.0",
    "react-router-dom": "^4.3.1",
    "react-scripts": "2.1.2"
```

### `npm start`

Runs the frontend of the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `nodemon`
This will run the backend server

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

