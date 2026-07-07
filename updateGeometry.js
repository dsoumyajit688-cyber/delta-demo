require("dotenv").config();

const mongoose = require("mongoose");
const Listing = require("./models/listing");
const getGeometry = require("./utils/geocode");

async function updateGeometry() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
        console.log("MongoDB Connected");

        const listings = await Listing.find({
            "geometry.coordinates": [0, 0],
        });

        if (listings.length === 0) {
            console.log("All listings already have valid coordinates.");
            return;
        }

        for (const listing of listings) {
            try {
                const geometry = await getGeometry(listing.location);

                listing.geometry = geometry;
                await listing.save();

                console.log(`Updated: ${listing.title}`);
            } catch (err) {
                console.log(`Error updating "${listing.title}": ${err.message}`);
            }
        }

        console.log("Geometry update completed!");

    } catch (err) {
        console.log("Database Error:", err.message);
    } finally {
        await mongoose.connection.close();
        console.log("MongoDB Connection Closed");
    }
}

updateGeometry();
