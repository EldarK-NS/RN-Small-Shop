const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
require("dotenv/config");

app.use(cors);
app.options("*", cors());

const api = process.env.API_URL;
const uri = process.env.MONGO_URI;

//middlewares
app.use(bodyParser.json());
app.use(morgan("tiny"));

//routers
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders.js");
const categoriesRoutes = require("./routes/categories");

app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connection to mongo");
});
mongoose.connection.on("error", (err) => {
  console.log("Error connection to mongo", err);
});

app.listen(3000, () => {
  console.log(api);
  console.log("Server is started on 3000");
});
