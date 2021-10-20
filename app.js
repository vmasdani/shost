const express = require("express");
const locator = require("./apps/locator");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const main = async () => {
  const router = express.Router();
  router.use("/locator", locator);
  app.use("/master", router);
  app.listen(process.env.PORT ?? 3000);
};

main();
