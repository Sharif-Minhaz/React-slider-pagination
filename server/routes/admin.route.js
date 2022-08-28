const router = require("express").Router();
const {
	adminAddCardPostController,
	adminDelCardController,
	adminLoginPostController,
	adminPutCardController,
	verifyAdmin,
} = require("../controllers/admin.controller");
const { adminValidator } = require("../validator/admin.validator");

// router.post("/auth/signup", adminSignup);
router.post("/auth/login", adminValidator, adminLoginPostController);
router.get("/auth/check", verifyAdmin);

router.post("/card/add", adminAddCardPostController);
router.delete("/card/del/:id", adminDelCardController);
router.put("/card/update/:id", adminPutCardController);

module.exports = router;
