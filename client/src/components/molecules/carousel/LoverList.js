import * as React from 'react';

import { Icon } from '../../atoms';
import { ReactComponent as Close } from '../../../assets/close.svg';

const LoverList = ({ photo, hideLikes }) => {
	return (
		<ul className="carousel__lover-list">
			<div className="carousel__lover-list-header">
				<Icon className="carousel__close-icon" icon={Close} onClick={hideLikes} />
			</div>
			{photo.likes.slice().reverse().map((like) => (
				<li key={like.user.displayName} className="carousel__lover-list-item">
					{like.user.displayName}
				</li>
			))}
		</ul>
	);
};

export default LoverList;
