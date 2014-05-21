'use strict';

var request = require('request');
var parseString = require('xml2js').parseString;
var util = require('util');

var stateDataURL = 'http://www.darrenchaney.com/%sdata.xml';
var gageDataURL = 'http://water.weather.gov/ahps2/hydrograph_to_xml.php?output=xml&gage=%s';

var _proxy;

/**
 * initializes the module - currently just a proxy
 */
exports.init = function(proxy){
	_proxy = proxy;
}

/**
 * controlls lookup of available river gages by state
 */
exports.riversByState = function(req, res){
	var stateId = req.params.stateId;
	// make the request to get the rivers in a state
	request(stateRequest(stateId), 
			function (error, response, body) {
				if (!error && response.statusCode == 200) {
					// if we got a response we convert the response to json
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
	// make
	request(gageRequest(gageId), 
			function (error, response, body) {
				if (!error && response.statusCode == 200) {
					// if we got a response we convert the response to json
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
 * helper method to format our request based on state param and the presense of
 * a proxy var
 */
function stateRequest(stateId){
	var req = {
		url: util.format(stateDataURL, stateId)
	};
	if(_proxy) req.proxy = _proxy;
	return req;
}

/**
 * helper method to format our request based on gage param and the presense of
 * a proxy var
 */
function gageRequest(gageId){
	var req = {
		url: util.format(gageDataURL, gageId)
	};
	if(_proxy) req.proxy = _proxy;
	return req;
}