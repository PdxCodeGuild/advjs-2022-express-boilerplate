const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

const connectDatabase = require("./helpers/connect-db");
const apiRoutes = require("./routes/api.routes"); // example route

dotenv.config();
const app = express();

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// routes
app.use("/api", apiRoutes); // example route

const startServer = async (port = 3000, hostname = "localhost") => {
  await connectDatabase("database-name"); // Change database name

  app.listen(port, hostname, () => {
    console.log(`🚀 Listening at ${hostname}:${port}...`);
  });
};

startServer();
