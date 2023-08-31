import React, { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import css from './SeatSelection.module.css';
import TopBar from "../../components/TopBar/TopBar";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";


export default function SeatSelection() {
  const [seats, setSeats] = useState([]);
  const [session, setSession] = useState(null);
  const [seatsSelected, setSeatsSelected] = useState([]);
  const { id } = useParams();
  const {cart, setCart, sessionSelected, setSessionSelected} = useContext(Context);
  const navigate = useNavigate();

  async function getSeats() {
    const lugares = await axios.get(`http://localhost:8080/lugares/${id}`)
    const session = await axios.get(`http://localhost:8080/sessoes/sessao/${id}`)

    setSeats(lugares.data);
    setSession(session.data);
  }

  useEffect(() => {
    getSeats()
  }, [])

  const selectSeats = (seat) => {
    const seatAlreadySelected = seatsSelected.find(selectedSeat => (
      selectedSeat.id === seat.id &&
      selectedSeat.fila === seat.fila &&
      selectedSeat.assento === seat.assento
    ));

    if (seatAlreadySelected) {
      setSeatsSelected(seatsSelected.filter(selectedSeat => selectedSeat !== seatAlreadySelected));
    } else {
      setSeatsSelected([...seatsSelected, seat]);
    }
  };

  const isPlaceSelected = (id) => {
    return seatsSelected.some(selectedSeat => (
      selectedSeat.id === id 
    ));
  };

  const addCart = () => {
    if(seatsSelected.length > 0) {
      setCart(seatsSelected);
      setSessionSelected(session);
      navigate('/carrinho');
    } else {
      console.log("Nenhum assento selecionado!")
    }
  }

  useEffect(() => {
    console.log(cart)
    console.log(sessionSelected)
  },[sessionSelected])

  return (
    <div >
      <TopBar />
      <div className={css.container}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {session && <div className={css.info}>
            <h2>Sessão:</h2>
            <p>Filme: <b>{session.filme.titulo}</b></p>
            <p>Dia: <b>{session.diaSemana.nomeDiaSemana}</b></p>
            <p>Horário: <b>{session.horario}</b></p>
            <p>Classificação: <b>{session.filme.classificacao}</b></p>
            <p style={{ border: "1px solid #fff", display: "inline-block", padding: "2px" }}>
              <b>{session.tipo}</b>
            </p>

          </div>}
          {seats && <div className={css.seatSelection}>
            <h1>Escolha seus assentos</h1>
            <h2 style={{marginTop:"10px", marginBottom:"10px", color:"red"}}><b>TELA</b></h2>
            <div className={css.seatGrid}>
              {seats.map(place => (
                <div
                  key={place.id}
                  className={(place.disponivel && !isPlaceSelected(place.id)) ? css.seat : css.occupied}
                  onClick={() => {
                    if (place.disponivel === true) {
                      selectSeats(place)
                    }
                  }}
                >
                  {place.fila}-{place.assento}
                </div>
              ))}
            </div>
          </div>}
        </div>
        <div className={css.order}>
          <div className={css.seatsSelected}>
            {seatsSelected.map(place => (
              <div
                key={place.id}
                className={css.seat}
                onClick={() => selectSeats(place)}
              >
                {place.fila}-{place.assento}
              </div>
            ))}
          </div>
          <button
            className={css.comprarButton}
            onClick={() => addCart()}
          >
            FECHAR COMPRA <ArrowForwardIosIcon />
          </button>
        </div>
      </div>
    </div>
  )
}