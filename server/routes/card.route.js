const router = require("express").Router();
const { addCardPostController, getAllCardController } = require("../controllers/card.controller");

router.post("/add", addCardPostController);

router.get("/get", getAllCardController);

module.exports = router;
