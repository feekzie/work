var mongoose = require('mongoose');
var Work = mongoose.model('Work');


module.exports.technicianGetAll = function(req, res) {
  

  var offset = 0;
  var count = 5;
  var maxCount = 50;

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  if (isNaN(offset) || isNaN(count)) {
    res
      .status(400)
      .json({
        "message" : "If supplied in querystring, count and offset must both be numbers"
      });
    return;
  }

  if (count > maxCount) {
    res
      .status(400)
      .json({
        "message" : "Count limit of " + maxCount + " exceeded"
      });
    return;
  }

  Work
    .find()
    .select('technician_username')
    .skip(offset)
    .limit(count)
    .exec(function(err, works) {
      console.log(err);
      console.log(works);
      if (err) {
        console.log("Error finding works");
        res
          .status(500)
          .json(err);
      } else {
        console.log("Found works", works.length);
        res
          .json(works);
      }
    });

};

module.exports.technicianGetOne = function(req, res) {
  var username = req.params.technicianUsername;

  console.log('GET username', username);

  Work
    .find({ technician_username : username })
    .exec(function(err, doc) {
      var response = {
        status : 200,
        message : doc
      };
      if (err) {
        console.log("Error finding username");
        response.status = 500;
        response.message = err;
      } else if(!doc) {
        console.log("username not found in database", username);
        response.status = 404;
        response.message = {
          "message" : "username not found " + username
        };
      }
      res
        .status(response.status)
        .json(response.message);
    });

};


