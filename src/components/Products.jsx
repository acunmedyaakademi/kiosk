import { useEffect, useState } from "react"
import supabase from "../js/supabaseClient"
import "../styles/Products.css"

export default function Products() {

  const [products,setProducts] = useState([]);

  useEffect(() => {
    
    async function getData() {
      let { data, error } = await supabase.from('products').select('*');
      if(error !== null) {
        console.log(error.message)
        return
      }
      setProducts(data);
      console.log(products)
    }  
    const channels = supabase.channel('insert').on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'products' },
      payload => {
        console.log(payload.new);
        setProducts(prev => [...prev, payload.new]);
      }
    )
    .subscribe();

  getData();

  return () => supabase.removeChannel(channels);
        
  },[])



  return(
    <div className="products-area">
      {products.map(x => (
       <div className="product">
        <img src={x.img}/>
        <div className="flex">
        <h6>{x.name}</h6>
        <span>{x.price}</span>
        <div>
          <button>+</button>
        </div>
        </div>
       </div>
      ))}
    </div>
  )
}