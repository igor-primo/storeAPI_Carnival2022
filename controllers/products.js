const getAllProductsStatic = async (req, res) =>{
	throw new Error('bla bla', 500);
	res.status(200).json({msg: 'ok'});
}

const getAllProducts = async (req, res) =>{
	res.status(200).json({msg: 'ok'});
}

module.exports = {

	getAllProductsStatic,
	getAllProducts,

};
