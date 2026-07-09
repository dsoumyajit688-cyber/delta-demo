const express = require("express");
const router = express.Router();

const User = require("../models/user");
const Listing = require("../models/listing");

const { isLoggedIn } = require("../middleware");

// Add Wishlist
router.post("/:id", isLoggedIn, async (req, res) => {

    let listingId = req.params.id;

    let user = await User.findById(req.user._id);

    if (!user.wishlist) {
        user.wishlist = [];
    }

    if (!user.wishlist.some(id => id.toString() === listingId)) {
        user.wishlist.push(listingId);
        await user.save();
    }
    req.flash("success", "Added to Wishlist!");

    res.redirect(`/listings/${listingId}`);
});
router.get("/", isLoggedIn, async (req, res) => {

    let user = await User.findById(req.user._id)
        .populate("wishlist");

    res.render("listings/wishlist", {
        listings: user.wishlist
    });

});
router.delete("/:id", isLoggedIn, async (req, res) => {

    await User.findByIdAndUpdate(req.user._id, {
        $pull: {
            wishlist: req.params.id
        }
    });

    req.flash("success", "Removed from Wishlist");

    res.redirect("/wishlist");

});

module.exports = router;
