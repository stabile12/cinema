const router = require('express').Router();
const Pedido = require('../models/Pedido');

router.post('/', async (req, res) => {
  try {
    const pedidos = await Pedido.find({ cpf: req.body.cpf }).exec();
    if (pedidos.length > 0 ) {
      console.log(pedidos)
      res.status(200).json(pedidos);
    } else {
      console.log('não encontrado!')
      res.status(404).send();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});
module.exports = router;