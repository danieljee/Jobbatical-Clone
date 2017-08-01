var axios = require('axios');

module.exports = {
	get: function(url, params, callback){
		axios.get(url, {params:params})
		.then(function(result){
			callback(null, result);
		})
		.catch(function(err){
			callback(err, null);
		})
	},
	
	post: function(url, params, callback){
		axios.post(url, params)
		.then(function(result){
			if (result.data.confirmation == "fail"){
				callback(result.data.message)
				return
			}
			callback(null, result.data.result);
		})
		.catch(function(err){
			console.log(err);
			callback(err, null);
		})
	}
}