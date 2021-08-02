const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GreenspaceSchema = new Schema({
  title: String,
  image: String,
  fee: Number,
  description: String,
  location: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review"
    }
  ]
});

module.exports = mongoose.model("Greenspace", GreenspaceSchema);
