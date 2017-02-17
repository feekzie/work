angular.module('work', ['ngRoute']).config(config);

function config($routeProvider) {
	$routeProvider
	   .when('/', {
	   	  templateUrl: 'angular-app/work-list/works.html',
	   	  controller: WorksController,
	   	  controllerAs: 'vm'
        })
	   .when('/work/:id', {
	   	  templateUrl: 'angular-app/work-display/work-display.html',
	   	  controller: WorkController,
	   	  controllerAs: 'vm'
        });
}

