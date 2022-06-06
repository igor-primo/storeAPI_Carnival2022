
/*
 * Base path:
 * /api/v1
 */

const Product = require('../models/products');

const getAllProductsStatic = async (req, res) =>{

	/*
	 * This function will
	 * fetch all product names and prices
	 * available in store and will
	 * sort by price.
	 * It requires no parameters,
	 * no query parameters or body.
	 *
	 * Path: /products/static
	 *
	 */

	const products = await Product.find({price: {$gt: 30}})
		.sort('price').select('name price');

	res.status(200).json({products, nbHits: products.length});

}

const getAllProducts = async (req, res) =>{

	/*
	 *	This function will fetch all available products
	 *	in store, but will allow several query options to
	 *	determine the format or which hits to return.
	 *	
	 *	The 'featured=' query option will return all
	 *	featured store items, if true, all unfeatured
	 *	items if false.
	 *
	 *	The 'company=' option will restrict the fetch
	 *	to all items which have this company in store.
	 *
	 *	The 'name=' option will restrict the fetch to
	 *	all items which have the name string in it name.
	 *
	 *	The 'sort=' option specifies whether the fetch is
	 *	to be sorted or not. Can be true or false.
	 *
	 *	The 'fields=' option specifies which fields
	 *	of the JSON are desired besides the id field.
	 *
	 *	The 'limit=' option will set its value as
	 *	the upper limit of hits, that is,
	 *	the number of products will be at most the
	 *	value of limit.
	 *
	 *	The 'numericFilters=' option will fetch results
	 *	based on the numeric boolean expression give.
	 *
	 *	The 'page=' option implements a pagination functionality.
	 *
	 *	The returning JSON will be of the form
	 *	{
	 *		products:[]
	 *	}
	 *
	 *	Examples to try:
	 *	1. /products?sort=-name,price
	 *	2. /products?sort=-name,-price
	 *	3. /products?sort=price,name
	 *
	 *	In 1. we will receive the list sorted in descending order
	 *	by name first and then in ascending order by price.
	 *	In 2. we will receive the list sorted in descending order
	 *	by name first and the in descending order by price.
	 *	In 3. we will receive the list sorted in ascending order
	 *	by price and then ascending order by name.
	 *
	 *	4. /products?field=name,price
	 *	5. /products?field=name,sort=name
	 *
	 *	In 4. we will receive the list containing the id,
	 *	the name and the price of the items.
	 *	In 5. we will receive the list contianing the id,
	 *	the name and the list will be sorted in ascending order
	 *	by name.
	 *
	 *	6. /products?field=name&limit=2
	 *	7. /products?numericFilters=price>30&sort=price
	 *
	 *	In 6. we will receive a list with only the ids and names
	 *	but the number of hits will be limited to 2 at maximum.
	 *	In 7. we will receive a list with all products of
	 *	price greater than 30 and the list will be sorted
	 *	by price.
	 */

	const {
		featured, 
		company,
		name,
		sort,
		fields,
		numericFilters
	} = req.query;

	const queryObj = {};

	if(featured)
		queryObj.featured = featured === 'true' ?
			true:
			false;

	if(company)
		queryObj.company = company;

	if(name)
		queryObj.name = {
			$regex: name,
			$options: 'i'
		};

	if(numericFilters){
		/*
		 * We need to comply with
		 * the operators indicated
		 * in mongoDB documentation,
		 * so we make a map to
		 * map human readable operators
		 * to the documented ones.
		 */
		const operatorMap = {
			'>': '$gt',
			'.=': '$gte',
			'=': '$eq',
			'<': '$lt',
			'<=': '$lte'
		};

		/* replace the filters with 
		 * the mongoDB operators */
		const regEx = /\b(<|>|>=|=|<|<=)\b/g;
		let filters = numericFilters.replace(
			regEx,
			match => `-${operatorMap[match]}-`
		);

		/* apply the conditions to object query */
		const options = ['price', 'rating'];
		filters = filters.split(',').forEach(item => {
			const [field, operator, value] = item.split('-');
			if(options.includes(field))
				queryObj[field] = {[operator]: Number(value)};
		});
	}

	let result = Product.find(queryObj);

	if(sort){
		const sortList = sort.split(',').join(' ');
		result = result.sort(sortList);
	} else 
		result = result.sort('createdAt');

	if(fields){
		const fieldList = fields.split(',').join(' ');
		result = result.select(fieldList);
	}

	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const skip = (page - 1)* limit;
			
	result = result.skip(skip).limit(limit);

	const products = await result;
	res.status(200).json({products, nbHits: products.length});

}

module.exports = {

	getAllProductsStatic,
	getAllProducts,

};
