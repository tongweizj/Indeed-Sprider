const express = require('express');
const {
    check,
    validationResult
} = require('express-validator');
const router = express.Router();

const mongoose = require('mongoose');
const Jds = mongoose.model('Jds');

const path = require('path');
const auth = require('http-auth');
const basic = auth.basic({
    file: path.join(__dirname, '../users.htpasswd'),
});

// url: 127.0.0.1/admin/
router.get('/', basic.check((req, res) => {
    res.render('admin/index', {
        title: 'Home | admin',
        path: '/admin/',
        jobTitle: 'Home | admin'
    });

}));

// url: 127.0.0.1/admin/mp/jd/1
router.get('/mp/jd/1', basic.check((req, res) => {
    Jds.find({
            jobTitle: 'Machine Learning Engineer'
        }).sort({
            postDate: -1
        }).limit(10)
        .then((jds) => {
            jds.forEach(function (item, index) {
                item.index = index + 1
            });

            res.render('admin/jds', {
                title: 'Jds | admin',
                path: '/admin/mp',
                jobTitle: 'Machine Learning Engineer',
                jds
            });
        })
        .catch(() => {
            res.send('Sorry! Something went wrong.');
        });
}));
// url: 127.0.0.1/admin/mp/jd/2
router.get('/mp/jd/2', basic.check((req, res) => {
    Jds.find({
            jobTitle: 'Full Stack Developer'
        }).sort({
            postDate: -1
        }).limit(10)
        .then((jds) => {
            jds.forEach(function (item, index) {
                item.index = index + 1
            });

            res.render('admin/jds', {
                title: 'Jds | admin',
                path: '/admin/mp',
                jobTitle: 'Full Stack Developer',
                jds
            });
        })
        .catch(() => {
            res.send('Sorry! Something went wrong.');
        });
}));

module.exports = router;