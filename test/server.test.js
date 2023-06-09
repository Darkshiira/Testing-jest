const { db } = require('../server/MongoDatabase');
const {server} = require('../server/server');
const request = require('supertest');

beforeAll(async () => {
    await db.connect();
});

describe('testing endpoints', () => {

    test('post to /register should return 201 statuscode if username and password is sufficient', async () => {

        const reponse = await request(server).post('/register').send({username: 'test', password: 'test'})
        expect(reponse.status).toBe(201)
    })

    test('post to /register should return 400 statuscode if username and password is insufficient', async () => {

        const reponse = await request(server).post('/register').send({})
        expect(reponse.status).toBe(400)
    })

    test('post to /login should return 200 statuscode if username and password is sufficient', async () => {

        const response = await request(server).post('/login').send({username: 'Loki', password: 'hundben'})
        expect(response.status).toBe(200);

    })

    test('post to /login should return 400 statuscode if username and password is insufficient', async () => {
            
            const response = await request(server).post('/login').send({})
            expect(response.status).toBe(401);
    
        })

})

afterAll(() => {
    db.disconnect();
});