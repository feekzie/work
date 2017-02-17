angular.module('work').directive('mhOption', mhOption);

function mhOption() {
	return {
		restrict: 'E',
		templateUrl: 'angular-app/option-directive/option-directive.html'

	};

}