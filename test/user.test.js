const request = require('supertest');
const app = require('../server');
const { User } = require('../models');

User.destroy({
  where: {},
  truncate: true
});


describe('POST /admin/register', () => {
  it('user admin created', done => {
    const newAdmin = {
      email: 'admin@admin.id',
      password: 'admin'
    }
    request(app)
      .post('/admin/register')
      .send(newAdmin)
      .then(response => {
        const { status, body } = response;

        expect(status).toEqual(201);
        expect(body).toHaveProperty('email', newAdmin.email);
        expect(body).toHaveProperty('password');
        done();
      })
      .catch(err => {
        done(err);
      })
  });

  it('failed to validate', done => {
    const failed = {
      email: 'asdf',
      password: ''
    }
    request(app)
      .post('/admin/register')
      .send(failed)
      .then(response => {
        const { status, body } = response;

        expect(status).toEqual(400);
        expect(body.name).toEqual('SequelizeValidationError');
        done();
      })
      .catch(err => {
        done(err);
      })
  })
});

describe('POST /login', () => {
  it('admin login success', done => {
    const admin = {
      email: 'admin@admin.id',
      password: 'admin'
    }
    request(app)
      .post('/login')
      .send(admin)
      .then(response => {
        const { status, body } = response;
        
        expect(status).toEqual(201);
        done();
      })
      .catch(err => {
        done(err);
      })
  });

  it('wrong email / password', done => {
    const admin = {
      email: '',
      password: ''
    }
    request(app)
      .post('/login')
      .send(admin)
      .then(response => {
        const { status, body } = response;

        expect(status).toEqual(400);
        expect(body).toEqual({message: 'wrong email / password'});
        done();
      })
      .catch(err => {
        done(err);
      })
  });
});

describe('POST /customer/register', () => {
  it('user customer created', done => {
    const newAdmin = {
      email: 'user@user.id',
      password: 'user'
    }
    request(app)
      .post('/customer/register')
      .send(newAdmin)
      .then(response => {
        const { status, body } = response;

        expect(status).toEqual(201);
        expect(body).toHaveProperty('email', newAdmin.email);
        expect(body).toHaveProperty('password');
        done();
      })
      .catch(err => {
        done(err);
      })
  });

  it('failed to validate', done => {
    const failed = {
      email: 'asdf',
      password: ''
    }
    request(app)
      .post('/customer/register')
      .send(failed)
      .then(response => {
        const { status, body } = response;

        expect(status).toEqual(400);
        expect(body.name).toEqual('SequelizeValidationError');
        done();
      })
      .catch(err => {
        done(err);
      })
  })
});
