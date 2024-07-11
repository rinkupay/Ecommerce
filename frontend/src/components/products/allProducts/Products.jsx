import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import { fetchProducts } from "../../../features/productSlice";
// import Pagination from "react-js-pagination";
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useNavigate } from "react-router-dom";
import ProductsCardDesk from "../productscard/ProductsCardDesk";
import { IoMdStarOutline } from "react-icons/io";

function valuetext(price) {
  return `${price}`;
}

const marks = [
  {
    value: 0,
    label: "",
  },
  {
    value: 2500,
    label: "",
  },
  {
    value: 5000,
    label: "",
  },
  {
    value: 10000,
    label: "",
  },
  {
    value: 15000,
    label: "",
  },
  {
    value: 20000,
    label: "",
  },
  {
    value: 25000,
    label: "",
  },
];

const categories = ["Mobile", "Laptop", "Television", "Camera"];
const brands = ["Samsung", "Vivo", "Oppo", "Realme", "Poco", "Apple"];

const Products = () => {
  const navigate = useNavigate();

  const [ratings, setRatings] = React.useState(0);
  const [category, setCategory] = React.useState("");

  const [brand, setBrand] = useState("");

  const handleRatings = (e) => {
    const value = e.target.checked ? e.target.value : 0;
    setRatings(value);
  };


 

  // <<========================= TOGGLE BRAND ============================>>
  const [isbrand, setIsBrand] = useState(false);
  const toggleBrand = () => {
    setIsBrand(!isbrand);
  };

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);
  const [ratingsOpen, setRatingsOpen] = useState(false);

  // <<======================= TOGGLE RATING =============================>>
  const [isRating, setIsRating] = useState(false);
  const toggleRatings = () => {
    setIsRating(!isRating);
  };


  // <<======================= PAGINATION ===========================>>
  const [currentPage, setCurrentPage] = React.useState(1);
  const handlePage = (event, value) => {
    setCurrentPage(value);
  };





  const toggleCategory = () => {
    setCategoryOpen(!categoryOpen);
  };



  // <<========================== PRICE SLIDER CONFIGURATION ============================>>
  const [price, setPrice] = useState([0, 25000]);

  const handleChange = (event, newValue) => {
    setPrice(newValue);
  };

  const productKeyword = useParams();
  const keyword = productKeyword.keyword;

  const dispatch = useDispatch();
  const { products, loading, error, productCount, resultPerPage } = useSelector(
    (state) => state.products
  );

  let product = products.products;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const handleClick = () => {
    setBrand(!brand);
  };

  const brandHandle = () => {
    setBrandOpen(!brandOpen);
  };
  const handleRating = () => {
    setRatingsOpen(!ratingsOpen);
  };

  useEffect(() => {
    dispatch(fetchProducts({ keyword, currentPage, price, category, ratings }));
  }, [dispatch, keyword, currentPage, price, category, ratings]);

  const resetFilter = () => {
    setCategory("");
    setPrice([0, 20000]);
    setCurrentPage(1);
    setRatings(0);
  };

  return (
    <Fragment>
      <div className="products-wrapper">
        <div className="products-container">
          <div className="product-left-container">
            <div className="product-menus-container">
              <div className="product-menus">
                <h4>Filter</h4>
                <p onClick={resetFilter}> Clear</p>
              </div>

              <div className="product-sub-menus">
                <div className="product-sub-menu">filter 1</div>
              </div>
            </div>

            {/* <<========================= PRICE =============================>> */}
            <div className="product-menus-container">
              <div className="product-menus">
                <p>PRICE</p>
                <p> Reset</p>
              </div>

              <div className="product-sub-menus">
                <div className="price-slider">
                  <Box sx={{ width: 200}}>
                    <Slider
                      getAriaLabel={() => "Price Range"}
                      value={price}
                      onChange={handleChange}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuetext}
                      step={1000}
                      max={25000}
                      min={0}
                      marks={marks}
                      size="small"
                    />
                  </Box>
                  <div className="price-display">
                    <input className="price-output" value={price[0]} readOnly type="number" />
                    <p>to</p>
                    <input className="price-output" value={price[1]} readOnly type="number" />
                  </div>
                </div>
              </div>
            </div>

            {/* <<========================= CATEGORIES =============================>> */}
            <div className="product-menus-container">
              <div className="product-menus" onClick={toggleCategory}>
                <p>CATEGORIES</p>
                {!categoryOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </div>
              {categoryOpen && (
                <div className="product-sub-menus">
                  <div className="product-sub-menu">
                    {categories.map((item, index) => (
                      <Link className="menu" key={index} onClick={()=>setCategory(item.toLowerCase())}>
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* <<========================= BRAND =============================>> */}
            <div className="product-menus-container">
              <div className="product-menus" onClick={toggleBrand}>
                <p>BRAND</p>
                {!isbrand ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </div>
              {isbrand && (
                <div className="product-sub-menus">
                  <div className="product-sub-menu">
                    {brands.map((item, index) => (
                      <Link className="menu" key={index}>
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* <<========================= CUSTOMER RATINGS =============================>> */}
            <div className="product-menus-container">
              <div className="product-menus" onClick={toggleRatings}>
                <p>CUSTOMER RATINGS</p>
                {!isRating ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </div>
              {isRating && (
                <div className="product-sub-menus">
                  <div className="product-sub-menu">
                    <div className="rating-menus">
                      <input type="checkbox" name="" id="" value={2} onChange={handleRatings} />
                      <p>2 <IoMdStarOutline /><IoMdStarOutline /></p>
                    </div>
                    <div className="rating-menus">
                      <input type="checkbox" name="" id="" value={3} onChange={handleRatings} />
                      <p>3 <IoMdStarOutline /><IoMdStarOutline /><IoMdStarOutline /></p>
                    </div>
                    <div className="rating-menus">
                      <input type="checkbox" name="" id="" value={4} onChange={handleRatings} />
                      <p>4 <IoMdStarOutline /><IoMdStarOutline /><IoMdStarOutline /><IoMdStarOutline /></p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="product-right-container">
            {/* <div className="product-right-contents">
              <div className="products">
                {product &&
                  product.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
              </div>
            </div> */}
            <div className="product-right-contents">
              {/* <div className="products">
                {product &&
                  product.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
              </div> */}

                 <div className="products-desk">
                {product &&
                  product.map((product) => (
                    <ProductsCardDesk key={product._id} product={product} />
                  ))}
              </div>
              
            </div>

            {/* <<============================ PAGINATION ================>> */}
            {
              productCount > 8 && <div className="pagination-container">
              <div className="pagination">
                <Stack spacing={2}>
                  <Pagination count={productCount} page={currentPage} onChange={handlePage} />
    
                  </Stack>
               </div>
            </div>
            }
          </div>

         
        </div>
        
      </div>
    </Fragment>
  );
};

export default Products;
