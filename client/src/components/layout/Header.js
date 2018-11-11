import * as React from 'react';

const Header = () => {
	return (
		<header className="header">
			<div className="header__combination">
				<span className="header__text">Jaffna</span>
				<img className="header__logo" src="/logo-border.png" alt="Logo" />
				<span className="header__text">Guide</span>
			</div>
		</header>
	);
};

export default Header;
