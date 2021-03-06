import Arrow from './Arrow';

import * as React from 'react';

class SlideTrack extends React.Component {
	state = {
		windowWidth: undefined,
	};

	handleResize = () =>
		this.setState({
			windowWidth: window.innerWidth,
		});

	componentDidMount() {
		this.handleResize();
		window.addEventListener('resize', this.handleResize);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	render() {
		const { children, prevSlide, nextSlide, currentPhotoIndex } = this.props;
		let innerStyle = {};

		const slideWidth = Math.min(1024, this.state.windowWidth);

		if (slideWidth) {
			const innerLeft = -1 * currentPhotoIndex * slideWidth;
			const innerWidth = React.Children.count(children) * slideWidth;

			innerStyle = {
				left: innerLeft,
				width: innerWidth,
			};
		}

		return (
			<div className="carousel__slide-track">
				<Arrow onClick={prevSlide} direction="left" />
				<div className="carousel__slide-track-inner" style={innerStyle}>
					{children}
				</div>
				<Arrow onClick={nextSlide} direction="right" />
			</div>
		);
	}
}

export default SlideTrack;
