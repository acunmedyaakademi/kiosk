import { useState } from 'react'
import './styles/App.css'
import "./styles/reset.css"
import Header from './components/Header';

import { supabase } from "./supabase";

function App() {
  const [count, setCount] = useState(0);




  return (
    <>
      <Header />
    </>
  )
}

export default App
