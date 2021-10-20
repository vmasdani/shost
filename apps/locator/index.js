const express = require("express");
const dotenv = require("dotenv");
const { EntitySchema, createConnection } = require("typeorm");

dotenv.config();

const app = express();

const Location = new EntitySchema(
  (module.exports = {
    name: "Location",
    columns: {
      id: {
        primary: true,
        type: "int",
        generated: true,
        nullable: true,
      },
      lat: {
        type: "double",
        nullable: true,
      },
      lon: {
        type: "double",
        nullable: true,
      },
      deviceUniqueId: {
        type: "text",
        nullable: true,
      },
    },
  })
);

const main = async () => {
  const conn = await createConnection({
    type: "mysql",
    host: process.env.LOCATOR_DB_HOST ?? "host",
    port: 3306,
    username: process.env.LOCATOR_DB_USERNAME ?? "uname",
    password: process.env.LOCATOR_DB_PASSWORD ?? "pwd",
    database: process.env.LOCATOR_DB_NAME ?? "db",
    synchronize: true,
    entities: [Location],
  });

  const locationRepository = conn.getRepository("Location");

  app.use(express.json());

  app.get("/", async (req, res) => {
    res.json(await locationRepository.find());
  });

  app.post("/test-save", async (req, res) => {
    res.json(
      await locationRepository.save({
        lat: -6.7382,
        lon: 106.2738,
        deviceUniqueId: "testdeviceid",
      })
    );
  });

  app.post("/", async (req, res) => {
    res.json(await locationRepository.save(req.body));
  });
};

main();

module.exports = app;
