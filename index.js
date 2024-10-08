// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require('./router');

const port = 5001;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
