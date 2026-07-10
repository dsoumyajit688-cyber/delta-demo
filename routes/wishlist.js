const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Listing = require("../models/listing");

const { isLoggedIn } = require("../middleware");

// Add Wishlist
router.post("/:id", isLoggedIn, async (req, res) => {
    const listingId = req.params.id;
    const user = await User.findById(req.user._id);
    if (!user.wishlist) {
        user.wishlist = [];
    }
    const alreadyExists = user.wishlist.some(
        id => id.toString() === listingId
    );
    if (alreadyExists) {
        req.flash("error", "Listing is already in your Wishlist!");
        return res.redirect(`/listings/${listingId}`);
    }
    user.wishlist.push(listingId);
    await user.save();
    req.flash("success", "Added to Wishlist!");
    res.redirect(`/listings/${listingId}`);
});

// Show Wishlist
router.get("/", isLoggedIn, async (req, res) => {
    let user = await User.findById(req.user._id)
        .populate("wishlist");

    res.render("listings/wishlist", {
        listings: user.wishlist
    });
});

// Remove from Wishlist
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
