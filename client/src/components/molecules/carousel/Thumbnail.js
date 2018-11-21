import * as React from 'react';

const Thumbnail = ({ alt, src, goToSlide, index }) => {
	return (
		<figure className="carousel-thumbnail" onClick={() => goToSlide(index)}>
			<img alt={alt} src={src} />
		</figure>
	);
};

export default Thumbnail;
