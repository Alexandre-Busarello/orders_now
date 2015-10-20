var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var schemas = [];
var getSchema = function (name) {
  for (var i = 0; i < schemas.length; i++) {
     if (schemas[i].name == name)
       return schemas[i].object;
  }
};

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('Connected on mongoDB');
	schemas = [];
	
	var pedidoSchema = new mongoose.Schema({
	  numeroPedido: Number,
	  cliente: String,
	  telefone: String,
	  pais: String,
	  uf: String,
	  cidade: String,
	  bairro: String,
	  logradouro: String,
	  numeroLogradouro: Number,
	  cep: String,
	  pesoLiquido: Number,
	  pesoCubado: Number,
	  status: Number
	}); 

	schemas.push({name: 'PedidoSchema', object: pedidoSchema});
	pedidoSchema.plugin(autoIncrement.plugin, { model: 'Pedido', field: 'numeroPedido', startAt: 1 });
	pedidoSchema.plugin(autoIncrement.plugin, { model: 'Pedido', field: '_id', startAt: 1 });
});

var api = 
  {
		connect: 
	    	function (url) {
				console.log('Connecting');
			    var connection = mongoose.connect(url);
				autoIncrement.initialize(connection);
	     	},
	    getModel: 
	    	function (name) {
				var schema = getSchema(name + 'Schema');
		        return mongoose.model(name, schema);
		    },
		types: 
		    function () {
		    	return mongoose.Types;
		    }
  }

exports.connect = api.connect;
exports.getModel = api.getModel;
exports.types = api.types;

