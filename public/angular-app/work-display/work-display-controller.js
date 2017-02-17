angular.module('work').controller('WorkController', WorkController);


function WorkController($routeParams, workDataFactory, $scope) {
	var vm = this;
	var id = $routeParams.id;
	workDataFactory.workDisplay(id).then(function(response){
		vm.work = response.data;
		console.log(vm.work);

		$scope.$broadcast('setData', vm.work);
		
	});


	

}

