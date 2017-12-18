const mongoose = require("mongoose");
const User = require('../models').User;
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('User', () => {
  beforeEach((done) => {
    User.remove({}, (err) => {
      done();
    });
  });
  describe('/GET user', () => {
    it('it should GET all the users', (done) => {
      chai.request(server)
        .get('/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
  describe('/POST user', () => {
    it('it should POST a user ', (done) => {
      const user = {
        name: 'carlo',
        password: 'pippo'
      }
      chai.request(server)
        .post('/user')
        .send(user)
        .end((err, res) => {
          res.should.have.status(202);
          res.body.should.be.a('string');
          done();
        });
    });
  });
  describe('/GET?_id user', () => {
    it('it should GET a user by the given id', (done) => {
      const user = new User({
        name: 'gesu',
        password: 'cristo'
      });
      user.save((err, user) => {
        chai.request(server)
          .get('/user?_id=' + user._id)
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('password');
            res.body.should.have.property('_id').eql(user._id.toString());
            done();
          });
      });

    });
  });
  describe('/PUT?_id user', () => {
    it('it should UPDATE a user given the id', (done) => {
      const user = new User({
        name: 'carlo',
        password: 'babbo'
      })
      user.save((err, user) => {
        chai.request(server)
          .put('/user?_id=' + user._id)
          .send({
            name: 'carlo',
            password: 'suca'
          })
          .end((err, res) => {
            res.should.have.status(202);
            done();
          });
      });
    });
  });
  describe('/DELETE?_id user', () => {
    it('it should DELETE a user given the id', (done) => {
      const user = new User({
        name: 'carlo',
        password: 'suca'
      }); 
      user.save((err, user) => {
        chai.request(server)
          .delete('/user?_id=' + user._id)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });
});