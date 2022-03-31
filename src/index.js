const express = require('express');

const connectDB = require('./configs/db');

const app = express();
const PORT = 8000;

app.use(express.json());

connectDB();

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});