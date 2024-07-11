import React,{useEffect} from "react";
import "./Home.css";
import ProductCard from "../products/productCard/ProductCard";
import { fetchProducts } from "../../features/productSlice"
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch()

  const { products, loading } = useSelector((state) => state.products)

  const product = products.products


  
  useEffect(() => {

    dispatch(fetchProducts({}));
  }, [dispatch]);


  return (
    <div>
      <div className="home-wrapper">
        <div className="home-container">
          <h3>Product</h3>

          <div className="home-content">
          {product && product.map((product,index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
