const axios = require("axios");

module.exports = async (location) => {
    try {
        const response = await axios.get(
            "https://api.opencagedata.com/geocode/v1/json",
            {
                params: {
                    q: location,
                    key: process.env.OPENCAGE_API_KEY,
                    limit: 1,
                },
            }
        );

        if (response.data.results.length > 0) {
            return {
                type: "Point",
                coordinates: [
                    response.data.results[0].geometry.lng,
                    response.data.results[0].geometry.lat,
                ],
            };
        }

        return {
            type: "Point",
            coordinates: [0, 0],
        };

    } catch (err) {
        console.log("Geocoding Error:", err.message);

        return {
            type: "Point",
            coordinates: [0, 0],
        };
    }
};
