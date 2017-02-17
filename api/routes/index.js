var express = require('express');
var router = express.Router();

var ctrlWorks = require('../controllers/works.controllers.js');
var ctrlUsers = require('../controllers/users.controllers.js');
var ctrlTechnicians = require('../controllers/technicians.controllers.js');
var ctrlStatus = require('../controllers/status.controllers.js');

// Work routes
router
  .route('/works')
  .get(ctrlWorks.worksGetAll)
  .post(ctrlWorks.worksAddOne);
  
 
router
  .route('/works/:workId')
  .get(ctrlWorks.worksGetOne)
  .put(ctrlWorks.worksUpdateOne);

router
   .route('/technician')
   .get(ctrlTechnicians.technicianGetAll)
  

router
   .route('/technician/:technicianUsername')
   .get(ctrlTechnicians.technicianGetOne); 

router
    .route('/status')
    .get(ctrlStatus.statusGetAll);    

router
.route('/users/register')
.post(ctrlUsers.register)
.get(ctrlUsers.techGetAll);      

  
 



module.exports = router;