document.addEventListener("DOMContentLoaded", () => {
    console.log("Listing data:", window.listingData);

    const listingData = window.listingData;

    if (!listingData?.geometry?.coordinates) {
        console.log("Geometry not found");
        return;
    }

    const [lng, lat] = listingData.geometry.coordinates;

    const map = L.map("map").setView([lat, lng], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([lat, lng]).addTo(map);
});
