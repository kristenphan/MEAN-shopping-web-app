var express = require('express');
var router = express.Router();
var dbAbstractionLayer = require('../public/javascripts/dbAbstractionLayer');

/* GET card details */
router.get('/', function(req, res, next) {
	// Fetch data from mongodb and return a json object to angular UI
	dbAbstractionLayer.queryDealsCollection().then(response => {
			res.json(response);
		}).catch(error => { // return empty json object with http code 500
			res.json.status(500).json({});
		});

});

module.exports = router;
