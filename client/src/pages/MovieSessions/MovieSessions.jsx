import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import TopBar from "../../components/TopBar/TopBar";
import css from './MovieSessions.module.css';
import axios from 'axios';

import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import MoodIcon from '@mui/icons-material/Mood';

export default function MovieSessions() {
  const [sessions, setSessions] = useState(null);
  const [dias, setDias] = useState([]);
  const [selectedDia, setSelectedDia] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function findSessions(id) {
      const req = await axios.get(`http://localhost:8080/sessoes/${id}`)
      setSessions(req.data)

      const diasUnicos = req.data && [...new Set(req.data.map(obj => obj.diaSemana.nomeDiaSemana))];
      setDias(diasUnicos)
      setSelectedDia(diasUnicos[0])
    }
    findSessions(id);
  }, [])

  const filteredSessions = sessions && sessions.filter((session) => {
    return session.diaSemana.nomeDiaSemana === selectedDia

  })

  const handleSelectDia = (dia) => {
    setSelectedDia(dia)
  }

  return (
    <div className={css.container}>
      {sessions ? <><TopBar /><div className={css.movie}>
        <div>
          <iframe width="500" height="400" src={sessions[0].filme.videoUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
        <div className={css.movieInfo}>
          <span>{sessions[0].filme.titulo}</span>
          <div className={css.movieDetails}>
            <p style={{ fontWeight: 'bold' }}>{sessions[0].filme.classificacao}</p>
            <p style={{ fontWeight: 'bold' }}>{sessions[0].filme.genero}</p>
            <p style={{ fontWeight: 'bold' }}>{sessions[0].filme.duracao} MIN</p>
          </div>
        </div>
      </div>
        <div className={css.movieDescription}>
          <h2>Leia a sinopse</h2>
          <p>{sessions[0].filme.sinopse}</p>
          <div style={{ marginTop: '50px' }}>
            <p className={css.specs}><MoodIcon /><b>Classificação:</b> {sessions[0].filme.classificacao}</p>
            <p className={css.specs}><TheaterComedyIcon /><b>Gênero:</b> {sessions[0].filme.genero}</p>
            <p className={css.specs}><QueryBuilderIcon /><b>Duração:</b> {sessions[0].filme.duracao} MIN</p>
          </div>
        </div>
        <div className={css.sessions}>
          <h1>Sessões</h1>
          <div className={css.dias}>
            {sessions && dias.map((dia) => (
              <div className={selectedDia === dia ? css.selectedDia : css.dia} onClick={() => handleSelectDia(dia)}>
                {dia}
              </div>
            ))}
          </div>
          <div className={css.sessionsList}>
            {console.log(filteredSessions)}
            {filteredSessions.map((session) => (
              <div className={css.session}>
                <div className={css.sessionInfo}>
                  <span>{session.horario}</span>
                  <span>{session.tipo}</span>
                </div>
                <button
                  className={css.comprarButton}
                  onClick={() => navigate(`/ingressos/${session.id_sessao}`)}
                >
                  COMPRE AQUI
                </button>
              </div>
            ))}
          </div>

        </div></> : <div>Carregando...</div>}
    </div>
  )
}