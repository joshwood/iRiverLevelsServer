'use strict';

var request = require('request');
var parseString = require('xml2js').parseString;


/**
 * controlls lookup of available river gages by state
 */
exports.riversByState = function(req, res){
	var stateId = req.params.stateId;
	request({
				url: 'http://www.darrenchaney.com/'+stateId+'data.xml'
			}, 
			function (error, response, body) {
				if (!error && response.statusCode == 200) {
					parseString(body, function(err, result){
						res.jsonp(result);
					});
				} else{
					console.log('error '+(error || response.statusCode));
					res.jsonp('error');
				}
			}
	);
};

/**
 * controlls lookup of river levels by gage id
 */
exports.gageById = function (req, res){
	var gageId = req.params.gageId;
	request({
				url: 'http://water.weather.gov/ahps2/hydrograph_to_xml.php?output=xml&gage='+gageId
			}, 
			function (error, response, body) {
				if (!error && response.statusCode == 200) {
					parseString(body, function(err, result){
						res.jsonp(result);
					});
				} else{
					console.log('error '+(error || response.statusCode));
					res.jsonp('error');
				}
			}
	);
};