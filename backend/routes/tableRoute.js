const express = require('express');
const router = express.Router();
const {addTable,getTables,updateTable} = require('../controllers/tableController');
const {isVerify} = require('../middleware/auth');

router.post("/",isVerify,addTable);
router.post("/",isVerify,getTables);
router.put("/:id",isVerify,updateTable);

module.exports = router;