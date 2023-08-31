import React from "react";
import css from './ExpandButton.module.css'

export default function ExpandButton({ values, onValueSelect }) {

  const handleClick = (value) => {
    // Chamar a função de callback quando o botão for clicado
    onValueSelect(value);
  };

  return (
    <div className={css.options}>
      {values.map(value => (
        <button
          className={css.value}
          onClick={() => handleClick(value)}
        >
          {value}
        </button>
      ))}
    </div>
  )
}