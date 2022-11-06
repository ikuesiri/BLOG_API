const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');


require("dotenv").config();


/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.TEST_MONGO_DB_URI);
});

/* Closing database connection after each test. to ensure the integrity of the test*/
afterEach(async () => {
  await mongoose.connection.close();
})


//Test for route to get all published Articles

describe("Auth : Register", () => {
    
      it('should signup a user', async () => {
            const res = await request(app).post("/api/v1/auth/register")
            .set('content-type', 'application/json')
                .send({ 
            
                        first_name: 'Pete',
            last_name: 'Dave',
            email: 'pdave@gmail.com',
            password: '123456'
        })

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('message'),
        expect(res.body).toHaveProperty('user')
        expect(res.body.user).toHaveProperty('first_name', 'pete')
        expect(res.body.user).toHaveProperty('last_name', 'dave')
        //expect lowercase for the names, since the scema contains 'lowercase : true'


  })


});


describe("Auth : Login", () => {

    it('should signin a user', async () => {
    const res = await request(app).post("/api/v1/auth/login")
    .set('content-type', 'application/json')
        .send({ 

            email: 'pdave@gmail.com',
            password: '123456'
        })
      
        expect(res.statusCode).toBe(200);
        
           

  })

});