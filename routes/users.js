const express = require('express');
const router = express.Router();

// Article model
const Users = require('../models/users');

// new article form
router.get('/add', function(req, res){
  res.render('add_user', {
    title: 'Nuevo Usuario'
  });
});

// submit new article 
router.post('/add', function(req, res){
  // Express validator
  req.checkBody('username', 'Username se require').notEmpty();
  req.checkBody('email', 'Email se requires').notEmpty();
  req.checkBody('password', 'Password se require').notEmpty();
  
  // Get errors
  let errors = req.validationErrors();

  if(errors){
    res.render('add_user', {
      title: 'Nuevo usuario',
      errors: errors
    });
  } else {
    let users = new Users();
    users.username = req.body.username;
    users.email = req.body.email;
    users.password = req.body.password;
    users.pin = req.body.pin;

    users.save(function(err){
      if(err) {
        console.error(err);
        return;
      } else {
        req.flash('success', 'Usuario agregado');
        res.redirect('/');
      }
    });
  }
});

// load edit form
router.get('/edit/:id', function(req, res){
  Users.findById(req.params.id, function(err, users){
    res.render('edit_user', {
      title: 'Editar Usuario',
      users: users
    });
  });
});

// update submit new article 
router.post('/edit/:id', function(req, res){
  let users = {};
  users.username = req.body.username;
  users.email = req.body.email;
  users.password = req.body.password;
  users.pin = req.body.pin;

  let query = {_id: req.params.id};

  Users.update(query, users, function(err){
    if(err) {
      console.error(err);
      return;
    } else {
      req.flash('success', 'Usuario actualizado');
      res.redirect('/');
    }
  })
});

// Delete post
router.delete('/:id', function(req, res){
  let query = {_id: req.params.id};

  Users.remove(query, function(err){
    if(err) {
      console.error(err);
      return;
    } else {
      req.flash('success', 'Usuario removido')
      res.send('Success');
    }
  });
});

// get single article
router.get('/:id', function(req, res){
  Users.findById(req.params.id, function(err, users){
    res.render('user', {
      users: users
    });
  });
});

module.exports = router;