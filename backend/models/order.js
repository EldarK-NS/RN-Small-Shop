const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({});
exports.Orders = mongoose.model("Orders", orderSchema);
