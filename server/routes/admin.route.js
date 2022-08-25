const router = require("express").Router();
const {
	adminAddCardPostController,
	adminDelCardController,
	adminLoginPostController,
	adminPutCardController,
	verifyAdmin,
} = require("../controllers/admin.controller");

// router.post("/auth/signup", adminSignup);
router.post("/auth/login", adminLoginPostController);
router.get("/auth/check", verifyAdmin);

router.post("/card/add", adminAddCardPostController);
router.delete("/card/del/:id", adminDelCardController);
router.put("/card/update/:id", adminPutCardController);

module.exports = router;
