import { useEffect, useState } from "react"
import supabase from "../js/supabaseClient"
import "../styles/Products.css"

export default function Products() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);

  useEffect(() => {
    async function getData() {
      let { data, error } = await supabase.from('products').select('*');
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


  function handleProduct(product) {
    if (selectedProduct.find(x => x.id === product.id)) {
      selectedProduct.find(x => x.id === product.id).count++
      setSelectedProduct([...selectedProduct]);
    } else {
      setSelectedProduct([...selectedProduct, { ...product, count: 1 }])
    }
    console.log(selectedProduct);

  }



  return (
    <>
    <h2>All Items</h2>
    <div className="products-area">
      {products.map(x => (
        <div className="product">
          <img src={x.img} />
          <div>
            <h6>{x.name}</h6>
            <span>{x.price} ₺</span>
            <div>
              <button onClick={() => handleProduct(x)}>+ Ekle</button>
            </div>
          </div>
        </div>
      ))}
    </div>
      </>
  )
}