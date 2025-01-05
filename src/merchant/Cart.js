import { useEffect, useState } from "react";

function Cart() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState("");

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     setUser(storedUser.replace(/"/g, ""));
  //   }
  // }, []);

  // useEffect(() => {
  //   if (user) {
  //     console.log("User ID is set:", user);
  //     getCart();
  //   } else {
  //     console.log("User ID is not set yet");
  //   }
  // }, [user]);

  // const getCart = () => {
  //   console.log(`Fetching cart data for user_id=${user}`);
  //   fetch(`http://ecommerce.reworkstaging.name.ng/v2/carts?user_id=${user}`)
  //     .then((resp) => {
  //       if (!resp.ok) {
  //         throw new Error(`HTTP error! status: ${resp.status}`);
  //       }
  //       return resp.json();
  //     })
  //     .then((data) => {
  //       console.log("Fetched cart data:", data);
  //       setCart(Array.isArray(data) ? data : []);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching cart data:", error);
  //       setCart([]);
  //     });
  // };
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser.replace(/"/g, ""));
    }
  }, []);
  useEffect(() => {
    if (user) {
      fetch(`http://ecommerce.reworkstaging.name.ng/v2/carts?user_id=${user}`)
        .then((resp) => resp.json())
        .then((data) => {
          setCart(data.product);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [user]);
  console.log(user)


  const increaseCartItem = (item) => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        cartItem.quantity += 1;
        cartItem.totalPrice = cartItem.price * cartItem.quantity;
      }
      return cartItem;
    });
    setCart(updatedCart);
    localStorage.setItem("perkins", JSON.stringify(updatedCart));
  };

  const decreaseCartItem = (item) => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === item.id && cartItem.quantity > 1) {
        cartItem.quantity -= 1;
        cartItem.totalPrice = cartItem.price * cartItem.quantity;
      }
      return cartItem;
    });
    setCart(updatedCart);
    localStorage.setItem("perkins", JSON.stringify(updatedCart));
  };

  const grandTotal = cart && cart.length > 0 ? cart.map((item) => item.totalPrice).reduce((a, b) => a + b, 0) : 0;

  return (
    <div>
      <div className="page">
        <div className="header">
          <h2>Cart</h2>
        </div>
        <div className="cart_items">
          {cart && cart.length > 0 ? (
            <div>
              <h3 className="grand_total">Grand Total: ₦{grandTotal}</h3>
              {cart.map((item) => (
                <div className="cart_item" key={item.id}>
                  <img src={item.img} alt="Cart-Image" />
                  <div className="cart_details">
                    <h2>{item.name}</h2>
                    <h5>Initial Price: ₦{item.price}</h5>
                    <div className="cart_item_btns">
                      <button onClick={() => decreaseCartItem(item)}>-</button>
                      <p>{item.quantity}</p>
                      <button onClick={() => increaseCartItem(item)}>+</button>
                    </div>
                    <h4>Total Price: ₦{item.totalPrice}</h4>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No item currently in cart</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;


