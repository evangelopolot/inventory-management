import { getUserById } from "../controllers/usersController.js";

const mockRequest = {
  params: {
    id: 1,
  },
};

describe("get users", () => {
  it("should return a list of users", async () => {
    getUserById();
  });
});
