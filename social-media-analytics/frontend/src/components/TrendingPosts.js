import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const TrendingPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/posts?type=popular');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching trending posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Trending Posts
      </Typography>
      <List>
        {posts.map((post) => (
          <ListItem key={post.id}>
            <ListItemText primary={post.content} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TrendingPosts;


