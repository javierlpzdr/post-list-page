export const API_DOMAIN = "https://jsonplaceholder.typicode.com";
export default {
  getPosts: async (title?: string) => {
    const params = new URLSearchParams({
      ...(title && { title }),
    });

    const response = await fetch(
      new URL(`/posts/?${params.toString()}`, API_DOMAIN)
    );
    return await response.json();
  },
  updatePost: async (id: number, post: { title?: string; body?: string }) => {
    const response = await fetch(new URL(`/posts/${id}`, API_DOMAIN), {
      method: "PUT",
      body: JSON.stringify({
        id,
        userId: 1,
        ...post,
      }),
    });

    return await response.json();
  },
};
