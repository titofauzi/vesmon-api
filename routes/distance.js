var express = require('express');
var router = express.Router();
var Distance = require('../models/distance');
var auth = require('../models/users');
var geolib = require('geolib');

router.get('/:mmsi/:startdate/:enddate?', auth.authenticate('basic', { session: false }), function(req, res, next) {

    if (req.params.startdate && req.params.mmsi) {

        Distance.getVesselTrack(req.params.mmsi, req.params.startdate, req.params.enddate, function(err, rows) {

            if (err) {
                res.json(err);
            } else {

                /*for (var i = rows.length - 1; i >= 0; i--) {
                    console.log(rows[i]['lon']);
                }*/

                var dist = geolib.getPathLength(rows) * 0.000539957 ; // -> 945235
                var obj = [{mmsi: req.params.mmsi, 
                            startdate: req.params.startdate, 
                            enddate: req.params.enddate,
                            gps_count: rows.length, 
                            distance : dist,
                            unit : 'nm'}];
                res.json(obj);
            }
        });
    }
});

module.exports = router;