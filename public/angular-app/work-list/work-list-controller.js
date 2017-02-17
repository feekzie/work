angular.module('work').controller('WorksController', WorksController);


function WorksController(workDataFactory) {
	var vm = this;
	vm.title = "Work Management App";
	workDataFactory.workList().then(function(response){
        console.log(response);
       vm.works = response.data;
	});
}