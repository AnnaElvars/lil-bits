// // import React from 'react';
// // import Button from "../components/orderButton";
// // import { CardProps } from '../types/types';
// // export default function Card({ header, form }: CardProps) {
// //     return (
// //       <>
// //         <h3>{header}</h3>
// //         <form Form={Input} />
// //         <Button textButton={"Order"} linkHref={"/"} />
// //       </>
// //     );

// import React from "react";

// const OrderCard

// return
// <div className="bg-lime  border-opacity-30 shadow-lg border-2 border-solid border-kale rounded-lg text-center p-4">
//       <h1 className="text-2xl font-bold text-wine">Your Order</h1>
//       <div>

//       </div>
    
//      </div>

import React from "react";


const OrderCard = ({ text }) => {
  return (
    <div className="bg-lime border-opacity-30 shadow-lg border-2 border-solid border-kale rounded-lg text-center p-4">
      <h1 className="text-2xl font-bold text-wine">Your Order</h1>
      <p>{text}</p>
      {/* Other order details */}
      {/* ... */}
    </div>
  );
};

export default OrderCard;


// {/* <div className="bg-lime  border-opacity-30 shadow-lg border-2 border-solid border-kale rounded-lg text-center p-4">
//       <h1 className="text-2xl font-bold text-wine">Your Order</h1>
//       {currentOrder && <p>Your Email: {currentOrder.email}</p>}
//       {/* Email: {localStorage.getItem.enteredEmail} */}
//       <br/> */ }
