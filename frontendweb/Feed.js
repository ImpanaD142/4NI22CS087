import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { getLiveFeed } from "../services/api";

const Feed = () => {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const fetchFeed = async () => {
      const data = await getLiveFeed();
      setFeed(data);
    };
    fetchFeed();
    const interval = setInterval(fetchFeed, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Grid container spacing={2} padding={2}>
      {feed.map((item) => (
        <Grid item xs={12} key={item.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{item.title}</Typography>
              <Typography>{item.body}</Typography>
              <Typography color="textSecondary">Posted at: {new Date(item.timestamp).toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Feed;
