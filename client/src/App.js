import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { inject } from 'mobx-react';

import { Header, Footer, CrossFadeBackground } from './components/layout';
import { AdminRoute } from './components/routes';
import {
	HomePage,
	AboutPage,
	CulturePage,
	EventsPage,
	RestaurantsPage,
	HotelsPage,
	EducationPage,
	PlaceDetailsPage,
	AdminPage,
} from './pages';

@inject('PlaceStore')
@inject('CategoryStore')
@inject('LanguageStore')
class App extends Component {
	componentDidMount() {
		this.props.CategoryStore.fetchCategories();
		this.props.PlaceStore.fetchPlaces();
	}

	render() {
		const { LanguageStore } = this.props;
		const { lang } = LanguageStore;

		return (
			<Router>
				<div>
					{/* <CrossFadeBackground /> */}
					<Header />
					<main className="main">
						<Switch>
							<AdminRoute path="/admin" exact component={AdminPage} />
							<Route path="/" exact component={() => <HomePage lang={lang} />} />
							<Route path="/about" exact component={() => <AboutPage lang={lang} />} />
							<Route path="/events" exact component={EventsPage} />
							<Route path="/culture" exact component={CulturePage} />
							<Route path="/restaurants" exact component={RestaurantsPage} />
							<Route path="/hotels" exact component={HotelsPage} />
							<Route path="/education" exact component={EducationPage} />
							<Route path="/:place" component={PlaceDetailsPage} />
						</Switch>
					</main>
					<Footer />
				</div>
			</Router>
		);
	}
}

export default App;
