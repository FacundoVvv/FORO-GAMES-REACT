export const getPosts = async (section) => {
    try {
        const response = await fetch(
          `http://localhost:3000/forum/posts/get-posts/${section}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
        return data.posts;
        } else {
          console.warn("Error al obtener posts:", response.statusText);
        }
      } catch (error) {
        console.error("Error al hacer fetch:", error);
      }
    
}