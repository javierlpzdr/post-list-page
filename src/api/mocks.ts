import { rest } from "msw";
import { API_DOMAIN } from "./";
export const postsMock = [
  {
    userId: 1,
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
];

const getPostByFilter = (title: string) => {
  return [{ ...postsMock[0], title }];
};

const getPostsMock = rest.get(
  new URL("/posts*", API_DOMAIN).toString(),
  (req, res, ctx) => {
    const url = new URL(req.url)
    const title = url.searchParams.get("title");

    if (title) return res(ctx.json(getPostByFilter(String(title))));
    
    return res(ctx.json(postsMock));
  },
);

const updatePostMock = rest.put(new URL("/posts/:id", API_DOMAIN).toString(), async (req, res, ctx) => {
  const response = await req.json()
  return res(ctx.json(response));
})

export default [getPostsMock, updatePostMock];
