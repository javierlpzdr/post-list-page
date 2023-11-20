import { rest } from "msw";
import { API_DOMAIN } from "./api";
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
  new URL("/posts/", API_DOMAIN).toString(),
  (req, res, ctx) => {
    const { title } = req.params || {};

    console.log(title);

    if (title) return res(ctx.json(getPostByFilter(String(title))));
    return res(ctx.json(postsMock));
  },
);

export default [getPostsMock];
