import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NavMenu from "../components/nav";
import CalendarPick from "../components/datePicker.js";
import { RoutingButton } from "../components/routingButton";

export const Checkbox = ({ onChange }) => {
  return (
    <div className="p-4">
      <input type="checkbox" id="checkbox" onChange={onChange} />
      <label htmlFor="checkbox">Take Away</label>
    </div>
  );
};

export default function Order() {
  const [orderInfo, setOrderInfo] = useState({});
  const [takeAway, setTakeAway] = useState(false);
  const router = useRouter();
  const { dish, dishPrice, selectedMeal, dishCount } = router.query;
  const [selectedDateTime, setSelectedDateTime] = useState();
  // const [selectedDateTime, setSelectedDateTime] = useState(() => {
  //   const storedDateTime = localStorage.getItem("selectedDateTime");
  //   return storedDateTime ? new Date(storedDateTime) : "null";
  // });

  const isBrowser = typeof window !== "undefined";

  const [enteredEmail, setEnteredEmail] = useState(() => {
    if (isBrowser) {
      const email = localStorage.getItem("enteredEmail");
      return email ? JSON.parse(email) : "";
    }
    return "";
  });

  const isCheckboxChecked = (event) => {
    setTakeAway(event.target.checked);
  };

  // useEffect(() => {
  //     localStorage.setItem("takeAway", JSON.stringify(takeAway));
  // }, [takeAway]);

  const handleOrderClick = () => {
    // const email = localStorage.getItem("currentOrder");
    const order = JSON.parse(localStorage.getItem(enteredEmail)) || {};

    const updateOrder = {
      ...order,
      dish: order.dish,
      dishPrice: order.dishPrice,
      drinks: order.drinks,
      drinkPrice: order.drinkPrice,
      date: selectedDateTime,
      takeAway: takeAway,
    };
    localStorage.setItem(enteredEmail, JSON.stringify(updateOrder));
    router.push("/receipt");
  };

  useEffect(() => {
    const email = localStorage.getItem(enteredEmail);
    const { dishCount, dish, dishPrice, drinkPrice, drinks, totalDrinkPrice } =
      router.query;
    const order = JSON.parse(localStorage.getItem(enteredEmail)) || {};
    setOrderInfo(order);
  }, []);

  return (
    <main
      className={`grid p-10 gap-4 grid-cols-2 lg:grid-cols-3 lg:gap-10 lg:px-24 lg:py-12`}
    >
      <NavMenu />
      <div className="now-wrap col-span-2 bg-white bg-opacity-60 border-opacity-30 shadow-lg border-2 border-solid border-kale rounded-lg text-center">
        <h1 className="text-4xl text-wine font-bold p-8">
          Select Date and Time
        </h1>
        <div>
          <CalendarPick
            selectedDateTime={selectedDateTime}
            handleDateTimeChange={setSelectedDateTime}
          />
        </div>
        <div className="">
          <p className=" p-2 lg:px-32 pt-4">
            The Selected Date and Time is considered a table booking, unless you
            select Take Away, in which case you may pick up your order at your
            selected time.
          </p>
          <Checkbox onChange={isCheckboxChecked} />
        </div>
        <div className="pb-6">
          <RoutingButton text="ORDER" handleClick={handleOrderClick} />
        </div>
      </div>

      <div className="now-wrap bg-white bg-opacity-50 border-opacity-30 shadow-lg border-2 border-solid border-kale rounded-lg text-center">
        <div className="h-80 p-8">
          <h2 className="text-4xl text-wine font-bold">Your Order</h2>
          <hr className="my-4" />
          <div className="text-left px-8">
            <strong>Email: {orderInfo.enteredEmail}</strong>
            <p>{orderInfo.dish}, </p>
            <p>{orderInfo.dishPrice} kr.</p>
            {/* <p>{orderInfo.[drinks]}</p> */}
            {/* NÆ EKKI AÐ SETJA INN ORDERINFO.DRINKS.NAME, id,  */}
            <p>Drinks: {orderInfo.drinkPrice} kr.</p>
            <hr className="my-4" />
            <div>{setSelectedDateTime}</div>
            <p>Date: {selectedDateTime ? selectedDateTime.toString() : ""}</p>
            <strong>
              Time: {selectedDateTime ? selectedDateTime.toString() : ""}
            </strong>
            <p>
              Date: {selectedDateTime ? selectedDateTime.toDateString() : ""}
            </p>
            <strong>
              Time:{" "}
              {selectedDateTime ? selectedDateTime.toLocaleTimeString() : ""}
            </strong>
          </div>
        </div>
      </div>
    </main>
  );
}

// import React from 'react';
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';

// export default () => (
//   <Popup trigger={<button> ORDER </button>} position="right center">
//     <div>YOU HAVE COMPLETED YOUR ORDER</div>
//   </Popup>
// );

