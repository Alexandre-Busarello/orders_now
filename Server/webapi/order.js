var orderApi = require('./order.js');
var mongoService = require('../services/mongoService.js');

exports.initialize = function(app) {
    app.get('/api/pedidos', function(request, response) {
	var Pedido = mongoService.getModel('Pedido');
	Pedido.find({ uf: 'SC' }, function(err, pedidos) {
	  if (err) { 
	     console.error(err);
      	     response.status(500).json({ status: 500, data: 'Erro ocorrido: ' + err });
	  }
	  console.dir(pedidos);
	  if (pedidos.length > 0)
	  	response.status(200).json({ status: 200, data: pedidos })
	  else 
		response.status(200).json({ status: 200, data: [] })
	});	
    });

    app.get('/api/pedidos/:id', function(request, response) {
	var pedidoId = request.params.id;

	if (pedidoId) {
		var Pedido = mongoService.getModel('Pedido');
		Pedido.findOne({ _id: pedidoId }, function(err, pedido) {
		  if (err) { 
		     console.error(err);
	      	     response.status(500).json({ status: 500, data: 'Erro ocorrido: ' + err });
		  }
		  console.dir(pedido);
		  if (pedido)
		    response.status(200).json({ status: 200, data: pedido });
		  else
		    response.status(404).json({ status: 404, data: 'Pedido não encontrado.'});
		});
	} else {
		response.status(404).json({ status: 400, data: 'Id não enviado na url.'});
	}
    });

    app.post('/api/pedidos', function(request, response) {
	var pedido = request.body;
	
	var Pedido = mongoService.getModel('Pedido');
	var newPedido = new Pedido({
		cliente: pedido.cliente,
		telefone: pedido.telefone,
		pais: pedido.pais,
		uf: pedido.uf,
		cidade: pedido.cidade,
		bairro: pedido.bairro,
		logradouro: pedido.logradouro,
		numeroLogradouro: pedido.numeroLogradouro,
		cep: pedido.cep,
		pesoLiquido: pedido.pesoLiquido,
		pesoCubado: pedido.pesoCubado
	});

	pedido.save(function(err, pedido) {
	  if (err) return console.error(err);
	  console.dir(pedido);
	}); 	

        response.status(200);
    });

    app.put('/api/pedidos/:id', function(request, response) {
	var pedidoId= request.params.id;
	var pedido = request.body;

	//

        response.status(200);
    });
};

