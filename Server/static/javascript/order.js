var app = angular.module('Order', []);
app.controller('OrderCtrl', function($scope, $http) {
    $scope.showOrders = true;
    $scope.showOrder = false;
    $scope.errors = [];
    $scope.orders = [];

    var onSuccessFn = function (response) {
    	$scope.orders = response.data.data;
    }	
    var onErrorFn = function (response) {
    	$scope.errors.push(response.data);
    }	
    $http.get('/api/pedidos').then(onSuccessFn, onErrorFn);

    $scope.newOrder = function () {
    	$scope.showOrders = false;
    	$scope.showOrder = true;
    }

    $scope.back = function () {
    	$scope.showOrders = true;
    	$scope.showOrder = false;
    } 

    $scope.saveOrder = function () {
       	var onSuccessFn = function (response) {
    		$scope.back();
    	}	
        var onErrorFn = function (response) {
    		$scope.errors.push(response.data);
    	}	
    	$http.post('/api/pedidos', $scope.order).then(onSuccessFn, onErrorFn);
    }
});

