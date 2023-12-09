import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import "../styles/ProductDetailsStyles.css";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();
  const [commentText, setCommentText] = useState("");
  const [commentPhoto, setCommentPhoto] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (product._id) {
      getComments();
    }
  }, [product._id]);

  const getComments = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-comments/${product._id}`);
      setComments(data?.comments);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMoreDetails = (product) => {
    navigate(`/product/${product.slug}`);
  };

  const handleAddToCart = (product) => {
    const newItem = { ...product, quantity: 1 };

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);

      if (existingItem) {
        existingItem.quantity += 1;
        localStorage.setItem("cart", JSON.stringify([...prevCart]));
        return [...prevCart];
      } else {
        const newCart = [...prevCart, newItem];
        localStorage.setItem("cart", JSON.stringify(newCart));
        return newCart;
      }
    });

    toast.success("Item Added to cart");
  };

  const handleAddComment = async () => {
    try {
      const formData = new FormData();
      formData.append("text", commentText);
      if (commentPhoto) {
        formData.append("photo", commentPhoto);
      }

      await axios.post(`/api/v1/product/add-comment/${product._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      getComments();

      setCommentText("");
      setCommentPhoto(null);

      toast.success("Comment added successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error adding comment");
    }
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
          <h6>Seller : {product?.createdBy?.name}</h6>
          <h6>Seller's Contact : {product?.createdBy?.phone}</h6>
          <button
            className="btn btn-secondary ms-1"
            onClick={() => handleAddToCart(product)}
          >
            ADD TO CART
          </button>
        </div>
      </div>
      <hr />
      <div className="row container comment-section">
        <h4>Add Comment ➡️</h4>
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Add your comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCommentPhoto(e.target.files[0])}
          />
        </div>
        <button className="btn btn-primary" onClick={handleAddComment}>
          Add Comment
        </button>
      </div>
      <hr />
      <div className="row container comment-section">
        <h4>Comments ➡️</h4>
        {comments.map((comment) => (
          <div key={comment._id} className="comment">
            <p>{comment.user?.name}</p>
            <p>{comment.text}</p>
            {comment.photo && (
              <img
                src={`/api/v1/product/comment-photo/${comment._id}`}
                alt="Comment"
                className="comment-photo"
              />
            )}
          </div>
        ))}
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
