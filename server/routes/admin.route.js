const router = require("express").Router();
const {
	adminAddCardPostController,
	adminDelCardController,
	adminLoginPostController,
	adminPutCardController,
} = require("../controllers/admin.controller");

router.post("/auth/login", adminLoginPostController);
// router.post("/auth/signup", adminSignup);

router.post("/card/add", adminAddCardPostController);
router.delete("/card/del/:id", adminDelCardController);
router.put("/card/update/:id", adminPutCardController);

module.exports = router;
