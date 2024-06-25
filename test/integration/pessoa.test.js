const request = require('supertest');
const express = require('express');
const routers = require('../../src/routes/pessoa');
const sequelize = require('../../src/database');
const Pessoa = require('../../src/models/pessoa');

const app = express();
app.use(express.json());
app.use(routers);

describe('Pessoa Controller Integration Tests', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
    await Pessoa.create({
      id: 1,
      nome: 'Teste',
      email: 'teste@teste.com',
      senha: '123456'
    });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('Deve pegar todas as pessoas', async () => {
    const res = await request(app).get('/api/pessoas/');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('Deve pegar uma pessoa pelo ID', async () => {
    const res = await request(app).get('/api/pessoa/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', 1);
  });

  it('Deve adicionar uma nova pessoa', async () => {
    const res = await request(app)
      .post('/api/pessoa')
      .send({
        pessoa: {
          nome: 'Novo Usuário',
          email: 'novo@usuario.com',
          senha: '123456'
        }
      });
    console.log(res.body); // Adicionando log para ver a mensagem de erro
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Adicionado com sucesso!');
  });

  it('Deve alterar uma pessoa existente', async () => {
    const res = await request(app)
      .put('/api/pessoa/1')
      .send({
        nome: 'Teste Alterado',
        email: 'alterado@teste.com',
        senha: '654321'
      });
    console.log(res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Alterado com sucesso!');
  });

  it('Deve deletar uma pessoa existente', async () => {
    const res = await request(app).delete('/api/pessoa/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Deletado com sucesso!');
  });
});
