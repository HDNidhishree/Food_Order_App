import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
	const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [httpError, setHttpError] = useState(null);

	useEffect(() => {
		const fetchMeals = async () => {
			setIsLoading(true);
			const response = await fetch(
				"https://react-http-app-10d6a-default-rtdb.firebaseio.com/meals.json"
			);
			if (!response.ok) {
				throw new Error("Something went wrong!!!");
			}
			const data = await response.json();
			const loadedMeals = [];
			for (let key in data) {
				loadedMeals.push({
					id: key,
					...data[key],
				});
			}
			setMeals(() => loadedMeals);
			setIsLoading(false);
		};

		fetchMeals().catch((error) => {
			setHttpError(error.message);
			setIsLoading(false);
		});
	}, []);

	if (isLoading) {
		return (
			<section className={classes.mealsLoading}>
				<p>Loading...</p>
			</section>
		);
	}

	if (httpError) {
		return (
			<section className={classes.mealsError}>
				<p>{httpError}</p>
			</section>
		);
	}
	const mealsList = meals.map((meal) => (
		<MealItem
			key={meal.id}
			price={meal.price}
			description={meal.description}
			name={meal.name}
			id={meal.id}
		/>
	));
	return (
		<section className={classes.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;
