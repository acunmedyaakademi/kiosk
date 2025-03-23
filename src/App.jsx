import { useState } from 'react'
import './styles/App.css'
import "./styles/reset.css"
import Order from './components/Order';
import Header from './components/Header';
import supabase from './js/supabaseClient';
import Products from './components/Products';







function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='container'>
      <Header />
      <Products />


    </div>
  )
}

export default App
