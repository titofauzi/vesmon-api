var express = require('express');
var router = express.Router();
var PortGeofence = require('../models/port_geofence');
var auth = require('../models/users');

router.get('/:port_code?', auth.authenticate('basic', { session: false }), function(req, res, next) {

    if (req.params.port_code) {

        PortGeofence.getAllPortGeofenceByPortCode(req.params.port_code, function(err, rows) {

            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } 
});
router.post('/', function(req, res, next) {

    PortGeofence.addPortGeofence(req.body, function(err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(req.body); //or return count for 1 &amp;amp;amp; 0
        }
    });
});
router.delete('/:id', function(req, res, next) {

    PortGeofence.deletePortGeofence(req.params.id, function(err, count) {

        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }

    });
});
router.put('/:id', function(req, res, next) {

    PortGeofence.updatePortGeofence(req.params.id, req.body, function(err, rows) {

        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});
module.exports = router;