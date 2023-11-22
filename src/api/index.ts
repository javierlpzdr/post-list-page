export const API_DOMAIN = "https://jsonplaceholder.typicode.com";
export default {
  getPosts: async (title?: string) => {
    const params = new URLSearchParams({
       ...(title && {title})
    })
    
    const response = await fetch(new URL(`/posts/?${params.toString()}`, API_DOMAIN));
    const data = await response.json();
    return data;
  },
};
