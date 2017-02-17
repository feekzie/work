angular.module('work').controller('TechController', TechController);

function TechController($http, $scope, workDataFactory) {
	var vm = this;
	$http.get('/api/users/register').then(function(response){
       console.log(response);
       vm.tech_list = response.data;
	
});
	
	$scope.$on('setData', function(event, args) {
                 var id = args._id;
                 var name = args.name;
                 var address = args.address;
                 var email = args.email;
                 var fault = args.fault;
                 var submitted = true;
                 var phone = args.phone;
                 var completed = false;
     
                vm.addReview = function () {
		             if (vm.selectedTechnician != "" && vm.selectedTechnician != undefined)
			                  { 
				                   var postData = { 
			  	                                   technician: vm.selectedTechnician, 
			  	                                   progress : true,
			  	                                   name : name,
			  	                                   address : address,
			  	                                   email : email,
			  	                                   fault : fault,
			  	                                   submitted : true,
			  	                                   phone : phone,
			  	                                   completed : false
                                                  }; 
			  	                    $http.put('/api/works/' + id, postData).then(function(response) 
			                              { 
                                            if (response.status === 204)  { 
			  		                           	console.log('done');
			  		                           	vm.msg = 'Technician added'; 
			  		                           } 
			  		                           }).catch(function(error) {
			  		                              console.log(error);
			  		                           }); 
			  	                               } else{ 
			  		                                  vm.msg = 'Please Select Dropdown Value'; 
			                                          } 
			
                                            }       
     });   
};
