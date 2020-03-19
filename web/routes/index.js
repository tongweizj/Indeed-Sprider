const express = require('express');
const mongoose = require('mongoose');


const { check, validationResult } = require('express-validator');

const router = express.Router();
const Registration = mongoose.model('Registration');
const Jds = mongoose.model('Jds');

const path = require('path');
const auth = require('http-auth');
const basic = auth.basic({
  file: path.join(__dirname, '../users.htpasswd'),
});

router.get('/', (req, res) => {
  Jds.find()
    .then((jds) => {
      // console.log(jds)
      res.render('index', { title: 'Listing jds',path: '/', jds });
    })
    .catch(() => { res.send('Sorry! Something went wrong.'); });
});

router.get('/regrist', (req, res) => {
  res.render('form', { title: 'Registration form' });
});

router.post('/regrist', 
  [
    check('name')
    .isLength({ min: 1 })
    .withMessage('Please enter a name'),
    check('email')
    .isLength({ min: 1 })
    .withMessage('Please enter an email'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const registration = new Registration(req.body);
      registration.save()
      .then(() => { res.send('Thank you for your registration!'); })
      .catch((err) => {
        console.log(err);
        res.send('Sorry! Something went wrong.');
      });
    } else {
      res.render('form', {
        title: 'Registration form',
        errors: errors.array(),
        data: req.body,
      });
    }
  });

router.get('/registrations', basic.check((req, res) => {
  Registration.find()
    .then((registrations) => {
      res.render('index', { title: 'Listing registrations', registrations });
    })
    .catch(() => { res.send('Sorry! Something went wrong.'); });
}));



module.exports = router;