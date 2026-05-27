const express =
require("express");

const router =
express.Router();

const protect =
require("../middleware/authMiddleware");

const {

  addNote,

  getNotes,

  deleteNote,

} = require(
  "../controllers/notesController"
);

// ================= ROUTES =================

router.post(
  "/add",
  protect,
  addNote
);

router.get(
  "/get",
  protect,
  getNotes
);

router.delete(
  "/delete/:id",
  protect,
  deleteNote
);

module.exports =
router;