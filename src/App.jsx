import { useState } from 'react'
import './styles/App.css'
import "./styles/reset.css"
import Order from './components/Order';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Order />
    </>
  )
}

export default App
