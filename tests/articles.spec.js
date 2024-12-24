const request = require("supertest");
const app = require("../server").app;
const mockingoose = require("mockingoose");
const Article = require("../api/articles/articles.schema");
const User = require("../api/users/users.model");
const jwt = require("jsonwebtoken");

describe("Articles API", () => {
  const userMock = {
    _id: "64b1f9e7f1b2c9a1d4b5c8f0",
    role: "admin",
  };

  const token = jwt.sign({ userId: userMock._id, role: userMock.role }, "test", {
    expiresIn: "3d",
  });

  beforeEach(() => {
    mockingoose.resetAll();
    // Mock utilisateur pour le middleware d'authentification
    mockingoose(User).toReturn(userMock, "findOne");
  });

  it("should create an article", async () => {
    const articleMock = {
      _id: "64b1fa23f1b2c9a1d4b5c8f1",
      title: "Test Article",
      content: "This is a test article.",
      user: userMock._id,
    };

    mockingoose(Article).toReturn(articleMock, "save");

    const res = await request(app)
      .post("/api/articles")
      .set("x-access-token", token)
      .send({
        title: "Test Article",
        content: "This is a test article.",
      });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      title: "Test Article",
      content: "This is a test article.",
      user: userMock._id,
    });
  });

  it("should update an article", async () => {
    const articleMock = {
      _id: "64b1fa23f1b2c9a1d4b5c8f1",
      title: "Updated Article",
      content: "This is an updated article.",
      user: userMock._id,
    };

    mockingoose(Article).toReturn(articleMock, "findOneAndUpdate");

    const res = await request(app)
      .put("/api/articles/64b1fa23f1b2c9a1d4b5c8f1")
      .set("x-access-token", token)
      .send({
        title: "Updated Article",
        content: "This is an updated article.",
      });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      title: "Updated Article",
      content: "This is an updated article.",
    });
  });

  it("should delete an article", async () => {
    const articleId = "64b1fa23f1b2c9a1d4b5c8f1";

    mockingoose(Article).toReturn({}, "findOneAndDelete");

    const res = await request(app)
      .delete(`/api/articles/${articleId}`)
      .set("x-access-token", token);

    expect(res.status).toBe(204);
  });
});
