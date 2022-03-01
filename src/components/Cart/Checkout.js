import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";

const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
	const [formInputValidity, setFormInputValidity] = useState({
		name: true,
		street: true,
		city: true,
		postalCode: true,
	});

	const nameRef = useRef();
	const streetRef = useRef();
	const postalCodeRef = useRef();
	const cityRef = useRef();

	const confirmHandler = (event) => {
		event.preventDefault();

		const enteredName = nameRef.current.value;
		const enteredStreet = streetRef.current.value;
		const enteredPostalCode = postalCodeRef.current.value;
		const enteredCity = cityRef.current.value;

		const enteredNameIsValid = !isEmpty(enteredName);
		const enteredStreetIsValid = !isEmpty(enteredStreet);
		const enteredCityIsValid = !isEmpty(enteredCity);
		const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

		setFormInputValidity(() => {
			return {
				name: enteredNameIsValid,
				street: enteredStreetIsValid,
				city: enteredCityIsValid,
				postalCode: enteredPostalCodeIsValid,
			};
		});

		const formIsValid =
			enteredNameIsValid &&
			enteredStreetIsValid &&
			enteredCityIsValid &&
			enteredPostalCodeIsValid;

		if (!formIsValid) {
			return;
		}
		props.onConfirm({
			name: enteredName,
			city: enteredCity,
			street: enteredStreet,
			postalCode: enteredPostalCode,
		});
	};

	const nameControlClasses = `${classes.control} ${
		formInputValidity.name ? "" : classes.invalid
	}`;
	const streetControlClasses = `${classes.control} ${
		formInputValidity.street ? "" : classes.invalid
	}`;
	const cityControlClasses = `${classes.control} ${
		formInputValidity.city ? "" : classes.invalid
	}`;
	const postalCodeControlClasses = `${classes.control} ${
		formInputValidity.postalCode ? "" : classes.invalid
	}`;

	return (
		<form className={classes.form} onSubmit={confirmHandler}>
			<div className={nameControlClasses}>
				<label htmlFor="name">Your Name</label>
				<input type="text" id="name" ref={nameRef} />
				{!formInputValidity.name && <p>Please enter a valid name!!</p>}
			</div>
			<div className={streetControlClasses}>
				<label htmlFor="street">Street</label>
				<input type="text" id="street" ref={streetRef} />
				{!formInputValidity.street && <p>Please enter a valid street!!</p>}
			</div>
			<div className={postalCodeControlClasses}>
				<label htmlFor="postal">Postal Code</label>
				<input type="text" id="postal" ref={postalCodeRef} />
				{!formInputValidity.postalCode && (
					<p>Please enter a valid postalCode!!</p>
				)}
			</div>
			<div className={cityControlClasses}>
				<label htmlFor="city">City</label>
				<input type="text" id="city" ref={cityRef} />
				{!formInputValidity.city && <p>Please enter a valid city!!</p>}
			</div>
			<div className={classes.actions}>
				<button type="button" onClick={props.onCancel}>
					Cancel
				</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;
