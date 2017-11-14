var express = require('express');
var router = express.Router();
var vesseltrack = require('../models/vesseltrack');

router.get('/:mmsi/:date?', function(req, res, next) {

    if (req.params.mmsi) {

        vesseltrack.getVesselTrackByDate(req.params.mmsi, req.params.date, function(err, rows) {

            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } else {

        vesseltrack.getAllvesseltrack(function(err, rows) {

            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }

        });
    }
});

module.exports = router;