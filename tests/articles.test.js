const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
require("dotenv").config();
const UserModel = require('../models/User');
const ArticleModel = require('../models/articles');


/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.TEST_MONGO_DB_URI);

});

/* Closing database connection after each test. to ensure the integrity of the test*/
afterEach(async () => {
  await mongoose.connection.close();
})


//Test for route to get all published Articles

// describe("GET /api/v1/articles", () => {
//   it("should return all published articles", async () => {
//     const res = await request(app).get("/api/v1/articles");
//     expect(res.statusCode).toBe(200);
//     expect(res.body).toHaveProperty('status', true)
//     expect(res.body).toHaveProperty('article');
//     expect(res.body).toHaveProperty('count');

//   });
// });



//Test for route to get A published Article

// describe("GET /api/v1/articles/:blogID", () => {
//   it("should return a published article", async () => {
//     const res = await request(app).get("/api/v1/articles/6365c0d1e3028bbd628a28fa");
//     expect(res.statusCode).toBe(200);
//     expect(res.body).toHaveProperty('success', true)
//     expect(res.body).toHaveProperty('article');
//     expect(res.body.article).toHaveProperty('title', 'naija');
//     expect(res.body.article).toHaveProperty('author');

//   });
// });


//Test for route to create an article

describe("GET /api/v1/articles/new", () => {
  it("should create a new blog post", async () => {
    await UserModel.create({first_name: 'john',last_name: 'Dave', email: "joeffrgrf2ewf@gmail.com", password: "123456"});
    
    const res = await request(app).post("/api/v1/articles/new")
    .set('content-type', 'application/json')
    .send({
      title: 'test article 2',
      description: 'supertest/jest',
      author : "johnny",
      content: 'testing process',
      // tags: 'tutorial'
    });

    let token = res.body;
    
    // expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('status', true)
    // expect(res.body).toHaveProperty('article');
    // expect(res.body.article).toHaveProperty('title', 'test article 1');
    // expect(res.body.article).toHaveProperty('description', 'supertest/jest');
    // expect(res.body.article).toHaveProperty('content', 'testing process');
    // expect(res.body.article).toHaveProperty('tags',  'tutorial');
    // expect(res.body.article).toHaveProperty('state');
    // expect(res.body.article).toHaveProperty('read_count');
    // expect(res.body.article).toHaveProperty('reading_time');
    // expect(res.body.article).toHaveProperty('_id');
    // expect(res.body.article).toHaveProperty('created_at');
    // expect(res.body.article).toHaveProperty('updated_at');
    // expect(res.body.article).toHaveProperty('__v');

  });
  console.log(token)
});





// describe("POST /api/products", () => {
//   it("should create a product", async () => {
//     const res = await request(app).post("/api/products").send({
//       name: "Product 2",
//       price: 1009,
//       description: "Description 2",
//     });
//     expect(res.statusCode).toBe(201);
//     expect(res.body.name).toBe("Product 2");
//   });
// });
