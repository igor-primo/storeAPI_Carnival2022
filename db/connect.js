const mongoose = require('mongoose');
const connectionString = process.env.MONGODB_CERTIFICATES;


function myConnect(){

	const options = {
		useNewUrlParser: true, // i wish to use the old parser
		useCreateIndex: true, // to avoid deprecation warnings as well
		useFindAndModify: false,
		useUnifiedTopology: true,
	};

	return mongoose.connect(connectionString, options);

}

module.exports = myConnect;
