import { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [isSubmit, setIssubmit] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const submitOrder = async (val) => {
    setIssubmit(true);
    await fetch(
      "https://food-order-app-79783-default-rtdb.firebaseio.com/order.json",
      {
        method: "post",
        body: JSON.stringify({
          user: val,
          orderdItems: cartCtx.items,
        }),
      }
    );
    setIssubmit(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };
  const order = () => {
    setIsCheckOut(true);
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckOut && <Checkout onconfirm={submitOrder} />}
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && !isCheckOut && (
          <button className={classes.button} onClick={order}>
            Order
          </button>
        )}
      </div>
    </>
  );
  const isSubmittingModalContent = <p>sending order data...</p>;
  const success = <p>Congrats your order has been placed🌟</p>;
  return (
    <Modal onClose={props.onClose}>
      {!isSubmit && !didSubmit && cartModalContent}
      {isSubmit && isSubmittingModalContent}
      {!isSubmit && didSubmit && success}
    </Modal>
  );
};

export default Cart;
