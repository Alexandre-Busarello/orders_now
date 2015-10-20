var mongoService = require('../services/mongoService.js');

function validade(pedido, response) {
	if(!pedido.cliente) {
		response.status(400).json({ status: 400, data: 'Nome do cliente é obrigatório.' })
		return false;
	}
	if(!pedido.logradouro) {
		response.status(400).json({ status: 400, data: 'Endereço é obrigatório.' })
		return false;
	}	
	if(!pedido.numeroLogradouro) {
		response.status(400).json({ status: 400, data: 'Número do endereço é obrigatório.' })
		return false;
	}
	if(!pedido.bairro) {
		response.status(400).json({ status: 400, data: 'Nome do bairro é obrigatório.' })
		return false;
	}	
	if(!pedido.cidade) {
		response.status(400).json({ status: 400, data: 'Nome da cidade é obrigatório.' })
		return false;
	}
	if(!pedido.uf) {
		response.status(400).json({ status: 400, data: 'Sigla do estado é obrigatório.' })
		return false;
	}		
	return true;
}

exports.initialize = function(app) {
	app.get('/api/pedidos', function(request, response) {    	
		response.status(500, 'Erro não esperado.');

		var Pedido = mongoService.getModel('Pedido');
		Pedido.find({}, function(err, pedidos) {
			if (err) { 
				console.error(err);
				response.status(500).json({ status: 500, data: 'Erro ocorrido: ' + err });
			}
			console.dir(pedidos);
			if (pedidos.length > 0)
				response.status(200).json({ status: 200, data: pedidos });
			else 
				response.status(200).json({ status: 200, data: [] });
		});	
	});

	app.get('/api/pedidos/:id', function(request, response) {
		var pedidoId = request.params.id;

		response.status(500, 'Erro não esperado.');
		
		if (isNaN(pedidoId)) {
			response.status(404).json({ status: 400, data: 'Id incorreto enviado na url.'});
			return;
		}

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
	});

	app.post('/api/pedidos', function(request, response) {
		var pedido = request.body;
		
		if (!validade(pedido, response))
			return;

		response.status(500, 'Erro não esperado.');

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

		newPedido.save(function(err, pedido) {
			if (err) return console.error(err);
			console.dir('Pedido criado -> ' + pedido);
			response.status(200).json({status: 200, data:'Sucesso!'});
		}); 	
	});

	app.put('/api/pedidos/:id', function(request, response) {
		var pedidoId= request.params.id;
		var pedido = request.body;

		if (!validade(pedido, response))
			return;	
		
		response.status(500, 'Erro não esperado.');

		if (isNaN(pedidoId)) {
			response.status(404).json({ status: 400, data: 'Id incorreto enviado na url.'});
			return;
		}	
		
		var Pedido = mongoService.getModel('Pedido');
		Pedido.findOne({ _id: pedidoId }, function(err, p) {
			if (err) { 
				console.error(err);
				response.status(500).json({ status: 500, data: 'Erro ocorrido: ' + err });
			}
			if (!p) {
				response.status(404).json({ status: 404, data: 'Pedido não encontrado.'});
			}

			console.dir(pedido);

			p.cliente = pedido.cliente,
			p.telefone = pedido.telefone,
			p.pais = pedido.pais,
			p.uf = pedido.uf,
			p.cidade = pedido.cidade,
			p.bairro = pedido.bairro,
			p.logradouro = pedido.logradouro,
			p.numeroLogradouro = pedido.numeroLogradouro,
			p.cep = pedido.cep,
			p.pesoLiquido = pedido.pesoLiquido,
			p.pesoCubado = pedido.pesoCubado

			p.save(function(err, pedido) {
				if (err) return console.error(err);
				console.dir('Pedido alterado -> ' + pedido);
				response.status(200).json({status: 200, data:'Sucesso!'});
			}); 	
		});

	});
};

