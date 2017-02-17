var mongoose = require('mongoose');
var Work = mongoose.model('Work');

module.exports.statusGetAll = function(req, res) {


  var mail = req.query.email;

  console.log('GET email', mail);

  Work
    .find({ email : mail })
    .exec(function(err, doc) {
      var response = {
        status : 200,
        message : doc
      };
      if (err) {
        console.log("Error finding email");
        response.status = 500;
        response.message = err;
      } else if(!doc) {
        console.log("email not found in database", mail);
        response.status = 404;
        response.message = {
          "message" : "email not found " + mail
        };
      }
      res
        .status(response.status)
        .json(response.message);
    });

};