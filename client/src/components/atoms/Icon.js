import * as React from 'react';

const Icon = ({ icon: SVGComponent, className, onClick }) => {
	return <SVGComponent onClick={onClick} className={className} />;
};

export default Icon;
