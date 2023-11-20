export const API_DOMAIN = "https://jsonplaceholder.typicode.com";
export default {
  getPosts: async (title: string) => {
    console.log(title);
    const params = new URLSearchParams({
      title,
    });

    const response = await fetch(new URL(`/posts/?${params}`, API_DOMAIN));
    const data = await response.json();

    return data;
  },
};
