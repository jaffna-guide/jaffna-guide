import * as React from 'react';

const Slide = ({ src }) => {
	const style = {
		backgroundImage: `url(${src})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	};

	return (
		<div className="carousel-slide">
			<img alt="Slide" src={src} className="carousel-slide__image" />
		</div>
	);
};

export default Slide;
