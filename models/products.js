const mongoose = require('mongoose');

// Specifies the schema of the objects we are dealing with.
// Since each object in the DB will be a JSON, of course,
// the fields are not necessary.

const productSchema = new mongoose.Schema({

	name: {
		type: String,
		required: [true, 'product name must be provided']
		
	},

	price: {

		type: Number,
		required: [true, 'product price must be provided']

	},

	featured: {

		type: Boolean,
		default: false

	},

	rating: {

		type: Number,
		default: 4.5,
	
	},

	createdAt: {

		type: Date,
		default: Date.now()

	},

	company: {

		type: String,
		enum: {
			
			values: ['ikea', 'liddy', 'caressa', 'marcos'],
			message: '{VALUE} is not supported',

		}

	},

});

module.exports = mongoose.model('Product', productSchema);
