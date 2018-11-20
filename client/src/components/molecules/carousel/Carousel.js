import * as React from 'react';

import Slide from './Slide';
import Arrow from './Arrow';
import MainTrack from './MainTrack';
import ThumbnailTrack from './ThumbnailTrack';

class Carousel extends React.Component {
	state = {
		currentImageIndex: 0,
	};

	prevSlide = () => {
		const { children } = this.props;
		console.log('children', children);
		const { currentImageIndex } = this.state;
		const lastIndex = React.Children.count(children) - 1;
		const shouldResetIndex = currentImageIndex === 0;
		const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;
		this.setState({ currentImageIndex: index });
	};

	nextSlide = () => {
		const { children } = this.props;
		const { currentImageIndex } = this.state;
		const lastIndex = React.Children.count(children) - 1;
		const shouldResetIndex = currentImageIndex === lastIndex;
		const index = shouldResetIndex ? 0 : currentImageIndex + 1;
		this.setState({ currentImageIndex: index });
	};

	render() {
		const EnhancedMainTrack = React.cloneElement(MainTrack, {
			prevSlide: this.prevSlide,
			nextSlide: this.nextSlide,
		});

		return (
			<div className="carousel">
				{this.props.children({ Slide, Arrow, MainTrack: EnhancedMainTrack, ThumbnailTrack })}
			</div>
		);
	}
}

export default Carousel;
