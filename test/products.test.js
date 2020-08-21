require('dotenv').config();
const request = require('supertest');
const app = require('../server');
const { Product } = require('../models');

Product.destroy({
  where: {},
  truncate: true
});

let id = 1;
const access_token = process.env.testAccessToken;

describe('GET /products', function() {
  it('get all products', function(done) {
    request(app)
      .get('/products')
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
});

describe('POST /products', () => {
  it('data added', done => {
    const addData = {
      name: 'ada',
      image_url: 'ada juga',
      price: 2000,
      stock: 10
    }
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send(addData)
      .expect('Content-Type', /json/)
      .then(response => {
        const { status, body } = response;
        id = body.id;
        expect(status).toEqual(201);
        expect(body).toHaveProperty('name', addData.name);
        expect(body).toHaveProperty('image_url', addData.image_url);
        expect(body).toHaveProperty('price', addData.price);
        expect(body).toHaveProperty('stock', addData.stock);
        done();
      })
      .catch(err => {
        done(err);
      })
  });

  it(`didn't have access`, (status, body) => {
    request(app)
      .post('/products')
      .expect(401, status)
      .expect({message: `didn't have access`}, body)
  });

  it('validation error', done => {
    const addData = {
      name: '',
      stock: ''
    }
    request(app)
      .post('/products')
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

describe('PUT /products/:id', () => {
  it('success updated data', done => {
    const editData = {
      name: 'berubah',
      stock: 22,
      price: 1000,
      image_url: 'kosong'
    }
    request(app)
      .put('/products/' + id)
      .set('access_token', access_token)
      .send(editData)
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;
        expect(200).toEqual(status);
        expect({message: 'product updated'}).toEqual(body);
        done();
      })
      .catch(err => {
        done(err);
      })
  });

  it(`didn't have access`, (status, body) => {
    request(app)
      .put('/products/' + id)
      .expect(401, status)
      .expect({message: `didn't have access`}, body)
  });

  it('products not found', done => {
    request(app)
      .put('/products/3000')
      .set('access_token', access_token)
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

describe('DELETE /products/:id', () => {
  it(`didn't have access`, (status, body) => {
    request(app)
    .delete('/products/' + id)
      .expect(401, status)
      .expect({message: `didn't have access`}, body)
  });
    
  it('success deleted data', done => {
    request(app)
      .delete('/products/' + id)
      .set('access_token', access_token)
      .expect('Content-Type', /json/)
      .then(response => {
        const { body, status } = response;
        expect(200).toEqual(status);
        expect(body).toEqual({message: 'product deleted'});
        done();
      })
      .catch(err => {
        done(err);
      })
  });

    it('products not found', done => {
    request(app)
      .delete('/products/3000')
      .set('access_token', access_token)
      .then(response => {
        const { body, status } = response;

        expect(404).toEqual(status);
        expect(body).toEqual({message: 'NOT FOUND'});
        done();
      })
      .catch(err => {
        done(err);
      })
  });
});
