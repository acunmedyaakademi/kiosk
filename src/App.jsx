import { useState } from 'react'
import './styles/App.css'
import "./styles/reset.css"
import Header from './components/Header';
import { createClient } from '@supabase/supabase-js';



const supabase = createClient("https://sxkbwpcardxrhfuqzvzc.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4a2J3cGNhcmR4cmhmdXF6dnpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NzQ3MjAsImV4cCI6MjA1ODA1MDcyMH0.f6pWVT3SGve_Xmcs_m2lH0YDX9anp3hI915eNgjfgTI");

console.log(supabase);

function App() {
  const [count, setCount] = useState(0);




  return (
    <>
      <Header />
    </>
  )
}

export default App
