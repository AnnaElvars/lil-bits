import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NavMenu from "../components/nav";
import Link from "next/link";

export default function ReceiptScreen() {
  return (
    <main
      className={`grid p-10 gap-4 grid-cols-2 lg:grid-cols-3 lg:gap-10 lg:px-24 lg:py-12`}
    >
      <NavMenu />
      <div className="flex  bg-white bg-opacity-50 border-opacity-30 shadow-lg border-2 border-solid border-kale rounded-lg text-center">
        <h1 className="text-4xl text-wine font-bold p-4">
          YOU HAVE COMPLETED YOUR ORDER{" "}
        </h1>
      </div>

      {/* <div className="now-wrap bg-white bg-opacity-50 border-opacity-30 shadow-lg border-2 border-solid border-kale rounded-lg text-center">
      <h1 className="text-4xl text-wine font-bold p-4">
          Alter Your Order
        </h1>
        <div> <Link href="./" className="bg-kale rounded border-2 border-wine px-1 self-center text-lime text-xl font-bold h-8 hover:bg-white hover:text-wine ">
             Change Dish 
          </Link>

          <Link href="./" className="bg-kale rounded border-2 border-wine px-1 self-center text-lime text-xl font-bold h-8 hover:bg-white hover:text-wine ">
             Change Drinks
          </Link>
          <Link href="./" className="bg-kale rounded border-2 border-wine px-1 self-center text-lime text-xl font-bold h-8 hover:bg-white hover:text-wine ">
             Change Date and Time
          </Link>
          </div>
          <Link href="./" className="bg-kale rounded border-2 border-wine px-1 self-center text-lime text-xl font-bold h-8 hover:bg-white hover:text-wine ">
             Make 
          </Link>
      </div> */}
    </main>
  );
}
