import * as React from 'react';

import CategoryList from './CategoryList';
import LoginWelcome from './LoginWelcome';

const Home = ({ lang }) => {
	return (
		<div className="home">
			<CategoryList lang={lang} />
			<LoginWelcome />
		</div>
	);
};

export default Home;
