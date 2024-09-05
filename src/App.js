import { useState, useEffect } from 'react';
import './App.css';

function App() {
  //https://dummyjson.com/products, Product Name, Description and Image in tabular format.
  const [product, setProduct] = useState(null);

  const fetchData = async () => {
    let res = await fetch('https://dummyjson.com/products');
    return res;
  };

  const sliceDescription = (description) => {
    if(description.length > 150) {
      return description.substring(0, 150) + '...';
    }
    return description;
  } 

  useEffect(() => {
    if (!product) {
      fetchData().then((response) => { return response.json() }).then((data) => setProduct(data.products));
    }
  }, [])

  return (
    <div className="App">
      {product && product.length > 0 && (<table className='table'>
        <thead className='header'>
          <tr className='tableRow'>
            <th className='item'>Title</th>
            <th className='item'>Description</th>
            <th className='item'>Image</th>
          </tr>
        </thead>
        <tbody>
          {
            product.map(item => {
              const { title, description, images } = item;
              return (
                <tr>
                  <td className='item'>{title}</td>
                  <td className='item'>{sliceDescription(description)}</td>
                  <td className='item'><img className="productImage" src={images[0]} height="100px" width="100px"/></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      )}
    </div>
  );
}

export default App;
