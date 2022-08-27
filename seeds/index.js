if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // MY USER ID
            author: 
            // '62cd799d0e96f1e1eabe461f',
            '62e586cc678d7071f2c966e5',
            location: `${cities[random1000].city}, ${cities[random1000].province}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae nisi delectus accusantium magnam voluptatibus illo, quam hic dicta mollitia ipsam inventore tenetur asperiores molestiae qui quaerat dolor aut quidem esse Cupiditate, nostrum, ab quaerat nam ipsa quo repellat quod delectus, quisquam velit officia voluptatum obcaecati dicta molestias ut culpa vero ex? Sunt repellendus quia fuga aspernatur veniam harum officia dolores? Atque autem alias eos natus distinctio veniam ipsa beatae! Culpa amet sunt debitis, officia voluptate consequatur vero quis dignissimos.Ipsa vitae velit rem alias dolorem, placeat quo odit fugiat enim!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            image: [
                {
                    url: 'https://res.cloudinary.com/dz0twneew/image/upload/v1658408714/YelpCamp/flgns33zry1ydbdhgemu.jpg',
                    filename: 'YelpCamp/flgns33zry1ydbdhgemu',
                },
                {
                    url: 'https://res.cloudinary.com/dz0twneew/image/upload/v1658408714/YelpCamp/y8kxtnvnslqxjstutlee.jpg',
                    filename: 'YelpCamp/y8kxtnvnslqxjstutlee',
                },
                {
                    url: 'https://res.cloudinary.com/dz0twneew/image/upload/v1658975986/YelpCamp/camping11_km4xzh.jpg',
                    filename: 'YelpCamp/camping11_km4xzh',
                },
                {
                    url: 'https://res.cloudinary.com/dz0twneew/image/upload/v1658975986/YelpCamp/camping12_jquhar.jpg',
                    filename: 'YelpCamp/camping12_jquhar',
                },
                {
                    url: 'https://res.cloudinary.com/dz0twneew/image/upload/v1658975984/YelpCamp/camping8_hvkccp.jpg',
                    filename: 'YelpCamp/camping8_hvkccp',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})