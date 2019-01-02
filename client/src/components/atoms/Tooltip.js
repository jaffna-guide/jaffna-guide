import * as React from 'react';

const Tooltip = ({ children, render, visible }) => {
	return (
		<div className="tooltip">
			<div className="tooltip__children">{children()}</div>
			{visible && <div className="tooltip__content">{render()}</div>}
		</div>
	);
};

export default Tooltip;
