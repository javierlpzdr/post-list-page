import apiMock, { postsMock } from "./mocks";
import postsApi from "./api";
import { setupServer } from "msw/node";

describe("Posts API", () => {
  const server = setupServer(...apiMock);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("gets a list of posts", async () => {
    expect(await postsApi.getPosts()).toEqual(postsMock);
  });
});
