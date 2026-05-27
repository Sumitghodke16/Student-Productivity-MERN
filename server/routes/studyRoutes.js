const express = require(
  "express"
);

const router =
  express.Router();

// ================= MIDDLEWARE =================

const protect = require(
  "../middleware/authMiddleware"
);

// ================= CONTROLLERS =================

const {

  addSession,

  getSessions,

  deleteSession,

  updateSession,

  getAnalytics,

} = require(
  "../controllers/studyController"
);

// =====================================================
// STUDY SESSION ROUTES
// =====================================================

// ================= ADD SESSION =================

router.post(
  "/add",
  protect,
  addSession
);

// ================= GET ALL SESSIONS =================

router.get(
  "/get",
  protect,
  getSessions
);

// ================= UPDATE SESSION =================

router.put(
  "/update/:id",
  protect,
  updateSession
);

// ================= DELETE SESSION =================

router.delete(
  "/delete/:id",
  protect,
  deleteSession
);

// ================= ANALYTICS =================

router.get(
  "/analytics",
  protect,
  getAnalytics
);

module.exports =
  router;