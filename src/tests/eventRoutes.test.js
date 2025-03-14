const request = require("supertest");
const app = require("../server"); // Import your server file

describe("Event Routes", () => {
  let token;

  // Test user registration
  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "testpassword",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });

  // Test event creation
  it("should create an event", async () => {
    const res = await request(app)
      .post("/api/events/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Event",
        description: "This is a test event",
        category: "Meetings",
        date: "2025-03-15T10:00:00",
        reminder: true,
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("event");
  });

  // Test getting events
  it("should get a list of events", async () => {
    const res = await request(app)
      .get("/api/events/list")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
