import axios from "axios";
export const fetchPosts = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
      return response.data; // Returns the array of posts
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  };

  export const fetchPostById = async (id) => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
      return response.data; // Returns the post object
    } catch (error) {
      console.error("Error fetching post:", error);
      throw error;
    }
  };

  