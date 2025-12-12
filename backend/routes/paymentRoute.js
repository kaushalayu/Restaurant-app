const express = require("express");
const router = express.Router();
const { isVerify } = require("../middleware/auth");
const { createOrder, verifyPayment, webHookVerification } = require("../controllers/paymentController");
 
router.route("/create-order").post(isVerify , createOrder);
router.route("/verify-payment").post(isVerify , verifyPayment);
router.route("/webhook-verification").post(webHookVerification);


module.exports = router;