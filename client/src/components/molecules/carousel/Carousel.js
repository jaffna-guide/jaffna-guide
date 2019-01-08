import * as React from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import Slide from './Slide';
import SlideTrack from './SlideTrack';
import ThumbnailTrack from './ThumbnailTrack';
import Thumbnail from './Thumbnail';

@withRouter
class Carousel extends React.Component {
	constructor(props) {
		super(props);

		const { photos, location } = this.props;
		const query = queryString.parse(location.search);
		let currentPhotoIndex = 0;

		if (query.photoId) {
			currentPhotoIndex = photos.findIndex((p) => p._id === query.photoId);
		}

		this.state = { currentPhotoIndex };
	}

	prevSlide = () => {
		const { photos, history, location } = this.props;
		const { currentPhotoIndex } = this.state;
		const lastIndex = photos.length - 1;
		const shouldResetIndex = currentPhotoIndex === 0;
		const index = shouldResetIndex ? lastIndex : currentPhotoIndex - 1;
		this.setState({ currentPhotoIndex: index }, () => {
			const photoId = photos[this.state.currentPhotoIndex]._id;
			history.push({ pathname: location.pathname, search: `?photoId=${photoId}` });
		});
	};

	nextSlide = () => {
		const { photos, history, location } = this.props;
		const { currentPhotoIndex } = this.state;
		const lastIndex = photos.length - 1;
		const shouldResetIndex = currentPhotoIndex === lastIndex;
		const index = shouldResetIndex ? 0 : currentPhotoIndex + 1;
		this.setState({ currentPhotoIndex: index }, () => {
			const photoId = photos[this.state.currentPhotoIndex]._id;
			history.push({ pathname: location.pathname, search: `?photoId=${photoId}` });
		});
	};

	goToSlide = (index) => {
		const { photos, history, location } = this.props;
		this.setState({ currentPhotoIndex: index }, () => {
			const photoId = photos[this.state.currentPhotoIndex]._id;
			history.push({ pathname: location.pathname, search: `?photoId=${photoId}` });
		});
	};

	render() {
		const { place, photos, onLike, authUser, authState } = this.props;
		return (
			<div className="carousel">
				<SlideTrack
					prevSlide={this.prevSlide}
					nextSlide={this.nextSlide}
					currentPhotoIndex={this.state.currentPhotoIndex}
				>
					{photos.map((photo, index) => {
						return (
							<Slide
								key={photo._id}
								index={index}
								place={place}
								alt={`${place.name.en} ${index + 1}`}
								photo={photo}
								onLike={onLike}
								authUser={authUser}
								authState={authState}
							/>
						);
					})}
				</SlideTrack>
				<ThumbnailTrack>
					{photos.map((photo, index) => (
						<Thumbnail
							key={photo._id}
							alt={`${place.name.en} thumbnail ${index + 1}`}
							src={photo.thumbnailUrl}
							index={index}
							goToSlide={this.goToSlide}
						/>
					))}
				</ThumbnailTrack>
			</div>
		);
	}
}

export default Carousel;
