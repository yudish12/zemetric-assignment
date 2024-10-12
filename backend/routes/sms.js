const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  sendSms,
  getSmsStats,
  getRateLimitViolations,
  getSmsLogs,
} = require("../controllers/sms");
const rateLimitter = require("../middlewares/rateLimitter");
const router = express.Router();

router.post("/public", rateLimitter, sendSms);

router.use(authMiddleware);

router.get("/stats", getSmsStats);
router.get("/violations", getRateLimitViolations);
router.get("/logs", getSmsLogs);

module.exports = router;
