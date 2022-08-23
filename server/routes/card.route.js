const router = require("express").Router();
const { getAllCardController } = require("../controllers/card.controller");

router.get("/get", getAllCardController);

module.exports = router;
