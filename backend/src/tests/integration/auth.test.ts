import request from "supertest";
import { app, pool } from "../../index";

describe("The user registration endpoint", () => {
  const baseRoute = "/auth/register";

  afterAll(async () => {
    await pool.query("DELETE FROM Users WHERE username='shish'"); // cleanup users table after testing all
    await pool.end(); // close the db connection after testing all
  });

  // ADDING A NEW USER
  it("should register a new user successfully", async () => {
    const response = await request(app).post(baseRoute).send({
      username: "shish",
      email: "shishwow@test.com",
      password: "passwordKo12345",
    });

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(typeof response.body).toBe("string");
  });

  // ADDING A NEW USER WITH THE SAME USERNAME
  it("should return an error if the username is already taken", async () => {
    const response = await request(app).post(baseRoute).send({
      username: "shish",
      email: "testing@test.com",
      password: "passwordKo123456",
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      field: "username",
      message: "This username is already taken. Try another one!",
    });
  });

  // ADDING A NEW USER WITH THE SAME EMAIL
  it("should return an error if the email is already in use", async () => {
    const response = await request(app).post(baseRoute).send({
      username: "test2",
      email: "shishwow@test.com",
      password: "passwordKo1234567",
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      field: "email",
      message: "This email is already in use. Please use a different one.",
    });
  });
});
