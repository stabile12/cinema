import React, { useState } from "react";
import css from './Pedidos.module.css'
import TopBar from "../../components/TopBar/TopBar";
import axios from 'axios';

export default function Pedidos() {
  const [cpf, setCpf] = useState('');
  const [pedidos, setPedidos] = useState([]);

  const handleSearch = async () => {
    try {
      const req = await axios.post("http://localhost:4000/pedidos/", { cpf: cpf })
      console.log(req.data)
      setPedidos(req.data);

    } catch (e) {  
      console.log("nenhum pedido encontrado!")
    }
  }

  const formatedCpf = (e) => {
    const inputCpf = e.target.value;

    const cleanedCpf = inputCpf.replace(/\D/g, '');

    const formattedCpf = cleanedCpf.replace(
      /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
      '$1.$2.$3-$4'
    );

    setCpf(formattedCpf);
  }

  return (
    <div>
      <TopBar />
      <div className={css.container}>
        <h1>Encontre seus pedidos aqui</h1>
        <div className={css.searchDiv}>
          <h3>Informe seu CPF:</h3>
          <input type="text"
            className={css.input}
            maxLength="14"
            value={cpf}
            onChange={(e) => formatedCpf(e)} />
          <button
            className={css.searchButton}
            onClick={handleSearch}>
            buscar
          </button>
          {pedidos.length === 0 && <span>Nenhum pedido encontrado!</span>}
        </div>
        {pedidos.length > 0 &&
          <div className={css.pedidosList}>
            {pedidos.map((pedido) => (
              <div className={css.pedido}>
                <div className={css.pedidoInfo}>
                  <p>Código do pedido: <b>{pedido._id}</b></p>
                  <p>Sessão: <b>{pedido.sessao.id_sessao}</b></p>
                </div>
                <div className={css.pedidoInfo}>
                  <p>Dia: <b>{pedido.sessao.diaSemana.nome_dia}</b></p>
                  <p>Horário: <b>{pedido.sessao.horario}</b></p>
                </div>
                <div className={css.pedidoInfo}>
                  <p>Filme: <b>{pedido.sessao.filme.titulo}</b></p>
                  <p><b>{pedido.sessao.tipo}</b></p>
                </div>
                <div className={css.pedidoInfo}>
                  Lugares:
                  {pedido.lugares.map((lugar) => (
                    <p className={css.lugar}><b>{lugar.fila}-{lugar.assento}</b></p>
                  ))}
                </div>
                <p>Valor: <b>R${pedido.valor}</b></p>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  )
}