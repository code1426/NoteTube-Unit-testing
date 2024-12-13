import { app } from "../index";

describe("The backend", () => {
  it("starts successfully", async () => {
    expect(app).toBeDefined();
  });
});
