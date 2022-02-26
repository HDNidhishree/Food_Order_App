import React from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";

const Cart = (props) => {
	const cartItems = (
		<ul className={classes["cart-items"]}>
			{[
				{
					id: "c1",
					name: "Sushi",
					price: 12.99,
					quantity: 2,
				},
			].map((item) => (
				<li>{item.name}</li>
			))}
		</ul>
	);
	return (
		<Modal onClickCloseModal={props.onClickCloseModal}>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>56.99</span>
			</div>
			<div className={classes.actions}>
				<button
					className={classes["button--alt"]}
					onClick={props.onClickCloseModal}>
					Close
				</button>
				<button className={classes.button}> Place Order</button>
			</div>
		</Modal>
	);
};

export default Cart;
