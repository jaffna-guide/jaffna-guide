import React, { Component } from 'react';

import Header from './components/Header';
import CategoryList from './components/CategoryList';
import CrossFadeBackground from './components/CrossFadeBackground';

class App extends Component {
	render() {
		return (
			<>
				<CrossFadeBackground />
				<main className="main">
					<Header />
					<CategoryList />
				</main>
			</>
		);
	}
}

export default App;
