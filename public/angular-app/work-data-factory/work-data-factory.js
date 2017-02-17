angular.module('work').factory('workDataFactory', workDataFactory);

function workDataFactory($http) {
	return {
		workList: workList,
		workDisplay: workDisplay,
		
		
	};


	function workList() {
		return $http.get('/api/works').then(complete).catch(failed);
	}

	function workDisplay(id) {
		return $http.get('/api/works/' + id).then(complete).catch(failed);
	}

	
	function complete(response) {
		return response;
	}

	function failed(error) {
		console.log(error.statusText);
	}
}