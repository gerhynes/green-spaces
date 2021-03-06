const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });
const Greenspace = require("../models/greenspace");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

// Connect to database
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("DB Connection Open");
  })
  .catch((err) => {
    console.error(err);
  });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Greenspace.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const greenspace = new Greenspace({
      author: "611396aa19e6c10c73234784",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      geometry: {
        type: "Point",
        coordinates: [cities[random1000].longitude, cities[random1000].latitude]
      },
      images: [
        {
          url: "https://res.cloudinary.com/gerhynes/image/upload/v1629318140/greenspaces/jcb3yt7zmnlv5apma3qe.jpg",
          filename: "greenspaces/jcb3yt7zmnlv5apma3qe"
        },
        {
          url: "https://res.cloudinary.com/gerhynes/image/upload/v1629318140/greenspaces/ksiequnfatrfczknnyrk.jpg",
          filename: "greenspaces/ksiequnfatrfczknnyrk"
        }
      ],
      fee: 0,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!"
    });
    await greenspace.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
