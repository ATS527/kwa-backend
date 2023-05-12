const express = require("express");
const expressFileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const db = require("./config/db");
require("dotenv").config();
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(expressFileUpload());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
  origin: "*",
  credentials: true,
}));

const adminRouter = require("./routes/admin_router");
const utilitiesRouter = require("./routes/utilities_route");

//express serve public folder as static
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v2", adminRouter);
app.use("/api/v2", utilitiesRouter);

db.sync().then(() => {
  app.listen(3000, () => {
    console.log("Server started on port 3000");
  });
});