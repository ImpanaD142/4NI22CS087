const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 5000;
const BASE_URL = 'http://20.244.56.144/evaluation-service';

// Utility function to fetch data from the test server
const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(Error fetching data from ${url}:, error.message);
    return null;
  }
};

app.get('/users', async (req, res) => {
  const usersData = await fetchData(${BASE_URL}/users);
  if (!usersData) return res.status(500).send('Failed to fetch users.');

  const userCommentCounts = {};

  // Fetch posts and comments for each user
  const userPromises = Object.keys(usersData.users).map(async (userId) => {
    const postsData = await fetchData(${BASE_URL}/users/${userId}/posts);
    if (postsData && postsData.posts) {
      for (const post of postsData.posts) {
        const commentsData = await fetchData(${BASE_URL}/posts/${post.id}/comments);
        if (commentsData && commentsData.comments) {
          userCommentCounts[userId] = (userCommentCounts[userId] || 0) + commentsData.comments.length;
        }
      }
    }
  });

  await Promise.all(userPromises);

 const topUsers = Object.entries(userCommentCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([userId]) => ({ id: userId, name: usersData.users[userId], comments: userCommentCounts[userId] }));

  res.json(topUsers);
});

// Endpoint: Top/Latest Posts
app.get('/posts', async (req, res) => {
  const { type } = req.query;

  if (!type || !['popular', 'latest'].includes(type)) {
    return res.status(400).send('Invalid type parameter. Accepted values: popular, latest.');
  }

  const usersData = await fetchData(${BASE_URL}/users);
  if (!usersData) return res.status(500).send('Failed to fetch users.');

  const posts = [];

const userPromises = Object.keys(usersData.users).map(async (userId) => {
    const postsData = await fetchData(${BASE_URL}/users/${userId}/posts);
    if (postsData && postsData.posts) {
      posts.push(...postsData.posts);
    }
  });

  await Promise.all(userPromises);

  if (type === 'popular') {
    // Fetch comment counts for each post
    const postCommentCounts = {};
    const postPromises = posts.map(async (post) => {
      const commentsData = await fetchData(${BASE_URL}/posts/${post.id}/comments);
      if (commentsData && commentsData.comments) {
        postCommentCounts[post.id] = commentsData.comments.length;
      }
    });

    await Promise.all(postPromises);

    // Find posts with the maximum comment count
    const maxComments = Math.max(...Object.values(postCommentCounts));
    const popularPosts = posts.filter((post) => postCommentCounts[post.id] === maxComments);

return res.json(popularPosts);
  } else if (type === 'latest') {
    // Sort posts by ID (assuming higher ID means newer post)
    const latestPosts = posts.sort((a, b) => b.id - a.id).slice(0, 5);
    return res.json(latestPosts);
  }
});

app.listen(PORT, () => {
  console.log(Backend server running on http://localhost:${PORT});
});

