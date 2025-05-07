import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { getTrendingPosts } from "../services/api";

const TrendingPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getTrendingPosts().then(setPosts);
  }, []);

  return (
    <Grid container spacing={2} padding={2}>
      {posts.map((post) => (
        <Grid item xs={12} sm={6} md={4} key={post.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{post.title}</Typography>
              <Typography>{post.body}</Typography>
              <Typography color="textSecondary">Comments: {post.commentCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default TrendingPosts;