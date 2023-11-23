import apiMock, { postsMock } from "./mocks";
import postsApi from "./";
import { setupServer } from "msw/node";

describe("Posts API", () => {
  const server = setupServer(...apiMock);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("gets a list of posts", async () => {
    expect(await postsApi.getPosts("")).toEqual(postsMock);
  });

  it("gets a post with the title 'hey'", async () => {
    expect(await postsApi.getPosts("hey")).toEqual([{...postsMock[0], title: "hey"}])
  });

  it("updates a post with ID 1 with the title 'hey' and body 'lorem ipsum'", async () => {
    expect(await postsApi.updatePost(1, {title: "hey", body: "lorem ipsum"})).toEqual({...postsMock[0], title: "hey", body: "lorem ipsum"})
  });
});
