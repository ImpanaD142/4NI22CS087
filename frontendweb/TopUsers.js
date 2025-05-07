import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid, Avatar } from "@mui/material";
import { getTopUsers } from "../services/api";

const TopUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getTopUsers().then(setUsers);
  }, []);

  return (
    <Grid container spacing={2} padding={2}>
      {users.map((user) => (
        <Grid item xs={12} sm={6} md={4} key={user.id}>
          <Card>
            <CardContent>
              <Avatar src={user.image} alt={user.name} sx={{ width: 56, height: 56, mb: 2 }} />
              <Typography variant="h6">{user.name}</Typography>
              <Typography color="textSecondary">Posts: {user.postCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default TopUsers;