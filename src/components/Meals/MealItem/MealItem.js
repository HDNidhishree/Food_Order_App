import React, { useContext } from "react";
import CartContext from "../../../store/cart-context";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
	const price = `\u20B9${props.price.toFixed(2)}`;
	const cartCtx = useContext(CartContext);

	const handleAddToCart = (quantity) => {
		cartCtx.addItem({
			id: props.id,
			name: props.name,
			quantity: quantity,
			price: props.price,
		});
	};
	return (
		<li className={classes.meal}>
			<div>
				<h3>{props.name}</h3>
				<div className={classes.description}>{props.description}</div>
				<div className={classes.price}>{price}</div>
			</div>
			<div>
				<MealItemForm id={props.id} onAddToCart={handleAddToCart} />
			</div>
		</li>
	);
};

export default MealItem;
