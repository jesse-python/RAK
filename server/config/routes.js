var mongoose = require('mongoose');

var Users = require('./../controllers/users.js');

var Acts = require('./../controllers/acts.js');

var Pictures = require('./../controllers/pictures.js');

var Comments = require('./../controllers/comments.js');

var Feedback = require('./../controllers/feedbacks.js');







module.exports = function(app) {

  app.patch('/friends/:id', function(req, res) {

    Users.destroy(req, res)
  })


  app.post('/feedback', Feedback.create)

  app.post('/comments', Comments.create)

	app.post('/users', Users.create)

	app.post('/users/addact', Users.addAct)

  // app.patch('/users/completeact', Users.completeAct)

	app.post('/friends/:id' , Users.addFriend)

	app.get('/users', Users.index)

  app.get('/acts', function(req, res) {
    Acts.index(req, res)
  })

  app.post('/loginuser', function(req, res) {
  
    Users.login(req, res);
  })

  app.post('/acts', function(req, res) {
    Acts.create(req, res)
  })

  app.get('/users/:id', function(req, res) {
    Users.show(req,res);
  })

  app.patch('/acts/:id', function(req, res) {
    Acts.update(req, res)
  })

  app.get('/friends/:id', function(req, res) {
    Users.show(req, res);
  })

  app.get('/acts/:id', function(req, res) {
    Acts.show(req, res);
  })


}