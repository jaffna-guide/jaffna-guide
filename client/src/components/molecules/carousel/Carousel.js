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
		const { photos } = this.props;
		const { currentImageIndex } = this.state;
		const lastIndex = photos.length - 1;
		const shouldResetIndex = currentImageIndex === 0;
		const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;
		this.setState({ currentImageIndex: index });
	};

	nextSlide = () => {
		const { photos } = this.props;
		const { currentImageIndex } = this.state;
		const lastIndex = photos.length - 1;
		const shouldResetIndex = currentImageIndex === lastIndex;
		const index = shouldResetIndex ? 0 : currentImageIndex + 1;
		this.setState({ currentImageIndex: index });
	};

	goToSlide = (index) => {
		this.setState({ currentImageIndex: index });
	};

	render() {
		const { name, photos } = this.props;
		return (
			<Wrapper>
				<SlideTrack
					prevSlide={this.prevSlide}
					nextSlide={this.nextSlide}
					currentImageIndex={this.state.currentImageIndex}
				>
					{photos.map((photo, index) => {
						return <Slide key={photo._id} alt={`${name} ${index + 1}`} src={photo.originalUrl} />;
					})}
				</SlideTrack>
				<ThumbnailTrack>
					{photos.map((photo, index) => (
						<Thumbnail
							key={photo._id}
							alt={`${name} Thumbnail ${index + 1}`}
							src={photo.thumbnailUrl}
							index={index}
							goToSlide={this.goToSlide}
						/>
					))}
				</ThumbnailTrack>
			</Wrapper>
		);
	}
}

export default Carousel;
