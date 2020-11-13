// const express = require('express');
// const os = require('os');

// const app = express();

// app.use(express.static('dist'));
// app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

// app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({ static: 'dist' });

server.use(middlewares);
server.use(router);
server.use((req, res, next) => {
  if (isAuthorized(req)) { // add your authorization logic here
    next(); // continue to JSON Server router
  } else {
    res.sendStatus(401);
  }
});






server.listen(process.env.PORT || 8080, () => {
  console.log(`JSON Server is running ${process.env.PORT || 8080}!`);
});


