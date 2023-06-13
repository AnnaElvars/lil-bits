import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import NavMenu from "../../components/nav";
import { RoutingButton } from "../../components/routingButton";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

export default function HomePage() {
  const Slider = () => (
    <AwesomeSlider className="h-auto border-2 border-kale border-opacity-30 shadow-lg rounded-lg">
      <div className="max-h-fit max-w-fit">
        <img className="rounded-lg" src="./lilBitsSalat.png" />
      </div>
      <div>
        <img className="rounded-lg" src="./lilBitsCake.png" />
      </div>
      <div>
        <img src="./lilBitsSoup.png" />
      </div>
    </AwesomeSlider>
  );

  const router = useRouter();
  const [values, setValues] = useState([]);
  const [errors, setErrors] = useState("");
  const [dishPrice, setDishPrice] = useState("");
  const [selectedMeal, setSelectedMeal] = useState([]);
  const [drinkPrice, setDrinkPrice] = useState("");
  const [selectedDrinks, setSelectedDrinks] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [takeAway, setTakeAway] = useState(false);

  const savedEmail = "";
  const savedDishCount = "";
  const savedDrinkCount = "";
  const savedSelectedDrinks = "";
  const savedSelectedMeal = "";

  useEffect(() => {
    localStorage.setItem("enteredEmail", JSON.stringify(values.email));
  }, [values.email]);
  const validateEmail = () => {
    const validationErrors = {};

    if (!isEmail(values.email)) {
      validationErrors.email = "Invalid Email";
    }
    setErrors(validationErrors);

    if (!Object.keys(validationErrors).length) {
      const enteredEmail = values.email;
      const previousOrder = localStorage.getItem(enteredEmail);


      if (previousOrder) {
        console.log("bla");
      } else {
        localStorage.setItem(enteredEmail, JSON.stringify({ enteredEmail }));
      }

      router.push({
        pathname: "/dish",
        query: {
          email: enteredEmail,
        },
      });
    }
  };

  const setEmail = (e) => {
    setValues((values) => ({ ...values, email: e.target.value }));
  };

  return (
    <main className="grid p-10 gap-4 grid-cols-2 lg:grid-cols-3 lg:gap-10 lg:px-24 lg:py-12">
      <NavMenu />
      <div className="col-span-2">
        <Slider />
      </div>
      <div className="p-8 bg-white bg-opacity-50  border-opacity-30 shadow-lg border-2 border-solid border-kale rounded-lg text-center origin-">
        <h2 className="text-4xl text-wine font-bold">Place Your Order</h2>
        <hr className="my-4" />
        If you would like to make a new order or continue with an order, please
        enter your Email
        <div className="">
          <label htmlFor="values.email"></label>
          <input
            type="text"
            value={values.email}
            className=" border-2 border-solid rounded-lg p-2 bg-white border-lime placeholder-wine"
            placeholder="Email"
            onChange={setEmail}
          />
          <div className="p-4">
            <RoutingButton text="ORDER" handleClick={validateEmail} />
            <div>
              {errors.email && (
                <div>
                  {Object.entries(errors).map(([key, error]) => (
                    <span
                      className="font-bold text-kale"
                      key={`${key}: ${error}`}
                    >
                      {error}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-lime p-4 col-span-1 border-2 border-opacity-30 shadow-lg border-kale rounded-lg text-xl text-center">
        <div className="p-2">
          <h1 className="text-wine text-3xl font-bold">LIL BITS</h1>
          <br></br>
          <h2 className="text-2xl font-semibold">
            Opening Hours are Weekdays from 16:00 - 23:00
          </h2>
          <br></br>
          If you have any questions or inquiries, please contact us
        </div>
      </div>

      <div className="p-4 bg-white bg-opacity-50 col-span-2 border-2 border-opacity-30 shadow-lg border-kale rounded-lg">
        <h1 className="text-2xl py-2 px-4 font-semibold">Contact Us</h1>
        <form>
          <div className="flex-nowrap grid grid-cols-2 col-span-2">
            <div className="p-2">
              <label htmlFor="first-name"></label>
              <input
                type="text"
                id="name1"
                className="bg-green border border-solid border-lime rounded-lg block w-full p-2 placeholder-wine"
                placeholder="First Name"
              />
            </div>
            <div className="p-2">
              <label htmlFor="last-name"></label>
              <input
                type="text"
                id="name2"
                className="bg-white border border-solid border-lime rounded-lg block w-full p-2 placeholder-lime"
                placeholder="Last Name"
              />
            </div>

            <div className="p-2">
              <label htmlFor="email"></label>
              <input
                type="text"
                id="email"
                className="bg-white border border-solid border-lime rounded-lg block w-full p-2 placeholder-lime"
                placeholder="Email"
              />
            </div>

            <div className="p-2">
              <label htmlFor="type"></label>

              <select
                id="type"
                className="bg-white border border-solid border-lime text-lime rounded-lg block w-full p-2"
              >
                <option value="request">General request</option>
                <option value="office">Office</option>
              </select>
            </div>
          </div>
          <div className="p-2">
            <label htmlFor="inquire"></label>
            <textarea
              id="inquire"
              className="bg-white border border-solid border-lime rounded-lg block w-full p-2 placeholder-lime"
              placeholder="Inquire"
            ></textarea>
          </div>
          <div className="p-2">
            <button className=" bg-white border-2 border-lime text-red-600 block w-full p-1 px-4 rounded-lg">
              SEND INQUIRE
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
