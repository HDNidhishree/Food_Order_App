import React, { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
	const quantityRef = useRef();
	const [quantityIsValid, setQuantityIsValid] = useState(true);

	const handleOnSubmit = (event) => {
		event.preventDefault();
		const enteredQuantity = quantityRef.current.value.toString();
		const enteredQuantityNumber = parseInt(enteredQuantity);
		if (
			enteredQuantity.trim().length === 0 ||
			enteredQuantityNumber < 1 ||
			enteredQuantityNumber > 5
		) {
			setQuantityIsValid(false);
			return;
		}
		props.onAddToCart(enteredQuantityNumber);
	};

	return (
		<form className={classes.form} onSubmit={handleOnSubmit}>
			<Input
				label="Quantity"
				ref={quantityRef}
				input={{
					id: "quantity_" + props.id,
					type: "number",
					min: "1",
					max: "5",
					step: "1",
					defaultValue: "1",
				}}
			/>
			<button>+Add</button>
			{!quantityIsValid && <p>Please enter a valid amount(1-5)</p>}
		</form>
	);
};

export default MealItemForm;
