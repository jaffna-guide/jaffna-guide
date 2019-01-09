import * as React from 'react';

import { Icon, Tooltip } from '../../atoms';
import { ReactComponent as Heart } from '../../../assets/heart.svg';
import LoverList from './LoverList';

const Slide = ({ index, place, photo, onLike, authUser, authState, showLikes, hideLikes, likesVisible }) => {
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
				{!authUser && !authState.startsWith('pending') ? (
					<>
						{photo.likes.length > 0 && (
							<div className="carousel__love-count" onClick={showLikes}>
								{photo.likes.length}
							</div>
						)}
						{likesVisible && <LoverList photo={photo} hideLikes={hideLikes} />}
						<Tooltip
							visible={authUser ? false : true}
							render={() => (authUser ? null : 'Login w/ Facebook to ❤️this photo.')}
						>
							{() => (
								<a href={`/auth/facebook?redirect=/${place.body}?photoId=${photo._id}`}>
									<Icon className="carousel__love-icon" icon={Heart} />
								</a>
							)}
						</Tooltip>
					</>
				) : (
					<>
						{photo.likes.length > 0 && (
							<div className="carousel__love-count" onClick={showLikes}>
								{photo.likes.length}
							</div>
						)}
						{likesVisible && <LoverList photo={photo} hideLikes={hideLikes} />}
						<Icon
							className={`carousel__love-icon ${userLike ? 'carousel__love-icon--active' : ''}`}
							icon={Heart}
							onClick={() => onLike(place.body, photo._id)}
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default Slide;
