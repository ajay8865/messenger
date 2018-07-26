const responseUtils = {
	send:function(res, status, data, dataType){
		res.status(status);
		if(typeof dataType == 'string'){
			res.send(data);
		}else{
			res.json(data);
		}
	}
}

module.exports = responseUtils;