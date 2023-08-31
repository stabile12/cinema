import React, { useState } from "react";
import css from './TopBar.module.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShopIcon from '@mui/icons-material/Shop';
import ExpandBar from "./components/ExpandBar";
import { useNavigate } from 'react-router-dom';

export default function TopBar() {
  const [expand, setExpand] = useState(false);
  const [links, setLinks] = useState([]);
  const navigate = useNavigate();

  const defineLinks = (links) => {
    setLinks(links);
  }


  return (
    <div className={css.total} onMouseLeave={() => setExpand(false)}>
      <div className={css.container}>
        <h1 className={css.logo} onClick={() => navigate("/")}>CINEMA</h1>
        <div        
          className={css.option}
          onMouseEnter={() => {
            setExpand(true)
            defineLinks(["EM CARTAZ", "EM BREVE"])
          }}
        >
          <h3>PROGRAMAÇÃO</h3>
          <ExpandMoreIcon />
        </div>
        <div
          className={css.option}
          onMouseEnter={() => {
            setExpand(true)
            defineLinks(["CARDÁPIO", "CARDÁPIO PREMIUM"])
          }}
        >
          <h3>SNACK BAR</h3>
          <ExpandMoreIcon />
        </div>
        <div
          className={css.option}
          onMouseEnter={() => setExpand(false)}
          onClick={() => navigate("/carrinho")}
        >
          <ShoppingCartIcon fontSize="small" />
          <h3 style={{marginTop:"7px", marginLeft:"5px"}}>Carrinho</h3>
        </div>
        <div
          className={css.option}
          onMouseEnter={() => setExpand(false)}
          onClick={() => navigate("/pedidos")}
        >
          <ShopIcon fontSize="small" />
          <h3 style={{marginTop:"7px", marginLeft:"5px"}}>Pedidos</h3>
        </div>
      </div>
      {expand &&
       <ExpandBar
        
        links={links}
        
        />}
    </div>
  )
}