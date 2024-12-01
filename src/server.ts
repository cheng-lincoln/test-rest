import { app } from "./app";
import * as _ from "lodash";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const port = parseInt(_.defaultTo(process.env.LISTEN_PORT, "3000"));

const host = _.defaultTo(process.env.LISTEN_HOST, "localhost");

app.listen(
  port,
  host,
  () => console.log(`Listening on http://${host}:${port}`)
);
