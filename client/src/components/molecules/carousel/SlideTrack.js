import Arrow from './Arrow';

import * as React from 'react';

class SlideTrack extends React.Component {
	render() {
		const { children, prevSlide, nextSlide, currentImageIndex } = this.props;

		const slideWidth = Math.min(1024, window.innerWidth);
		const innerLeft = -1 * currentImageIndex * slideWidth;
		const innerWidth = React.Children.count(children) * slideWidth;

		const innerStyle = {
			left: innerLeft,
			width: innerWidth,
		};

		return (
			<div className="carousel-slide-track__outer">
				<Arrow onClick={prevSlide} direction="left" />
				<div className="carousel-slide-track__inner" style={innerStyle}>
					{children}
				</div>
				<Arrow onClick={nextSlide} direction="right" />
			</div>
		);
	}
}

export default SlideTrack;
