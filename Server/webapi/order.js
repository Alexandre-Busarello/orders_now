exports.initialize = function(app) {
    app.get('/orders', function(request, response) {
        response.json([{ number: 1, client: "Alexandre" }]);
    });

    app.get('/orders/:id', function(request, response) {
	var orderId= request.params.id;
        response.json([{ number: 1, client: "Alexandre" }]);
    });

    app.post('/orders', function(request, response) {
	var order = request.body;
        response.json([{ number: 1, client: "Alexandre" }]);
    });

    app.put('/orders/:id', function(request, response) {
	var orderId= request.params.id;
	var order = request.body;
        response.json([{ number: 1, client: "Alexandre" }]);
    });
};

