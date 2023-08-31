import React from "react";
import css from './Posters.module.css'


export default function Posters({ nome, classificacao, sinopse, video, duracao }) {
  
  return (
    <div className={css.container}>
      <div className={css.info}>
        <h1 className={css.title}>{nome}</h1>
        <span>Classificação: {classificacao}</span>
        <span>Duração: {duracao} min</span>
        <p>
          {sinopse}
        </p>
      </div>
      <div className={css.video}>
        <iframe width="500" height="350" src={video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>
    </div>
  )
}