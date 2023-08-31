import React, {createContext, useState} from "react";

export const Context = createContext();
const pedidoInicial = {
  "sessao": {
    "id_sessao": 6,
    "diaSemana": {
        "id": 7,
        "nomeDiaSemana": "Sábado"
    },
    "horario": "21:00",
    "tipo": "DUB",
    "filme": {
        "id": 4,
        "titulo": "Invocação do Mal",
        "classificacao": "16+",
        "sinopse": "Baseado em eventos reais, 'Invocação do Mal' acompanha os renomados investigadores paranormais Ed e Lorraine Warren quando são chamados para ajudar uma família aterrorizada por uma presença maligna em sua casa isolada. Enfrentando forças sobrenaturais cada vez mais aterradoras, o casal se vê envolvido em uma batalha contra o mal para proteger a família e enfrentar os segredos sombrios que assombram a propriedade há décadas. Nessa luta entre a fé e o desconhecido, eles arriscam tudo para combater a malevolência e salvar almas inocentes de uma terrível maldição.",
        "genero": "TERROR",
        "videoUrl": "https://www.youtube.com/embed/GQrrXceHn2E",
        "duracao": 112,
        "ativo": true
    }
},
"lugares": [
    {
        "id": 32,
        "disponivel": true,
        "fila": 1,
        "assento": 2,
        "id_sessao": 6
    },
    {
        "id": 33,
        "disponivel": true,
        "fila": 1,
        "assento": 3,
        "id_sessao": 6
    }
],
"cpf":"172.111.367-31",
"valor": 20
}
export function ContextProvider({children}) {
  const [token, setToken] = useState(null);
  const [cart, setCart] = useState([])
  const [sessionSelected, setSessionSelected] = useState(null)
  const [pedido, setPedido] = useState(pedidoInicial)

  return (
    <Context.Provider value={
      {token, setToken, cart, setCart, sessionSelected, setSessionSelected, pedido, setPedido}
    }>
      {children}
    </Context.Provider>
  )
}