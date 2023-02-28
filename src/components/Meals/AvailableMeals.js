import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

function AvailableMeals() {
  const [list, setList] = useState([]);
  const [isLoading,setIsLoading] = useState(true)
  const [httpError,setHttpError] = useState(null)
  useEffect(() => {
    setIsLoading(true)
    const fetchMeals = async () => {
      const response = await fetch(
        "https://food-order-app-bb949-default-rtdb.firebaseio.com/meals.json"
      );

      if(!response.ok){
        throw new Error('failed to fetch')
      }

      const responseData = await response.json();
      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setList(loadedMeals);
      setIsLoading(false)
    };

    fetchMeals().catch((error)=>{
    setIsLoading(false)
    setHttpError(error.message)
    });
  }, []);

  if(httpError){
    return <section className={classes.mealsError}>
    <p>{httpError}</p>
  </section>
  }
 
  if(isLoading){
    return<section className={classes.mealsLoading}>
      <p>Loading...</p>
    </section>
  }

  const meals = list.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{meals}</ul>
      </Card>
    </section>
  );
}

export default AvailableMeals;
