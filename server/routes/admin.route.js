const router = require("express").Router();
const {
	adminAddCardPostController,
	adminDelCardController,
	adminLoginPostController,
	adminPutCardController,
	verifyAdmin,adminLogoutGetController
} = require("../controllers/admin.controller");
const { adminValidator } = require("../validator/admin.validator");
const { cardValidator } = require("../validator/card.validator");

// router.post("/auth/signup", adminSignup);
router.post("/auth/login", adminValidator, adminLoginPostController);
router.get("/auth/check", verifyAdmin);
router.get("/auth/logout", adminLogoutGetController);

router.post("/card/add", cardValidator, adminAddCardPostController);
router.delete("/card/del/:id", adminDelCardController);
router.put("/card/update/:id", cardValidator, adminPutCardController);

module.exports = router;
