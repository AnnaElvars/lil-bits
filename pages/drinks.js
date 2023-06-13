import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavMenu from "../components/nav";
import axios from "axios";
import { RoutingButton } from "../components/routingButton";

export default function SelectDrinks() {
  const [drinks, setDrinks] = useState([]);
  const [selectedDrinks, setSelectedDrinks] = useState([]);
  const setDrinkPrice = 499;

  const [count, setCount] = useState(1);
  const [drinkCount, setDrinkCount] = useState(0);

  const router = useRouter();
  const { dish, dishPrice, selectedMeal, dishCount } = router.query;

  const isBrowser = typeof window !== "undefined";

  const [enteredEmail, setEnteredEmail] = useState(() => {
    if (isBrowser) {
      const email = localStorage.getItem("enteredEmail");
      return email ? JSON.parse(email) : "";
    }
    return "";
  });

  const getDrinks = async () => {
    try {
      const result = await axios.get("https://api.punkapi.com/v2/beers");
      setDrinks(result.data);
    } catch (error) {
      console.error("Error fetching drinks:", error);
    }
  };

  const retrieveSelectedMeal = () => {
    const selectedDish = JSON.parse(localStorage.getItem(enteredEmail.dish));
    const dishCount = JSON.parse(localStorage.getItem(enteredEmail.dishCount));
  };
  useEffect(() => {
    getDrinks();
    retrieveSelectedMeal();
    if (selectedMeal && dishCount) {
      const [selectedDish, setSelectedDish] = useState(() => {
        const dish = localStorage.getItem("dish");
        return dish ? JSON.parse(dish) : "";
      });
      const [dishPriceCount, setDishPriceCount] = useState(() => {
        const dishPrice = localStorage.getItem("dishPrice");
        return dishPrice ? JSON.parse(dishPrice) : "";
      });
      setSelectedDish(selectedMeal);
      setDishPriceCount(parseInt(dishCount));
    }
  }, [selectedMeal, dishCount]);

  function selectDrink(item) {
    const drinkIndex = selectedDrinks.findIndex(
      (drink) => drink.id === item.id
    );

    if (drinkIndex !== -1) {
      const updatedSelectedDrinks = [...selectedDrinks];
      updatedSelectedDrinks[drinkIndex].drinkCount += 1;
      setSelectedDrinks(updatedSelectedDrinks);
    } else {
      setSelectedDrinks([...selectedDrinks, { ...item, drinkCount: 1 }]);
    }
  }

  const handleIncreaseCount = (drink) => {
    const updatedSelectedDrinks = [...selectedDrinks];
    const drinkIndex = updatedSelectedDrinks.findIndex(
      (item) => item.id === drink.id
    );

    if (drinkIndex !== -1) {
      updatedSelectedDrinks[drinkIndex].drinkCount += 1;
      setSelectedDrinks(updatedSelectedDrinks);
    }
  };

  const handleDecreaseCount = (drink) => {
    const updatedSelectedDrinks = [...selectedDrinks];
    const drinkIndex = updatedSelectedDrinks.findIndex(
      (item) => item.id === drink.id
    );

    if (drinkIndex !== -1 && updatedSelectedDrinks[drinkIndex].drinkCount > 0) {
      updatedSelectedDrinks[drinkIndex].drinkCount -= 1;
      setSelectedDrinks(updatedSelectedDrinks);
    }
  };

  const totalDrinksPrice = setDrinkPrice * drinkCount;

  const handleOrderClick = () => {
    const order = JSON.parse(localStorage.getItem(enteredEmail));
    const selectedMeal = JSON.parse(localStorage.getItem(enteredEmail.dish));
    const dishCount = JSON.parse(localStorage.getItem(enteredEmail.dishPrice));

    const totalDrinkCount = selectedDrinks.reduce(
      (total, drink) => total + drink.drinkCount,
      0
    );
    const drinkPrice = 499;
    const totalDrinkPrice = drinkPrice * totalDrinkCount;

    const updateOrder = {
      ...order,
      dish: order.dish,
      dishPrice: order.dishPrice,
      drinks: selectedDrinks,
      drinkPrice: `${drinkPrice} x ${totalDrinkCount} = ${totalDrinkPrice}`,
    };
    localStorage.setItem(enteredEmail, JSON.stringify(updateOrder));
    router.push("/order");
  };

  return (
    <main className="grid p-10 gap-4 grid-cols-2 lg:grid-cols-3 lg:gap-10 lg:px-24 lg:py-12">
      <NavMenu />
      <div className="bg-light lg:col-span-2">
        <div className="bg-white bg-opacity-50 border-opacity-30 shadow-lg border-2 border-solid border-kale rounded-lg text-center">
          <div className="text-center text-4xl text-wine font-bold p-8">
            Drink Selection
          </div>
          <div className="grid lg:grid-cols-5 gap-10 p-2">
            {drinks.map((item, index) => (
              <DrinkContainer
                key={index}
                drink={item}
                selectDrink={selectDrink}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white bg-opacity-50 border-opacity-30 shadow-lg border-2 border-solid border-kale rounded-lg text-center">
        <div className="h-80 p-8">
          <h2 className="text-4xl text-wine font-bold">Your Order</h2>
          <hr className="my-4" />
          <div>
            <div className="px-6">
              <div>
                <div className="font-semibold">
                  {" "}
                  {dish} x {dishPrice} kr.{" "}
                </div>
              </div>
              <hr className="my-4" />
            </div>
          </div>
          {selectedDrinks.map((drink) => (
            <div
              key={drink.id}
              className="flex justify-between items-center mb-2"
            >
              <div>
                <button
                  className="hover:text-wine text-kale rounded-full"
                  onClick={() => handleDecreaseCount(drink)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
                <button
                  className=" hover:text-wine text-kale rounded-full"
                  onClick={() => handleIncreaseCount(drink)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
              <div>
                {drink.drinkCount} x {drink.name}
              </div>
              <div>
                {drink.drinkCount} x {setDrinkPrice}
              </div>
            </div>
          ))}
        </div>
        <div> {totalDrinksPrice} </div>
        <div className="flex justify-center p-20 flex-nowrap">
          <div className="p-2">
            <RoutingButton text="ORDER" handleClick={handleOrderClick} />
          </div>
        </div>
      </div>
    </main>
  );
}

function DrinkContainer(props) {
  const { drink, selectDrink } = props;
  const drinkName = drink.name;
  const drinkImg = drink.image_url;

  return (
    <button
      className="hover:border-4 rounded-lg border-lime"
      onClick={() => selectDrink(drink)}
    >
      <div className="flex flex-col justify-center items-center">
        <img className="h-40" src={drinkImg} alt="" />
        <div className="text-md">{drinkName}</div>
        <div className="flex justify-center items-center"></div>
      </div>
    </button>
  );
}
