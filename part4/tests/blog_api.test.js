const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("notes are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("correct number of blogs", async () => {
  const res = await api.get("/api/blogs");

  expect(res.body).toHaveLength(4);
}, 10000);

test("add new data", async () => {
  const newData = {
    title: "indiana bones",
    author: "channel5",
    url: "youtube",
    liked: 421,
  };

  await api.post('/api/blogs')
  .send(newData)
  .expect(200)
  .expect('Content-Type', /application\/json/)

  
});

afterAll(() => {
  mongoose.connection.close();
});
