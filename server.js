const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: `${__dirname}/config.env` });

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("The database connected successfully."))
  .catch((err) => console.log("error connecting to db.", err));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`the server is runnug on port ${port}.`);
});
