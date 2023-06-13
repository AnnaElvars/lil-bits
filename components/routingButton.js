import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";

export function RoutingButton({ route, handleClick, text }) {
  const onClick = () => {
    handleClick();
  };
  return (
    <button
      className=" px-2 border-2 border-kale border-opacity-40 bg-bakgrunn text-xl rounded-lg font-bold text-kale hover:bg-kale hover:text-lime hover:border-wine "
      onClick={onClick}
    >
      {text}
    </button>
  );
}
