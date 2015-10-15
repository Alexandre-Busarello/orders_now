exports.initialize = function(app) {
    app.get('/orders', function(request, response) {
        response.json([{ number: 1, client: "Alexandre" }]);
    });
};