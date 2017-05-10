# Introduction

Welcome to Kanjingo-React-Redux, a flexible web-based CAT tool for post editing machine translations.

### Quickstart

The frontend is built entirely with javascript, using the [React](https://github.com/reactjs) view engine and community tools.     

## Installation    

1. Install node and npm if you don't already have them:
  ```
  $ sudo apt-get install npm
  ```
2. Run `npm install` from the client directory (`kanjingo-react-redux/client/`)
3. Start the development server `npm run start` from the client directory (`kanjingo-react-redux/client/`)

## Development

1. start Kanjingo with live reload
  ```
  $ npm run start
  ``` 

2. webpack uses babel to compile es6 code into browser compatable code

Webpack will fire up a server which watches all of the files in the repo, and automagically reloads whenever you change something. 

Webpack is also configured to minify and compile all the sourece files into a single distribution file, which is mapped back to the original for development purposes only.


### Code Style
* use *two spaces* to indent javascript

### Style

* It is highly recommended to use an javascript linter 
* the project uses eslint for styling
* the configuration is based on the AirBnB plugin 
* setting this up is different for every editor, for Visual Studio Code just install the eslint extension

### Testing

### Building and Deploying

### Language Codes
