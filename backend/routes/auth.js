const router = require("express").Router();
require("dotenv").config()
const passport = require("passport");
router.get("/login/success", (req, res) => {
	console.log("user", req);
	if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: process.env.CLIENT_URL,
		failureRedirect: "/login/failed",
	})
);

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect(process.env.CLIENT_URL);
});
// Endpoint to return the access token
router.get("/getAccessToken", (req, res) => {
    if (req.user && req.user.accessToken) {
        res.json({ access_token: req.user.accessToken });
    } else {
        res.status(401).json({ message: "Access token not found" });
    }
});

module.exports = router;