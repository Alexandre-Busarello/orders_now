var app = angular.module('Order', ['angular-table']);
app.controller('OrderCtrl', function($scope, $http) {
    function initialize() {
        $scope.editId = 0;
        $scope.showOrders = true;
        $scope.showOrder = false;
        $scope.showDetails = false;
        $scope.errors = [];
        $scope.order = {};
        $scope.orders = [];
        $scope.tittle = 'Pedidos';
        $scope.config = {
            itemsPerPage: 15,
            fillLastPage: false
        }

        var onSuccessFn = function(response) {
            $scope.orders = response.data.data;
            $scope.orders.forEach(function(element, index, array) {
                element.endereco = element.logradouro + ', ' + element.numeroLogradouro + ' - ' + element.cidade + ' - ' + element.bairro + ' - ' + element.uf;
            });
        }
        var onErrorFn = function(response) {
            $scope.errors.push(response.data);
        }
        $http.get('/api/pedidos').then(onSuccessFn, onErrorFn);
    }

    initialize();

    $scope.newOrder = function () {
    	$scope.showOrders = false;
    	$scope.showOrder = true;
    }

    $scope.details = function(id) {
        var onSuccessFn = function(response) {
            $scope.order = response.data.data;
            $scope.showOrders = false;
            $scope.showOrder = false;
            $scope.showDetails = true;
            $scope.tittle = 'Pedido ' + $scope.order.numeroPedido;
        }
        var onErrorFn = function(response) {
            $scope.errors.push(response.data);
        }
        $http.get('/api/pedidos/' + id).then(onSuccessFn, onErrorFn);
    }

    $scope.closeOrder = function(id, item) {
        var onSuccessFn = function(response) {
            initialize();
        }
        var onErrorFn = function(response) {
            $scope.errors.push(response.data);
        }
        $http.put('/api/pedidos/' + id + '/Finalizar', item).then(onSuccessFn, onErrorFn);
    }

    $scope.editOrder = function(id) {
        var onSuccessFn = function(response) {
            $scope.order = response.data.data;
            $scope.showOrders = false;
            $scope.showOrder = true;
        }
        var onErrorFn = function(response) {
            $scope.errors.push(response.data);
        }
        $http.get('/api/pedidos/' + id).then(onSuccessFn, onErrorFn);
        $scope.editId = id;
    }

    $scope.cancel = function() {
        $scope.showOrders = true;
        $scope.showOrder = false;
        if ($scope.pedidoForm) {
            $scope.pedidoForm.$setPristine();
            $scope.pedidoForm.$setUntouched();
        }

        initialize();
    }

    $scope.saveOrder = function () {
       	var onSuccessFn = function (response) {
    		$scope.cancel();
    	}	
        var onErrorFn = function (response) {
    		$scope.errors.push(response.data);
        }
        if ($scope.editId > 0)
            $http.put('/api/pedidos/' + $scope.editId, $scope.order).then(onSuccessFn, onErrorFn);
        else 
            $http.post('/api/pedidos', $scope.order).then(onSuccessFn, onErrorFn);
    }
});

