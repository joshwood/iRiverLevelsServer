'use strict';

/*
 * get the controllers to handle route requests
 */
var iRiverController = require('../controllers/iRiverController');

module.exports = function(app) {

	/**
	 * route for looking up available river gages by state id
	 */
    app.get('/iRiverLevels/rivers/:stateId', iRiverController.riversByState);

    /**
     * route for looking up river levels by gage
     */
    app.get('/iRiverLevels/gages/:gageId', iRiverController.gageById);

};