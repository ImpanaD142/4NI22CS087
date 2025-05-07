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

