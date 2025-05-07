// Handles communication with backend APIs for user, post, and feed data

export const getTopUsers = async () => {
    const response = await fetch("http://localhost:5000/api/top-users");
    if (!response.ok) throw new Error("Failed to fetch top users");
    return response.json();
  };
  
  export const getTrendingPosts = async () => {
    const response = await fetch("http://localhost:5000/api/trending-posts");
    if (!response.ok) throw new Error("Failed to fetch trending posts");
    return response.json();
  };
  
  export const getLiveFeed = async () => {
    const response = await fetch("http://localhost:5000/api/feed");
    if (!response.ok) throw new Error("Failed to fetch feed");
    return response.json();
  };
  