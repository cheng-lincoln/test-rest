import { app } from "./app";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const port = process.env.PORT || 8080;

app.listen(
  port,
  () => console.log(`Listening on http://localhost:${port}`)
);
