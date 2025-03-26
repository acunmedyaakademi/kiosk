import { useState } from 'react'
import './styles/App.css'
import "./styles/reset.css"
import Header from './components/Header';
import Products from './components/Products';




function App() {
  const [filterCategory, setFilterCategory] = useState({});

  // const filteredCategory = products.filter(x=> x.id != selectedCategory);
  // console.log(filteredCategory);


  console.log(filterCategory)
  return (
    <div className='container'>
      <Header setFilterCategory={setFilterCategory} />
      <Products filterCategory={filterCategory} />


    </div>
  )
}

export default App
