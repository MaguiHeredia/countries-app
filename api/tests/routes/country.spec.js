/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country, conn } = require('../../src/db.js');

const agent = session(app);
const country = {
  name: 'Argentina',
};

// describe('Country routes', () => {
//   before(() => conn.authenticate()
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   }));
//   beforeEach(() => Country.sync({ force: true })
//     .then(() => Country.create(Country)));
//   describe('GET /countries', () => {
//     it('should get 200', () =>
//       agent.get('/countries').expect(200)
//     );
//   });
// });
describe('GET /countries/:id', function () {

  it('GET responde con error si no se le pasa un id correcto', function () {
    agent.get('/countries/ARGENTINA')
      .expect(400)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(res.body).to.deep.eql({error: 'No country with that id was found'})
      })
  })
})