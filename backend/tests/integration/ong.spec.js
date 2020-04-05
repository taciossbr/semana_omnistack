const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback()
    await connection.migrate.latest()
  })

  afterEach(async () => {
    connection.destroy()
  })

  it('should to be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      // .set('Authorization', 'ssfdsf')
      .send({
        name: "APAD",
        email: "contato@apad.com.br",
        whatsapp: "1142435354",
        city: "Osasco",
        uf: "SP"
      })
    
      expect(response.body).toHaveProperty('id')
      expect(response.body.id).toHaveLength(8)
  })
})