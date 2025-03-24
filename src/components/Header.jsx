import { useEffect, useState } from "react"
import Carosel from "./Carosel";
import supabase from "../js/supabaseClient"
import "../styles/Header.css";

export default function Header({setFilterCategory}) {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Main");
 

  useEffect(() => {
    async function getData() {
      let { data, error } = await supabase.from('categories').select('*');
      if (error !== null) {
        console.log(error.message)
        return
      }
      setProducts(data);
    }
    const channels = supabase.channel('insert').on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'products' },
      payload => {
        setProducts(prev => [...prev, payload.new]);
      }
    )
      .subscribe();

    getData();

    console.log(products);
    return () => supabase.removeChannel(channels);
  }, [])

  function handleCategory(x) {
    setSelectedCategory(x.name)
    setFilterCategory(x);
  }

  return (


    <>
      <header>
        <div className="category flex">
          {products.map(x =>
            <button className={`carousel__face ${selectedCategory === x.name ? 'active' : ''}`}  key={x.id} onClick={() => handleCategory(x)}>
              <i className={x.img}></i>
              <span>{x.name}</span>
            </button>
          )}
        </div>
        <div className="keyboard">
          <span className="key">C</span>
          <span className="key">A</span>
          <span className="key">M</span>
          <span className="key">P</span>
          <span className="key">A</span>
          <span className="key">I</span>
          <span className="key">G</span>
          <span className="key">N</span>
        </div>
        <Carosel />
      </header>
    </>
  );
}
