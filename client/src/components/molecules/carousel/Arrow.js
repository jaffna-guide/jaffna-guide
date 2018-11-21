import * as React from 'react';

import { Icon } from '../../atoms';
import { ReactComponent as Left } from '../../../assets/left.svg';
import { ReactComponent as Right } from '../../../assets/right.svg';

const Arrow = ({ onClick, direction }) => {
	return (
		<div onClick={onClick} className={`carousel-arrow carousel-arrow--${direction}`}>
			{direction === 'left' ? (
				<Icon className="carousel-arrow__icon" icon={Left} />
			) : (
				<Icon className="carousel-arrow__icon" icon={Right} />
			)}
		</div>
	);
};

export default Arrow;
