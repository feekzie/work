var mongoose = require('mongoose');
var User     = mongoose.model('User');
var bcrypt   = require('bcrypt-nodejs');
var jwt      = require('jsonwebtoken');

module.exports.register = function(req, res) {
   console.log('registering user');

   var username = req.body.username;
   var name = req.body.name || null;
   var password = req.body.password;

   User.create({
   	username: username,
   	name: name,
   	password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
   }, function(err, user){
   	if (err) {
   		console.log(err);
   		res.status(400).json(err);
    } else {
    	console.log('user created', user);
    	res.status(201).json(user);
    }

   });
};

module.exports.login = function(req, res) {
 console.log('logging in user');
 var username = req.body.username;
 var password = req.body.password;

 User.findOne({
 	username: username
 }).exec(function(err, user) {
 	if (err) {
 		console.log(err);
 		res.status(400).json(err);
 	} else {
 		if (bcrypt.compareSync(password, user.password)){
 			console.log('User found', user);
 			var token = jwt.sign({ username: user.username }, 's3cr3t', { expiresIn: 3600});
 		    res.status(200).json({success: true, token: token});
 		} else {
 			res.status(401).json('Unauthorized');
 		}
 		
 	}
 });
};

module.exports.authenticate = function(req, res, next) {
 var headerExists = req.headers.authorization;
 if(headerExists) {
 	var token = req.headers.authorization.split(' ')[1];
 	jwt.verify(token, 's3cr3t', function(error, decoded){
       if (error) {
       	console.log(error);
       	res.status(401).json('Unauthorized');
       } else {
       	 req.user = decoded.username;
       	 next();    
       }
 	});
 }	else {
 	res.status(403).json('No token provided');
 }
};

module.exports.techGetAll = function(req, res) {

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

  User
    .find()
    .skip(offset)
    .limit(count)
    .exec(function(err, user) {
      console.log(err);
      console.log(user);
      if (err) {
        console.log("Error finding user");
        res
          .status(500)
          .json(err);
      } else {
        console.log("Found user", user.length);
        res
          .json(user);
      }
    });

};