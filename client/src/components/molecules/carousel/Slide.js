import * as React from 'react';

import { Icon, Tooltip } from '../../atoms';
import { ReactComponent as Heart } from '../../../assets/heart.svg';

const Slide = ({ index, name, photo, onLike, authUser, authState }) => {
	console.log('authState', authState);
	return (
		<div className="carousel__slide">
			<img alt="Slide" src={photo.watermarkedUrl} className="carousel__slide-image" />

			<div className="carousel__love">
				<Tooltip
					visible={authUser ? false : true}
					render={() => (authUser ? null : 'Login w/ Facebook to ❤️this photo.')}
				>
					{() =>
						!authUser && !authState.startsWith('pending') ? (
							<a href={`/auth/facebook?redirect=/${name}?n=${index + 1}`}>
								<Icon className="carousel__love-icon" icon={Heart} />
							</a>
						) : (
							<Icon className="carousel__love-icon" icon={Heart} onClick={onLike} />
						)}
				</Tooltip>
			</div>
		</div>
	);
};

export default Slide;
