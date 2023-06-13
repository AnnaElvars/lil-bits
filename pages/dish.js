import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavMenu from "../components/nav";
import axios from "axios";
import { RoutingButton } from "../components/routingButton";
import OrderCard from "../components/Card";

export default function SelectDish() {
  const router = useRouter();
  const [currentOrder, setCurrentOrder] = useState("");
  const [userHeader, setUserHeader] = useState("");
  const [selectedMeal, setSelectedMeal] = useState([]);
  const [meal, setMeal] = useState([]);
  const [dish, setDish] = useState({ dish: "" });
  const [dishCount, setDishCount] = useState(1);
  const [enteredEmail, setEnteredEmail] = useState(() => {
    const email = localStorage.getItem("enteredEmail");
    return email ? JSON.parse(email) : "";
  });
  // const parsedItem = JSON.parse(email);
  // return parsedItem || "";
  // });

  const [values, setValues] = useState("");

  const [drinkCount, setDrinkCount] = useState("");
  const [selectedDrinks, setSelectedDrinks] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [takeAway, setTakeAway] = useState(false);

  const [savedEmail, setSavedEmail] = useState("");
  const [savedDishCount, setSavedDishCount] = useState("");
  const [savedSelectedMeal, setSavedSelectedMeal] = useState("");

  useEffect(() => {
    //using local storage to get saved meal, saved email and email entered on home screen
    const savedSelectedMeal = JSON.parse(
      localStorage.getItem("savedSelectedMeal")
    );
    const order = localStorage.getItem(enteredEmail);
  });
 

  if (typeof window !== "undefined" && currentOrder && savedSelectedMeal) {
    const { savedEmail } = JSON.parse(enteredEmail);
    if (savedEmail === currentOrder) {
      setUserHeader("Same Order as last time?");
    }

    if (savedSelectedMeal) {
      const id = "lookup.php?i=" + savedSelectedMeal.idMeal;
      getMeal(id);
    } else {
      getMeal("random.php");
    }
  }
  // if (
  //   //upon entered email, if meal is saved in storage, else gets a random meal
  //   enteredEmail === savedEmail &&
  //   enteredEmail !== null &&
  //   savedSelectedMeal !== null
  // ) {

  // }, []);

  const getMeal = async (ending) => {
    //get random meal or saved meal from API
    let urlEnding = ending;
    const url = "https://www.themealdb.com/api/json/v1/1/";
    let totalUrl = url + urlEnding;
    const result = await axios(totalUrl);
    setMeal(result.data.meals[0]);
  };

  //sets selectedMeal to chosen meal
  function selectMeal() {
    setSelectedMeal(meal);
    localStorage.setItem("selectedMeal", JSON.stringify(meal));
    router.push("/SelectDrinks");
  }

  function getRandomMeal() {
    getMeal("random.php");
  }

  function handleClick() {
    setDishCount(dishCount + 1);
  }
  function handleClickDown() {
    if (dishCount > 1) {
      setDishCount(dishCount - 1);
    }
  }
  const dishPrice = 1990;
  const totalDishPrice = dishPrice * dishCount;

  function handleOrderClick() {
    // const email = localStorage.getItem(enteredEmail);
    const order = JSON.parse(localStorage.getItem(enteredEmail));

    const setSelectedMeal = meal.strMeal;
    const updateOrder = {
      // enteredEmail: "enteredEmail",
      // selectMeal: "meal.strMeal",
      // dishPrice: "dishCount",
      ...order,
      // enteredEmail: enteredEmail,
      dish: `${dishCount} x ${meal.strMeal}`,
      dishPrice: `${dishPrice} x ${dishCount} = ${totalDishPrice}`,
    };
    localStorage.setItem(enteredEmail, JSON.stringify(updateOrder));
    router.push("/drinks");
    // JSON.parse(localStorage.getItem("enteredEmail"))
    // if (order) {
    //   order[1] = order[1] + dishCount; // Update dish count
    //   order[2] = selectedMeal; // Update selected meal
    //   localStorage.setItem(email, JSON.stringify(order));
    // } else {
    //   const newOrder = [enteredmail, dishCount, selectedMeal, drinkCount, selectedDrinks];
    //   localStorage.setItem(email, JSON.stringify(newOrder));
    // }
    //   const newOrder = {
    //       ...order,
    //       "selectedMeal": `${dishCount} x ${selectedMeal}`,
    //       "dishPrice":`${dishPrice} x ${dishCount} = ${totalDishPrice}`
    // };
    // localStorage.setItem(JSON.stringify(email), JSON.stringify("selectedMeal"`${dishCount} x ${selectedMeal}`))
    // localStorage.setItem(JSON.stringify(email), JSON.stringify({dishPrice:`${dishPrice} x ${dishCount} = ${totalDishPrice}`}))
    //     ...order,
    //     count: dishCount,
    //     dish: `${dishCount} ${meal.strMeal}`,
    //     price: `${dishPrice} x ${dishCount} = ${totalDishPrice}`,
    //     drinks: [],
    //   };
    // localStorage.setItem(email, JSON.stringify(newOrder));
    router.push({
      pathname: "/drinks",
      query: {
        email: enteredEmail,
        dish: `${dishCount} x ${meal.strMeal}`,
        dishPrice: `${dishPrice} x ${dishCount} = ${totalDishPrice}`,
      },
    });
  }

  return (
    <main
      className={`grid p-10 gap-4 grid-cols-2 lg:grid-cols-3 lg:gap-10 lg:px-24 lg:py-12`}
    >
      <NavMenu />
      <div className=" now-wrap col-span-2">
        <div className="bg-white bg-opacity-50 border-opacity-30 shadow-lg border-2 border-solid border-kale rounded-lg text-center p-4">
          <div className="text-wine font-bold text-4xl pt-4">
            Select Your Dish
          </div>
          <p className="text-kale font-semibold pb-4">
            When you have decided on a dish, please confirm your count and order
          </p>
          <div>
            <div className=" flex justify-center">
              <img
                className="rounded-lg"
                src={meal.strMealThumb}
                width="450"
                alt=""
              ></img>
            </div>
            <div className="font-bold text-2xl">{meal.strMeal}</div>
            <div className="text-md">
              Ingredients:{" "}
              {meal.strIngredient1 +
                ", " +
                meal.strIngredient2 +
                ", " +
                meal.strIngredient3}
            </div>
          </div>
          <div className="p-4">
            <button
              className=" px-2 border-2 border-kale border-opacity-40 bg-bakgrunn text-xl rounded-lg font-bold text-kale hover:bg-kale hover:text-lime hover:border-wine "
              onClick={getRandomMeal}
            >
              NEXT MEAL
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white bg-opacity-50 shadow-lg border-2 border-solid border-lime rounded-lg text-center">
        <div className="h-80 p-8">
          <h2 className="text-4xl text-wine font-bold">Your Order</h2>
          <hr className="my-4" />
          {/* Email: {localStorage.getItem("email")} */}
          <div className="">
            <div className="text-lg font-semibold">
              {dishCount} x {meal.strMeal}
            </div>
            <div className="">
              <button
                className="hover:text-wine text-kale rounded-full"
                onClick={handleClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-8 h-8"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
              <button
                className="hover:text-wine font-bold text-kale"
                onClick={handleClickDown}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-8 h-8"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
              <p className=""> Please Select Quantity</p>
              {/* <div> {dishPrice} kr</div> */}
              <div>
                {" "}
                {dishCount} x {dishPrice} kr = {totalDishPrice} kr
              </div>
              <div className="p-4">
                <RoutingButton
                  text="ORDER"
                  handleClick={handleOrderClick}
                  // route="/drinks"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
