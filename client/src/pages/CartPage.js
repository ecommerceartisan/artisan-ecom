import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";

const CartPage = () => {
  // Access authentication and cart data from context
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  // State for storing the client token and payment instance
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");

  // State to handle loading state during payment processing
  const [loading, setLoading] = useState(false);

  // Initialize the navigation function
  const navigate = useNavigate();

  // Function to update the quantity of an item in the cart
  const updateCartItemQuantity = (pid, quantity) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);

      if (index !== -1) {
        myCart[index].quantity = quantity;
        setCart(myCart);
        localStorage.setItem("cart", JSON.stringify(myCart));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to increment the quantity of an item
  const incrementQuantity = (pid) => {
    const item = cart.find((item) => item._id === pid);
    if (item) {
      const newQuantity = item.quantity + 1;
      updateCartItemQuantity(pid, newQuantity);
    }
  };

  // Function to decrement the quantity of an item
  const decrementQuantity = (pid) => {
    const item = cart.find((item) => item._id === pid);
    if (item && item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      updateCartItemQuantity(pid, newQuantity);
    }
  };

  // Function to calculate the total price of the items in the cart
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price * item.quantity;
      });
      return total.toLocaleString("en-PH", {
        style: "currency",
        currency: "PHP",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Function to remove an item from the cart
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // Function to get the payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Fetch the payment gateway token when the component loads
    getToken();
  }, [auth?.token]);

  // Function to handle the payment process
  const handlePayment = async () => {
    try {
      setLoading(true);

      // Request a payment method nonce using the payment instance
      const { nonce } = await instance.requestPaymentMethod();

      // Make a payment using the obtained nonce and cart details
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });

      setLoading(false);

      // Clear the cart and navigate to the order page after successful payment
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");

      // Display a success message
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="cart-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout !"
                    }`
                  : " Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-7 p-0 m-0">
              {cart?.map((p) => (
                <div className="row card flex-row" key={p._id}>
                  <div className="col-md-4">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      width="100%"
                      height={"130px"}
                    />
                  </div>
                  <div className="col-md-4">
                    <p>{p.name}</p>
                    <p>{p.description.substring(0, 30)}</p>
                    <p>Price : {p.price}</p>
                    <div className="quantity-control">
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => decrementQuantity(p._id)}
                      >
                        -
                      </button>
                      <span className="quantity">{p.quantity}</span>
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => incrementQuantity(p._id)}
                      >
                        +
                      </button>
                    </div>
                    <p>Total: {p.price * p.quantity}</p>
                  </div>
                  <div className="col-md-4 cart-remove-btn">
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-5 cart-summary">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total : {totalPrice()} </h4>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Please Login to checkout
                    </button>
                  )}
                </div>
              )}
              <div className="mt-2">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
