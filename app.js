require('express-async-errors'); //better than wrapper

const express = require('express');
const app = express();

const errorMiddleware = require('./middleware/error');
const myConnect = require('./db/connect');
const productsRouter = require('./routes/products');

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//routes

app.get('/', (req, res) => {

	res.send('<h1>Store API</h1><a href="api/v1/products"> products route</a>');

});

app.use('/api/v1/products', productsRouter);

//products

app.use(errorMiddleware);

const port = process.env.PORT || 5000;

async function start(){

	try{

		await myConnect();
		app.listen(port, console.log(`listening on ${port}`));

	}catch (err){

		console.log(err);

	}

}

start();
