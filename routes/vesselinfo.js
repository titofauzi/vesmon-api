var express = require('express');
var router = express.Router();
var Vesselinfo = require('../models/vesselinfo');
var auth = require('../models/users');

router.get('/:date/:mmsi?', auth.authenticate('basic', { session: false }), function(req, res, next) {

    if (req.params.date && req.params.mmsi) {

        Vesselinfo.getAllVesselinfoByTimeAndMMSI(req.params.date, req.params.mmsi, function(err, rows) {

            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } else if (req.params.date) {
        Vesselinfo.getAllVesselinfoByTime(req.params.date, function(err, rows) {

            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }

        });
    }
});
router.post('/', function(req, res, next) {

    Vesselinfo.addVesselinfo(req.body, function(err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(req.body); //or return count for 1 &amp;amp;amp; 0
        }
    });
});
router.delete('/:id', function(req, res, next) {

    Vesselinfo.deleteVesselinfo(req.params.id, function(err, count) {

        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }

    });
});
router.put('/:id', function(req, res, next) {

    Vesselinfo.updateVesselinfo(req.params.id, req.body, function(err, rows) {

        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});
module.exports = router;