const express = require("express");
const server = express();

const cors = require("cors");
server.use(cors());

const morgan = require("morgan");
server.use(morgan("dev"));

server.use(express.json());

const path = require("path");
server.use(express.static(path.join(__dirname, "build")));

server.use("/api", require("./routes"));

server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const dotenv = require("dotenv");
dotenv.config();

const client = require("./db/client");

server.use((err, req, res, next) => {
  res.status(500).send(err);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  console.log(`Server is running on ${PORT}!`);

  try {
    await client.connect();
    console.log("Database is open for business!");
  } catch (error) {
    console.error("Database is closed for repairs!\n", error);
  }
});
