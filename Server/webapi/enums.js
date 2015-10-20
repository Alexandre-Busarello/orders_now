var Enum = require('enum');
require('enum').register();

exports.OrderStatus = new Enum({ 'EmAberto': 1, 'AgDistribuicao': 2, 'Distribuido': 3 });