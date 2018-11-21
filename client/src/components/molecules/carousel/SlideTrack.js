import Arrow from './Arrow';

import * as React from 'react'

class SlideTrack extends React.Component {
	render() {
		const { children, prevSlide, nextSlide } = this.props;
		return (
			<div className="carousel-main-track__outer">
				<Arrow onClick={prevSlide} direction="left" />
				<div className="carousel-main-track__inner">{children}</div>
				<Arrow onClick={nextSlide} direction="right" />
			</div>
		);
	}
}

export default SlideTrack
