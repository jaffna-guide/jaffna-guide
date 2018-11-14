import * as React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<header className="header">
			<Link to="/" className="header__combination">
				<span className="header__text">Jaffna</span>
				<img className="header__logo" src="/logo-border.png" alt="Logo" />
				<span className="header__text">Guide</span>
			</Link>
		</header>
	);
};

export default Header;
