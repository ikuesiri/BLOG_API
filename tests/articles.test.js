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

describe("GET /api/v1/articles", () => {
  it("should return all published articles", async () => {
    const res = await request(app).get("/api/v1/articles");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', true)
    expect(res.body).toHaveProperty('article');
    expect(res.body).toHaveProperty('count');

  });
});

