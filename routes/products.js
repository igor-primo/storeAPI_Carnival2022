const express = require('express');
const router = express.Router();

const {

	getAllProducts,
	getAllProductsStatic,

} = require('../controllers/products');

// The documentation referring to what is expected and returned
// by accessing theses URIs are contained in the files in
// ../controllers/* directory

router.route('/').get(getAllProducts);
router.route('/static').get(getAllProductsStatic);

module.exports = router;
