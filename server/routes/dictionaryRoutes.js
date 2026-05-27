const express = require("express");

const router = express.Router();

const protect =
require("../middleware/authMiddleware");

const {

  saveWord,

  getWords,

  deleteWord,

} = require(
  "../controllers/dictionaryController"
);

// ================= SAVE WORD =================

router.post(
  "/save",
  protect,
  saveWord
);

// ================= GET WORDS =================

router.get(
  "/get",
  protect,
  getWords
);

// ================= DELETE WORD =================

router.delete(
  "/delete/:id",
  protect,
  deleteWord
);

module.exports = router;