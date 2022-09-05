var mongodb = require('mongodb');

var connected = false;
var db = null;

/*	Use connect() of MongoClient class to connect to DB
	connect() returns a promise
*/
mongodb.MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true}).then(connection => {
		connected = true;
		// assign all collections of db market to global variable db
		db = connection.db('market') 
		console.log('DB connection successful');
	}).catch(error => {
		console.log('Error in connecting to DB');
	});

// To be called in deals.js
async function queryDealsCollection() {
	if (connected) {
		// Get data from db
		let jsonResponse = {
			"handsetCards": [],
			"webCards": []
		};

		/* find() without any args returns all content of a collections; 
		find() asynchonously fetches data from db, so need to use await keyword to wait for result and make function async
		Result is a cursor, so use toArray() to convert to an array */
		const dealsCollectionArray = await db.collection('DEALS').find().toArray();

		dealsCollectionArray.forEach(element => {
			let handsetElement = {}
			handsetElement['imageName'] = element['imageName'];
			handsetElement['title'] = element['title'];
			handsetElement['rows'] = element['handsetRows'];
			handsetElement['cols'] = element['handsetCols'];
			jsonResponse.handsetCards.push(handsetElement);

			let webElement = {}
			webElement['imageName'] = element['imageName'];
			webElement['title'] = element['title'];
			webElement['rows'] = element['webRows'];
			webElement['cols'] = element['webCols'];
			jsonResponse.webCards.push(webElement);
		});
		
		return jsonResponse;

	} else {
		return null;
	}

}

module.exports = { queryDealsCollection };