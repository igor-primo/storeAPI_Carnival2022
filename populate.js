const connectDB = require('./db/connect');
const Product = require('./models/products');

const jsonProducts = require('./products.json');

const start = async _ => {

	try{

		await connectDB();
		await Product.deleteMany();
		await Product.create(jsonProducts);
		console.log('sucess');
		process.exit(0);

	} catch(err){

		console.log(err);

	}

}

start();
