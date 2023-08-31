const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  _id: Number,
  sessao: {
    type: Object
  },
  lugares: {
    type: Array
  },
  cpf: String,
  valor: Number,
});

const Pedido = mongoose.model('Pedido', pedidoSchema);

module.exports = Pedido;