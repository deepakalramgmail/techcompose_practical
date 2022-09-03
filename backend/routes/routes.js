const routes = require('express').Router();

const user = require('../controller/user');

routes.post('/user/add/personal', user.add_personal);
routes.post('/user/add/business', user.add_business);
routes.delete('/user/delete/:id', user.deleteUser);
routes.get('/users/:id', user.single_user);
routes.post('/users', user.list);

module.exports = routes;