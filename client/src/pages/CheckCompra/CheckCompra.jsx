import React, { useContext } from "react";
import css from './CheckCompra.module.css';
import TopBar from "../../components/TopBar/TopBar";
import { Context } from "../../context/Context";

export default function CheckCompra() {
  const { pedido } = useContext(Context)

  return (
    <div className={css.container}>
      <TopBar />
      <div className={css.display}>
        <h1>Pedido feito com sucesso!</h1>
        <div className={css.info}>
          <h2>{pedido.sessao.filme.titulo}</h2>
          <div className={css.pedidoDetails}>
            <p>{pedido.sessao.diaSemana.nomeDiaSemana}</p>
            <p>{pedido.sessao.horario}</p>
            <p>{pedido.sessao.tipo}</p>
            <p>Classificação: {pedido.sessao.filme.classificacao}</p>
            <p>{pedido.sessao.filme.duracao} min</p>
            <p>CPF do comprador: {pedido.cpf}</p>
            <p>Valor: R$ {pedido.valor}</p>
          </div>
          <h3>Lugares:</h3>
          <div className={css.seats}>
            {pedido.lugares.map(seat => (
              <p className={css.seat}><b>{seat.fila}-{seat.assento}</b></p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 