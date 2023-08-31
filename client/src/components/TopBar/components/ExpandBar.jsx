import React from "react";
import css from './ExpandBar.module.css'

export default function ExpandBar({ links }) {
  
  return (
    <div className={css.bar}>
      {links.map((link, index) => (
        <div
          className={css.link}
          key={index}
        >
          {link}
        </div>
      ))}
    </div>
  )
}