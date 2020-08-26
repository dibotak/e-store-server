require('dotenv').config();
const request = require('supertest');
const app = require('../server');
const { Order } = require('../models');

beforeAll((done) => {
  done();
});

afterAll((done) => {
  Order.destroy({
    where: {},
    truncate: true
  }).then(done);
})

let id = 1;
const access_token = process.env.testAccessToken;

describe('GET /cart', function() {
  it('get user order', function(done) {
    request(app)
      .get('/cart')
      .set('access_token', access_token)
      .expect('Content-Type', /json/)
      .then(response => {
        const { status, body } = response;
        expect(status).toEqual(200);
        done();
      })
      .catch(err => {
        done(err);
      })
  });

  it(`didn't have access`, (status, body) => {
    request(app)
      .get('/cart')
      .expect(401, status)
      .expect({message: `didn't have access`}, body)
  });
});

describe('POST /cart', () => {
  it('data added to user cart', done => {
    const addData = {
      ProductId: 2,
      quantity: 2
    }
    request(app)
      .post('/cart')
      .set('access_token', access_token)
      .send(addData)
      .expect('Content-Type', /json/)
      .then(response => {
        const { status, body } = response;
        id = body.id;
        expect(status).toEqual(201);
        expect(body).toHaveProperty('UserId');
        expect(body).toHaveProperty('status', 'on_cart');
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it(`didn't have access`, (status, body) => {
    request(app)
      .post('/cart')
      .expect(401, status)
      .expect({message: `didn't have access`}, body)
  });

  it('validation error', done => {
    const addData = {
      ProductId: '',
      quantity: ''
    }
    request(app)
      .post('/cart')
      .set('access_token', access_token)
      .send(addData)
      .expect('Content-Type', /json/)
      .then(response => {
        const { status, body } = response;
        expect(status).toEqual(400);
        expect(body.name).toEqual("SequelizeValidationError");
        done();
      })
      .catch(err => {
        done(err);
      })
  });
});

describe('DELETE /cart', () => {
  it(`didn't have access`, (status, body) => {
    request(app)
      .delete('/cart')
      .send({ id })
      .expect(401, status)
      .expect({message: `didn't have access`}, body)
  });
    
  it('success deleted data', done => {
    request(app)
      .delete('/cart')
      .set('access_token', access_token)
      .send({ id })
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;
        expect(status).toEqual(200);
        expect(body).toEqual({message: 'order deleted'});
        done();
      })
      .catch(err => {
        done(err);
      })
  });

    it('products not found', done => {
    request(app)
      .delete('/cart')
      .set('access_token', access_token)
      .send({ id: 2000 })
      .then(response => {
        const { body, status } = response;

        expect(status).toEqual(404);
        expect(body).toEqual({message: 'NOT FOUND'});
        done();
      })
      .catch(err => {
        done(err);
      })
  });
});
