import * as React from 'react';

const Slide = ({ url }) => {
	const style = {
		backgroundImage: `url(${url})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	};

	return (
		<div className="carousel-slide">
			<div className="carousel-slide__image" style={style} />
		</div>
	);
};

export default Slide;
