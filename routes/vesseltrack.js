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
router.post('/', function(req, res, next) {

    vesseltrack.addvesseltrack(req.body, function(err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(req.body); //or return count for 1 &amp;amp;amp; 0
        }
    });
});
router.delete('/:id', function(req, res, next) {

    vesseltrack.deletevesseltrack(req.params.id, function(err, count) {

        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }

    });
});
router.put('/:id', function(req, res, next) {

    vesseltrack.updatevesseltrack(req.params.id, req.body, function(err, rows) {

        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});
module.exports = router;