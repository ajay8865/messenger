var constants = {
	mysql:{
		host:'localhost',
		user:'root',
		password:'password',
		db:'messenger'
	},
	error:{
		ERR_9001:{
			error_code: 9001,
			error_message: 'Invalid id'
		},
		ERR_9002:{
			error_code: 9002,
			error_message: 'Invalid payload'
		},
		ERR_9003:{
			error_code: 9003,
			error_message: 'Missing required parameter in profile'
		},
		ERR_8001:{
			error_code: 8001,
			error_message:'Error while connecting to mysql'
		}
	}
	
};

module.exports = constants;
