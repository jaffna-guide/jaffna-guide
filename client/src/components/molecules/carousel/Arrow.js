import * as React from 'react';

import { Icon } from '../../atoms';
import { ReactComponent as Left } from '../../../assets/left.svg';
import { ReactComponent as Right } from '../../../assets/right.svg';

const Arrow = ({ onClick, direction }) => {
	return (
		<div onClick={onClick} className={`carousel__arrow carousel__arrow--${direction}`}>
			{direction === 'left' ? (
				<Icon className="carousel__arrow-icon" icon={Left} />
			) : (
				<Icon className="carousel__arrow-icon" icon={Right} />
			)}
		</div>
	);
};

export default Arrow;
