const request = require('supertest'); //request is default naming convention
const app = require('../../index');  //notice the symbol for moving 2 levels up. 

process.env.NODE_ENV = 'test'; //this line must always be before the db import. 
const db = require('../DB')

let testUser; //empty variable used to hold the values form returning SQL

beforeEach(async () => {
    const result = await db.query(`INSERT INTO users (name, rentalcity, date) VALUES ('Slowking', 'Slowpoke Island', '02-01-1992') RETURNING id, name, rentalcity, date`);

    testUser = result.rows[0];
});

//after each idv test it will empty out the table. 
afterEach(async () => {
    await db.query(`DELETE FROM users`);
});


//afterAll function will run when all the tests are finished. this is important in stopping the connection with the server. or else server will always be live.
afterAll(async () => {
    await db.end()
});

describe("GET: users in the test DB", () => {
    test("this line describes the actual test", async() => {
        console.log(testUser);      
    })
});

describe("POST /users/new ", () => {
    test("creating a new user in airbnb_test db", async() => {
        const res = await request(app).post('/airbnb/users/new').send({ name: 'Josh', rentalcity: 'Shinjuku City', date: '09-12-2024' });
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ 
            Added: { id: expect.any(Number), name: 'Josh', rentalcity: 'Shinjuku City', date: '09-12-2024' } 
        });
    });
});

describe("PATCH /users/update/:id", () => {
    test("updating user information in airbnb_test db", async() => {
        const response = await request(app).patch(`/airbnb/users/update/${testUser.id}`).send({ name: 'Psyduck', rentalcity: 'Cerulean City', date: '02-12-2020' });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ id: expect.any(Number), name: 'Psyduck', rentalcity: 'Cerulean City', date: '02-12-2020' })
    });
});

describe("DELETE: /users/:id/delete", () => {
    test("delete user from db", async() => {
        const response = await request(app).delete(`/airbnb/users/${testUser.id}/delete`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ deleted: { id: expect.any(Number), name: 'Slowking', rentalcity: 'Slowpoke Island', date: '02-01-1992' }});
    });
});
