const express = require('express');
const router = express.Router();
const {addOrder,getOrder,getOrders,updateOrder} = require('../controllers/orderController');
const {isVerify} = require('../middleware/auth');


router.post("/",isVerify,addOrder);
router.get("/",isVerify,getOrders);
router.get("/:id",isVerify,getOrder);
router.put("/:id",isVerify,updateOrder);


module.exports = router;