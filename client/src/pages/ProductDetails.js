import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import "../styles/ProductDetailsStyles.css";

const ProductDetails = () => {
  // Get the URL parameters using useParams and set up navigation
  const params = useParams();
  const navigate = useNavigate();

  // Initialize state variables
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart(); // Initialize cart using useCart

  // Initialize cart with previously stored items from local storage, if any
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Fetch product details and related products when the slug parameter changes
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // Get Product Details
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Get Similar Products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle "More Details" button click
  const handleMoreDetails = (product) => {
    navigate(`/product/${product.slug}`);
  };

  // Handle "Add to Cart" button click
  const handleAddToCart = (product) => {
    // Ensure the quantity is explicitly set to 1
    const newItem = { ...product, quantity: 1 };

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);

      if (existingItem) {
        // If the item already exists, update the quantity
        existingItem.quantity += 1;
        localStorage.setItem("cart", JSON.stringify([...prevCart]));
        return [...prevCart];
      } else {
        // If the item does not exist, add it to the cart
        const newCart = [...prevCart, newItem];
        localStorage.setItem("cart", JSON.stringify(newCart));
        return newCart;
      }
    });

    toast.success("Item Added to cart");
  };

  return (
    <Layout>
      <div className="row container product-details">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>
            Price :
            {product?.price?.toLocaleString("en-PH", {
              style: "currency",
              currency: "PHP",
            })}
          </h6>
          <h6>Category : {product?.category?.name}</h6>
          <button
            className="btn btn-secondary ms-1"
            onClick={() => handleAddToCart(product)}
          >
            ADD TO CART
          </button>
        </div>
      </div>
      <hr />
      <div className="row container similar-products">
        <h4>Similar Products ➡️</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" key={p._id}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price">
                    {p.price.toLocaleString("en-PH", {
                      style: "currency",
                      currency: "PHP",
                    })}
                  </h5>
                </div>
                <p className="card-text ">
                  {p.description.substring(0, 60)}...
                </p>
                <div className="card-name-price">
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => handleMoreDetails(p)}
                  >
                    More Details
                  </button>
                  <button
                    className="btn btn-dark ms-1"
                    onClick={() => handleAddToCart(p)}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
