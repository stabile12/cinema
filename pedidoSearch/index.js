const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require("helmet");
const pedidosRoutes = require("./routes/pedidos")

const app = express();
app.use(cors());

mongoose.connect('mongodb://localhost:27017/cinema',
{ useNewUrlParser: true, useUnifiedTopology: true }
).then(console.log('conectado ao mongoDB'))

app.use(express.json());

app.use(helmet({
  crossOriginResourcePolicy: false,
}));

app.use('/pedidos', pedidosRoutes);

app.listen(4000, () => {
  console.log("API running")
})