import * as React from 'react';

import Slide from './Slide';
import SlideTrack from './SlideTrack';
import ThumbnailTrack from './ThumbnailTrack';
import Thumbnail from './Thumbnail';
import Wrapper from './Wrapper';

class Carousel extends React.Component {
	state = {
		currentImageIndex: 0,
	};

	prevSlide = () => {
		const { images } = this.props;
		const { currentImageIndex } = this.state;
		const lastIndex = images.length - 1;
		const shouldResetIndex = currentImageIndex === 0;
		const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;
		this.setState({ currentImageIndex: index }, () => {
			console.log('this.state.currentImageIndex', this.state.currentImageIndex);
		});
	};

	nextSlide = () => {
		const { images } = this.props;
		const { currentImageIndex } = this.state;
		const lastIndex = images.length - 1;
		const shouldResetIndex = currentImageIndex === lastIndex;
		const index = shouldResetIndex ? 0 : currentImageIndex + 1;
		this.setState({ currentImageIndex: index }, () => {
			console.log('this.state.currentImageIndex', this.state.currentImageIndex);
		});
	};

	render() {
		const { name, images } = this.props;
		return (
			<Wrapper>
				<ThumbnailTrack>
					{images.map((image, index) => (
						<Thumbnail key={image._id} alt={`${name} Thumbnail ${index + 1}`} src={image.thumbnail} />
					))}
				</ThumbnailTrack>
				<SlideTrack prevSlide={this.prevSlide} nextSlide={this.nextSlide}>
					{images.map((image, index) => (
						<Slide key={image._id} alt={`${name} ${index + 1}`} src={image.original} />
					))}
				</SlideTrack>
			</Wrapper>
		);
	}
}

export default Carousel;
