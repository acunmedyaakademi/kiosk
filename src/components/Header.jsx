import { useEffect, useState } from "react"
import Carosel from "./Carosel";
import supabase from "../js/supabaseClient"
import "../styles/Header.css";

export default function Header() {
  const [products, setProducts] = useState([]);
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

    return () => supabase.removeChannel(channels);

  }, [])

  return (


    <>
      <header>
        {/* {products.map(x => (
          <div className="category flex">
            <button className="carousel__face">
              <i className={x.icon}></i>
              <span>{x.name}</span>
            </button>
          </div>
        ))} */}
        {/* catagoriler gelio ama css düzeltilmesi lazım bide iconları teker teker nasıl vericez ona bak */}

        <div className="category flex">
          <button className="carousel__face active">
            <i className="fa-solid fa-house"></i>
            <span>Main</span>
          </button>
          <button className="carousel__face">
            <i className="fa-solid fa-pizza-slice"></i>
            <span>Pizza</span>
          </button>
          <button className="carousel__face">
            <i className="fa-solid fa-burger"></i>
            <span>Burgers</span>
          </button>
          <button className="carousel__face">
            <i className="fa-solid fa-drumstick-bite"></i>
            <span>Chickens</span>
          </button>
          <button className="carousel__face">
            <i class="fa-solid fa-cake-candles"></i>
            <span>Desserts</span>
          </button>
          <button className="carousel__face">
            <i className="fa-solid fa-mug-hot"></i>
            <span>Drinks</span>
          </button>
          <button className="carousel__face">
            <i class="fa-solid fa-cheese"></i>
            <span>Sauces</span>
          </button>
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
