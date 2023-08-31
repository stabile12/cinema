import React, { useContext, useState, useEffect } from "react";
import TopBar from "../../components/TopBar/TopBar";
import css from './Cart.module.css'
import { Context } from "../../context/Context";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cart, setCart, setSessionSelected, sessionSelected, setPedido } = useContext(Context);
  const [titular, setTitular] = useState('');
  const [cpf, setCpf] = useState('');
  const [numCartao, setNumCartao] = useState('')
  const [cvv, setCvv] = useState('');
  const [validade, setValidade] = useState('');
  const [valor, setValor] = useState(cart.length * 20);
  const navigate = useNavigate();
  const [recusado, setRecusado] = useState(false)

  const handleSubmit = async () => {
    const data = {
      dadosCadastroPedido: {
        sessao: sessionSelected,
        lugares: cart,
        cpf: cpf,
        valor: valor
      },
      cartao: {
        nome: titular,
        numero: numCartao,
        validade: validade,
        cvv: cvv,
        cpf: cpf,
        valor: valor
      }
    }
    try {
      const req = await axios.post("http://localhost:8080/pedido", data)
      if (req.status === 200) {
        setPedido(req.data)
        setSessionSelected(null)
        setCart([])
        navigate("/check")
      }
    } catch (e) {
      console.log("erro no processamento do pedido!")
      setRecusado(true)
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
    setRecusado(false);
  }

  const formatedCardNumber = (e) => {
    const number = e.target.value
    const cleanedNumber = number.replace(/\D/g, '');
    const formatedNumber = cleanedNumber.replace(
      /^(\d{4})(\d{4})(\d{4})(\d{4})$/,
      '$1 $2 $3 $4'
    )

    setNumCartao(formatedNumber)
    setRecusado(false);
  }

  const formatedValidade = (e) => {
    const validade = e.target.value
    const cleanedValidade = validade.replace(/\D/g, '');
    const formatedValidade = cleanedValidade.replace(
      /^(\d{2})(\d{2})$/,
      '$1/$2'
    )

    setValidade(formatedValidade)
    setRecusado(false);
  }

  const formatedCvv = (e) => {
    const cvv = e.target.value
    const cleanedCvv = cvv.replace(/\D/g, '');
    const formatedCvv = cleanedCvv.replace(
      /^(\d{3})$/,
      '$1'
    )

    setCvv(formatedCvv)
    setRecusado(false);
  }

  const handleMeiaEntrada = (e) => {
    if (e.target.value === 0) {
      setValor(cart.length * 20)
    } else {
      setValor((cart.length * 20) - (10 * e.target.value))
    }
  }

  return (
    <div>
      <TopBar />
      {sessionSelected ? <div className={css.container}>
        <div className={css.cartInfo}>
          <h2>Sua Compra</h2>
          <p>Filme: <b>{sessionSelected.filme.titulo}</b></p>
          <p>Dia: <b>{sessionSelected.diaSemana.nomeDiaSemana}</b></p>
          <p>Horário: <b>{sessionSelected.horario}</b></p>
          <p><b>{sessionSelected.tipo}</b></p>
          <h3>Lugares:</h3>
          {cart.map(seat => (
            <p className={css.seat}><b>{seat.fila}-{seat.assento}</b></p>
          ))}
          <h4 >Meia-entrada</h4>
          <select onChange={(e) => handleMeiaEntrada(e)} className={css.meiaSelect}>

            <option value={0}>0</option>
            {cart.map((seat, index) => (
              <option value={index + 1}>{index + 1}</option>
            ))}
          </select>
          <p style={{ fontSize: "20px" }}>Total: R$ <b>{valor}</b></p>
        </div>
        <div className={css.payment}>
          <h2>Pagamento</h2>
          <div className={css.inputDiv}>
            <label>Nome no cartão:</label>
            <input type="text" className={css.titularInput} value={titular} onChange={(e) => {setTitular(e.target.value); setRecusado(false);}} />
          </div>
          <div className={css.inputDiv}>
            <label>CPF:</label>
            <input type="text" className={css.titularInput} maxLength="14" value={cpf} onChange={(e) => formatedCpf(e)} />
          </div>
          <div className={css.inputDiv}>
            <label>Número do Cartão:</label>
            <input type="text" className={css.titularInput} maxLength="16" value={numCartao} onChange={(e) => formatedCardNumber(e)} />
          </div>
          <div className={css.inputDiv}>
            <label>Validade (MM/AA):</label>
            <input type="text" className={css.titularInput} maxLength="5" value={validade} onChange={(e) => formatedValidade(e)} />
          </div>
          <div className={css.inputDiv}>
            <label>CVV:</label>
            <input type="text" className={css.cvvInput} maxLength="3" value={cvv} onChange={(e) => formatedCvv(e)} />
          </div>
          <div className={css.buttonDiv}>
            <button className={css.comprarButton} onClick={() => {
              try {
                handleSubmit()
              } catch (e) {
                console.log(e)
              }
            }}>comprar</button>
            {recusado && <span>Erro no processamento do pedido!</span>}
          </div>
        </div>
      </div> :
        <div className={css.alterContainer}>
          <h1>Ops! Parece que seu carrinho está vazio!</h1>
          <button className={css.comprarButton} onClick={() => navigate("/")}>Voltar</button>

        </div>
      }
    </div>
  )
}