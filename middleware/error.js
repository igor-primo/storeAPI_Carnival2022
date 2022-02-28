const {CustomError} = require('../errors/custom');

/*
 * custom errors are for those
 * that do not relate to some sort of crash
 * but to the logic of the application
 */

function errorHandler(err, req, res, next){

	if(err instanceof CustomError)
		return res.status(err.statusCode)
				.json({msg: err.message});

	return res.status(500).json({msg: err.message});

}

module.exports = errorHandler;
