import * as React from 'react';

const Divider = () => {
	return (
		<div className="divider">
			<img
				className="divider__logo divider__logo--1"
				alt="Divider Logo 1"
				src="/logo.png"
			/>
			<img
        className="divider__logo divider__logo--2"
        alt="Divider Logo 2"
				src="/logo.png"
			/>
			<img
        className="divider__logo divider__logo--3"
        alt="Divider Logo 3"
				src="/logo.png"
			/>
		</div>
	);
};

export default Divider;
