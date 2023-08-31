import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import MovieSessions from './pages/MovieSessions/MovieSessions';
import SeatSelection from './pages/SeatSelection/SeatSelection';
import Cart from './pages/Cart/Cart';
import CheckCompra from './pages/CheckCompra/CheckCompra';
import Pedidos from './pages/Pedidos/Pedidos';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/sessoes/:id' element={<MovieSessions />} />
        <Route path='/ingressos/:id' element={<SeatSelection />} />
        <Route path='/carrinho' element={<Cart/>} />
        <Route path='/check' element={<CheckCompra />} />
        <Route path='/pedidos' element={<Pedidos />} />
      </Routes>
    </BrowserRouter>
  )
}