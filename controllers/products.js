const Product = require('../models/products');

const getAllProductsStatic = async (req, res) =>{

	const products = await Product.find(req.query);
	res.status(200).json({products});

}

const getAllProducts = async (req, res) =>{

	const {featured, company} = req.query;
	const queryObj = {};

	if(featured)
		queryObj.featured = featured === 'true' ?
			true:
			false;

	if(company)
		queryObj.company = company;
			
	const products = await Product.find(queryObj);
	res.status(200).json({products});

}

module.exports = {

	getAllProductsStatic,
	getAllProducts,

};
