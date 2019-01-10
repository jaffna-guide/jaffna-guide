import * as React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<header className="header">
			<Link to="/" className="header__combination">
				<span className="header__text">Jaffna</span>
				<figure className="header__logo">
					<img src="/logo-border.png" alt="Jaffna Guide Logo" />
				</figure>
				<span className="header__text">Guide</span>
			</Link>
		</header>
	);
};

export default Header;
