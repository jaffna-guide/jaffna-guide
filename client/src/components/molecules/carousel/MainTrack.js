import * as React from 'react';

import Arrow from './Arrow';

const MainTrack = ({ children, prevSlide, nextSlide }) => {
	return (
		<div className="carousel-main-track__outer">
			<Arrow onClick={prevSlide} direction="left" />
			<div className="carousel-main-track__inner">{children}</div>
			<Arrow onClick={nextSlide} direction="right" />
		</div>
	);
};

export default MainTrack;
