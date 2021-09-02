import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchMeals = async () => {
      const res = await fetch(
        "https://food-order-app-79783-default-rtdb.firebaseio.com/meals.json"
      );
      if (!res.ok) throw new Error("error");
      const data = await res.json();
      console.log(data);
      const loadedData = [];
      for (let key in data) {
        loadedData.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadedData);
      setLoading(false);
    };
    fetchMeals().catch((err) => {
      setLoading(false);
      setError(true);
    });
  }, []);
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  if (loading) {
    return <div className={classes.mealsLoading}>Loading...</div>;
  }
  if (error) {
    return <div className={classes.mealsLoading}>ERROR</div>;
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
