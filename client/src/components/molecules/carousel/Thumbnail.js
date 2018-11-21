import * as React from 'react';

const Thumbnail = ({ alt, src }) => {
	return (
		<figure>
			<img alt={alt} src={src} />
		</figure>
	);
};

export default Thumbnail;
