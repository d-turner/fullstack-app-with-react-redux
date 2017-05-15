# Introduction

Welcome to Kanjingo-React-Redux, a flexible web-based CAT tool for post editing machine translations.

## Quickstart

The frontend is built entirely with JavaScript, using the [React](https://github.com/reactjs) view engine and community tools.     

### Installation    

1. Install Node and NPM if you don't already have them:
  ```
  $ sudo apt install npm
  ```
2. Run `npm install` from the client directory (`kanjingo-react-redux/client/`)
3. Start the development server with `npm run start` from the client directory (`kanjingo-react-redux/client/`)

### Development

The development server uses webpack and babel to compile es6 code into browser compatable code.  

Webpack will fire up a server which watches all of the files in the repo, and automagically reloads whenever you change one of the components.  

Webpack is also configured to minify and compile all the sourece files into a single distribution file.   

Webpack uses 'cheap-module-source-map' to map the code in the single distribution file back to the original file.

### Production

1. Install Node and NPM if you don't already have them:
  ```
  $ sudo apt install npm
  ```
2. Run `npm install` from the production directory (`kanjingo-react-redux/server/`) 
3. start the production server with `npm run start` from the server directory

### Style

* It is highly recommended to use a JavaScript linter 
* This project uses eslint for styling
* The configuration is based on AirBnB's eslint plugin
* Use *two spaces* to indent javascript
* Setting eslint is different for every editor, for Visual Studio Code just install the eslint extension

### Testing

Jest is used as the testing framework as recommended by React.  
For testing it is recommended to use 'deep-freeze' on objects that are passed to reducers.  
This ensures that objects don't get mutated and the reducers are pure functions.

### Building and Deploying

### Language Codes
