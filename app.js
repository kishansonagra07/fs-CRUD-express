const express = require("express");
const blogRoute = require("./routes/blogRoute");

const app = express();
app.use(express.json());

app.use('/api/v1/blogs',blogRoute);

module.exports = app;