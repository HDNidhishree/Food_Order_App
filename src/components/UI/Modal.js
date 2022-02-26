import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
	return <div className={classes.backdrop} onClick={props.onClickCloseModal} />;
};
const ModalOverlay = (props) => {
	return (
		<div className={classes.modal}>
			<div className={classes.content}> {props.children} </div>
		</div>
	);
};

const portalLocation = document.getElementById("overlays");

const Modal = (props) => {
	return (
		<Fragment>
			{ReactDOM.createPortal(
				<Backdrop onClickCloseModal={props.onClickCloseModal} />,
				portalLocation
			)}
			{ReactDOM.createPortal(
				<ModalOverlay> {props.children} </ModalOverlay>,
				portalLocation
			)}
		</Fragment>
	);
};

export default Modal;
