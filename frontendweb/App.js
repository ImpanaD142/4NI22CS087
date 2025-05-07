import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import TopUsers from "./pages/TopUsers";
import TrendingPosts from "./pages/TrendingPosts";
import Feed from "./pages/Feed";

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Social Media Analytics
          </Typography>
          <Button color="inherit" component={Link} to="/top-users">Top Users</Button>
          <Button color="inherit" component={Link} to="/trending-posts">Trending</Button>
          <Button color="inherit" component={Link} to="/feed">Feed</Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/top-users" element={<TopUsers />} />
        <Route path="/trending-posts" element={<TrendingPosts />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </Router>
  );
}

export default App;

