import React, { Fragment, useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
	const [isCheckout, setIsCheckout] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);

	const cartCtx = useContext(CartContext);

	const totalAmount = `\u20B9${cartCtx.totalAmount.toFixed(2)}`;
	const hasItems = cartCtx.items.length > 0;

	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};

	const cartItemAddHandler = (item) => {
		cartCtx.addItem({ ...item, quantity: 1 });
	};

	const handleOrderBtnClick = (event) => {
		setIsCheckout(true);
	};

	const submitOrderHandler = async (userData) => {
		setIsSubmitting(true);
		await fetch(
			"https://react-http-app-10d6a-default-rtdb.firebaseio.com/orders.json",
			{
				method: "POST",
				body: JSON.stringify({ user: userData, orderedItems: cartCtx.items }),
			}
		);

		setIsSubmitting(false);
		setDidSubmit(true);
		cartCtx.clearCart();
	};

	const cartItems = (
		<ul className={classes["cart-items"]}>
			{cartCtx.items.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					quantity={item.quantity}
					price={item.price}
					onAdd={cartItemAddHandler.bind(null, item)}
					onRemove={cartItemRemoveHandler.bind(null, item.id)}
				/>
			))}
		</ul>
	);

	const modalActions = (
		<div className={classes.actions}>
			<button
				className={classes["button--alt"]}
				onClick={props.onClickCloseModal}>
				Close
			</button>
			{hasItems && (
				<button className={classes.button} onClick={handleOrderBtnClick}>
					Place Order
				</button>
			)}
		</div>
	);

	const cartModalContent = (
		<Fragment>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>

			{isCheckout && (
				<Checkout
					onCancel={props.onClickCloseModal}
					onConfirm={submitOrderHandler}
				/>
			)}
			{!isCheckout && modalActions}
		</Fragment>
	);

	const isSubmittingModalContent = <p>Sending ordered data.....</p>;

	const didSubmitModalContent = (
		<Fragment>
			<p>Thank you placing your order!!!</p>
			<div className={classes.actions}>
				<button className={classes.button} onClick={props.onClickCloseModal}>
					Close
				</button>
			</div>
		</Fragment>
	);

	return (
		<Modal onClickCloseModal={props.onClickCloseModal}>
			{!isSubmitting && !didSubmit && cartModalContent}
			{isSubmitting && isSubmittingModalContent}
			{!isSubmitting && didSubmit && didSubmitModalContent}
		</Modal>
	);
};

export default Cart;
