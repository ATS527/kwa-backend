//express app that listens in port 3000
const express = require('express');
const app = express();
require("dotenv").config();
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



