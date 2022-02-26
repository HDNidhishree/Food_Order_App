import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
	const [isCartBtnHighlighted, setCartBtnHighlighted] = useState(false);
	const cartCtx = useContext(CartContext);
	const { items } = cartCtx;

	const numberOfCartItems = items.reduce((currentNumber, item) => {
		return currentNumber + item.quantity;
	}, 0);

	const buttonClasses = `${classes.button} ${
		isCartBtnHighlighted ? classes.bump : ""
	}`;

	useEffect(() => {
		if (items.length === 0) return;
		setCartBtnHighlighted(true);

		const timer = setTimeout(() => {
			setCartBtnHighlighted(false);
		}, 300);

		return () => clearTimeout(timer);
	}, [items]);

	return (
		<button className={buttonClasses} onClick={props.onClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={classes.badge}>{numberOfCartItems}</span>
		</button>
	);
};

export default HeaderCartButton;
