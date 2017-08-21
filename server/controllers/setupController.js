var AdvertisementGen = require('../crud/Advertisement');

console.log('I am in setup Advertisement');
module.exports = function(app) {

	app.post('api/setupAdvertisement', function(req,res){
		console.log('Trying to post the adverstisement');
		var starterAdvertisement = [
		{ 
			companyId: 'Company1',
			jobTitle: 'Accountant',
			location: 'Melbourne',
			shortDescription:'Do Accounting',
			longDescription:'Do accounting with Peoplesoft',
			keywords: ['accounting', 'PeopleSoft'], 
			responsibilities: ['pay employees'],
			requirements: ['BS accounting']
		},
		{ 
			companyId: 'Company1',
			jobTitle: 'Software Engineer',
			location: 'Melbourne',
			shortDescription:'Web Development',
			longDescription:'Do accounting with Peoplesoft',
			keywords: ['react', 'nodejs'], 
			responsibilities: ['build software'],
			requirements: ['proficient in JavaScript']
		},
		{ 
			companyId: 'Company2',
			jobTitle: 'Accountant',
			location: 'Sydney',
			shortDescription:'Do Accounting',
			longDescription:'Do accounting with Peoplesoft',
			keywords: ['reporting'], 
			responsibilities: ['reporting'],
			requirements: ['B.S. Acounting']
		},
		{ 
			companyId: 'Company2',
			jobTitle: 'Accountant',
			location: 'Melbourne',
			shortDescription:'Do Accounting',
			longDescription:'Do accounting with Peoplesoft',
			keywords: ['payables'], 
			responsibilities: ['Pay Vendors'],
			requirements: ['Accounting experience']
		}] ;

		//AdvertisementGen.create(starterAdvertisementGen, function(err, results) {
		//	res.send(results);
		//});

	});
}