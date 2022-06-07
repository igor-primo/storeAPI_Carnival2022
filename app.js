require('express-async-errors'); //better than wrapper

// Imports the express lib
const express = require('express');
// This is a middleware to handle errors thrown by other middlewares
const errorMiddleware = require('./middleware/error');
// A function to connect to DB before the app initializes
const myConnect = require('./db/connect');
// Object collection of functions implementing our logic
const productsRouter = require('./routes/products');

// Initialize the express app
const app = express();

// Use the JSON parser from express
app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {

	res.send('<h1>Store API</h1><a href="api/v1/products"> products route</a>');

});

app.use('/api/v1/products', productsRouter);
app.use(errorMiddleware);

const port = process.env.PORT || 5000;

async function start(){

	try{
		// Try to connect to DB before initializing the app
		await myConnect();
		app.listen(port, console.log(`listening on ${port}`));

	}catch (err){

		console.log(err);

	}

}

start();
