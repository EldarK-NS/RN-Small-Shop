const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({});


// change "_id" to "id"
orderSchema.virtual("id").get(function () {
   return this._id.toHexString();
 });
 orderSchema.set("toJSON", {
   virtuals: true,
 });
exports.Orders = mongoose.model("Orders", orderSchema);
