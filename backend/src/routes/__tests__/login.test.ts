import request from "supertest";
import bcrypt from "bcrypt";

import { app, pool } from "../..";

import { duplicateEmail, testUser } from "../../utils/testData";

const route = "/auth/login";

describe("The user login endpoint", () => {
  beforeEach(async () => {
    await pool.query("BEGIN");

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(testUser.password, salt);

    await pool.query(
      "INSERT INTO Users (username, email, password) VALUES ($1, $2, $3)",
      [testUser.username, testUser.email, hashedPassword],
    );
  }, 30000);

  afterEach(async () => {
    await pool.query("ROLLBACK");
  }, 30000);

  afterAll(async () => {
    await pool.end();
  }, 30000);

  it("should login a returning user successfully using their username", async () => {
    const loginData = {
      usernameEmail: testUser.username,
      password: testUser.password,
    };
    const response = await request(app).post(route).send(loginData);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(typeof response.body).toBe("string");
  }, 30000);

  it("should login a returning user successfully using their email", async () => {
    const loginData = {
      usernameEmail: testUser.email,
      password: testUser.password,
    };
    const response = await request(app).post(route).send(loginData);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(typeof response.body).toBe("string");
  }, 30000);

  it("should return an error if the user doesnt exist", async () => {
    const loginData = {
      usernameEmail: duplicateEmail.username,
      password: duplicateEmail.password,
    };
    const response = await request(app).post(route).send(loginData);

    expect(response.status).toBe(401);
    expect(response.body).toBeDefined();
    expect(response.body).toEqual({
      field: "both",
      message: "User not found",
    });
  }, 30000);

  it("should return an error if the password is wrong", async () => {
    const loginData = {
      usernameEmail: testUser.email,
      password: duplicateEmail.password,
    };
    const response = await request(app).post(route).send(loginData);

    expect(response.status).toBe(401);
    expect(response.body).toBeDefined();
    expect(response.body).toEqual({
      field: "password",
      message: "Password is incorrect",
    });
  }, 30000);
});
