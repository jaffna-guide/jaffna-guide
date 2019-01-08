import * as React from 'react';

import { Icon, Tooltip } from '../../atoms';
import { ReactComponent as Heart } from '../../../assets/heart.svg';

const Slide = ({ index, place, photo, onLike, authUser, authState }) => {
	let userLike;

	if (authUser) {
		userLike = photo.likes.find((like) => {
			const equality = like.user.displayName === authUser.displayName;
			return equality;
		});
	}

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
							<a href={`/auth/facebook?redirect=/${place.body}?photoId=${photo._id}`}>
								{photo.likes.length > 0 && <div className="carousel__love-count">{photo.likes.length}</div>}
								<Icon className="carousel__love-icon" icon={Heart} />
							</a>
						) : (
							<>
								{photo.likes.length > 0 && <div className="carousel__love-count">{photo.likes.length}</div>}
								<Icon
									className={`carousel__love-icon ${userLike ? 'carousel__love-icon--active' : ''}`}
									icon={Heart}
									onClick={() => onLike(place.body, photo._id)}
								/>
							</>
						)}
				</Tooltip>
			</div>
		</div>
	);
};

export default Slide;
