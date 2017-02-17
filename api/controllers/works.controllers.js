var mongoose = require('mongoose');
var Work = mongoose.model('Work');




  

module.exports.worksGetAll = function(req, res) {

  console.log('Requested by: ' + req.user);
  console.log('GET the submitted work');
  console.log(req.query);

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

module.exports.worksGetOne = function(req, res) {
  var id = req.params.workId;

  console.log('GET workId', id);

  Work
    .findById(id)
    .exec(function(err, doc) {
      var response = {
        status : 200,
        message : doc
      };
      if (err) {
        console.log("Error finding work");
        response.status = 500;
        response.message = err;
      } else if(!doc) {
        console.log("workId not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "work ID not found " + id
        };
      }
      res
        .status(response.status)
        .json(response.message);
    });

};

module.exports.worksAddOne = function(req, res) {
  console.log("POST new work");

  Work
    .create({
      name : req.body.name,
      address : req.body.address,
      fault : req.body.fault,
      phone : req.body.phone,
      email : req.body.email,
      technician : req.body.technician,
      submitted : req.body.submitted,
      progress : req.body.progress,
      completed : req.body.completed

    }, function(err, work) {
      if (err) {
        console.log("Error creating work");
        res
          .status(400)
          .json(err);
      } else {
        console.log("Information created!", work);
        res
          .status(201)
          .json(work);
      }
    });

};



module.exports.worksUpdateOne = function(req, res) {
  var workId = req.params.workId;

  console.log('GET workId', workId);

  Work
    .findById(workId)
    .exec(function(err, work) {
      if (err) {
        console.log("Error finding work");
        console.log(work);
        res
          .status(500)
          .json(err);
          return;
      } else if(!work) {
        console.log("workId not found in database", workId);
        res
          .status(404)
          .lson({
            "message" : "Work ID not found " + workId
          });
          return;
      }

      work.name = req.body.name;
      work.address = req.body.address;
      work.fault = req.body.fault;
      work.phone = req.body.phone;
      work.technician = req.body.technician;
      work.email = req.body.email;
      work.submitted = req.body.submitted;
      work.progress = req.body.progress;
      work.completed = req.body.completed;

      work
        .save(function(err, workUpdated) {
          if(err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json({ message: 'updated!' });
          }
        });


    });

};


