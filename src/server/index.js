// const express = require('express');
// const os = require('os');

// const app = express(); npx kill-port 3000 8080

// app.use(express.static('dist'));
// app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

// app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

const jsonServer = require('json-server');
const auth = require('json-server-auth');

const server = jsonServer.create();
const routes = jsonServer.router('db.json');
const authRoles = jsonServer.router('routes.json');
const middlewares = jsonServer.defaults({ static: 'dist' });
server.db = authRoles.db;
const rules = auth.rewriter({
  'api/posts': 640,
});
server.use(rules);
server.use(middlewares);
server.use(auth);
server.use('/api', routes);
// server.use(router);

server.listen(process.env.PORT || 8080, () => {
  console.log(`JSON Server is running ${process.env.PORT || 8080}!`);
});
