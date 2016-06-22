# todo-react-sass

Example todo list application based on bootstrap sass, react and webpack

## Global dependencies

```
$ npm install -g webpack pm2
```

## Setup dependencies

````
$ npm install
```

### Build sources

```
$ WEBPACK_ENV=production webpack --config webpack.prod.config.js
```

### Server

Development: `$ npm run dev`, production: `$ NODE_ENV=production pm2 start server.prod.js --name="todo-sass"` or `npm run prod`.

