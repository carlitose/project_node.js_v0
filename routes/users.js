const route = require('express').Router();
const User = require('../models').User;
const logger = require('winston');

route.post('/user', (req, res) => {
    if (!req.body || !req.body.name || !req.body.password) {
        return res.status(404).end('No user found');
    }
    User.add(req.body).then((data) => {
        res.status(202).send(data);

    }).catch(err => {
        if (err) {
            logger.error(err, '~routes~users~getAll');
            res.status(505).end('Internal Server Error');
        }
    });
});

route.get('/user', (req, res) => {
    if (!req.query || !req.query._id) {
        return res.status(404).end('No id users found');
    }
    console.log(req.query._id);
    User.get(req.query._id).then((data) => {
        res.status(202).json(data);

    }).catch(err => {
        if (err) {
            logger.error(err, '~routes~users~getAll');
            res.status(505).end('Internal Server Error');
        }
    });
});

route.get('/users', (req, res) => {
    const query = req.query || null;
    User.getAll(query).then((data) => {
        res.status(202).send(data);
    }).catch(err => {
        if (err) {
            logger.error(err, '~routes~users~getAll');
            res.status(505).end('Internal Server Error');
        }
    });
});

route.put('/user', (req, res) => {
    if (!req.query || !req.query._id) {
        return res.status(404).end('No id users found');
    }
    if (!req.body || !req.body.name || !req.body.password) {
        return res.status(404).end('No user found');
    }
    User.edit(req.query._id, req.body).then(() => {
		res.status(202).send(req.query._id);
    }).catch(err => {
        if (err) {
            logger.error(err, '~routes~users~edit');
            res.status(505).end('Internal Server Error');
        }
    });
});

module.exports = route;