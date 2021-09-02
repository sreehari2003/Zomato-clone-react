import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";
export default function Checkout(props) {
  const [valid, setValid] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });
  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();

  //helper function for form validating
  const isEmpty = (val) => {
    return val.trim() === "";
  };
  //   const isFiveChars = (val) => {
  //     return val.trim().length >= 5;
  //   };

  const orderFood = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const postal = postalRef.current.value;
    const street = streetRef.current.value;
    const city = cityRef.current.value;

    const nameIsvalid = !isEmpty(name);
    const postalIsvalid = true;
    const streetIsvalid = !isEmpty(street);
    const cityIsvalid = !isEmpty(city);
    console.log(nameIsvalid);

    setValid({
      name: nameIsvalid,
      street: streetIsvalid,
      city: cityIsvalid,
      postal: postalIsvalid,
    });
    const formIsValid =
      nameIsvalid && postalIsvalid && streetIsvalid && cityIsvalid;

    if (!formIsValid) {
      return;
    }
    props.onconfirm({
      name,
      street,
      city,
      postal,
    });
  };

  return (
    <div className={classes.ovf}>
      <form onSubmit={orderFood}>
        <div className={classes.control}>
          <label htmlFor="name">name</label>
          <input type="text" id="name" ref={nameRef} />
          {!valid.name && (
            <p className={classes.err}>please enter valid name</p>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="street">Street</label>
          <input type="text" id="street" ref={streetRef} />
          {!valid.street && (
            <p className={classes.err}> please enter valid street name</p>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="postal">Postal Code</label>
          <input type="text" id="postal" ref={postalRef} />
          {!valid.postal && (
            <p className={classes.err}>
              please enter valid Postal code 5 char long
            </p>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="city">City</label>
          <input type="text" id="city" ref={cityRef} />
          {!valid.city && (
            <p className={classes.err}>please enter valid city name</p>
          )}
        </div>
        <button type="submit" className={classes.orderbtn}>
          Order
        </button>
      </form>
    </div>
  );
}
