import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { inject } from 'mobx-react';

import { Header, Footer } from './components/layout';
import { AdminRoute } from './components/routes';
import {
	HomePage,
	AboutPage,
	CreditPage,
	FeedbackPage,
	ImprintPage,
	CulturePage,
	EventsPage,
	RestaurantsPage,
	HotelsPage,
	EducationPage,
	PlaceDetailsPage,
	AdminPage,
} from './pages';


@inject('CategoryStore')
@inject('LanguageStore')
class App extends Component {
	componentDidMount() {
		this.props.CategoryStore.fetchCategories();
	}

	render() {
		const { LanguageStore } = this.props;
		const { lang } = LanguageStore;

		return (
			<Router>
				<div className="layout">
					<Header />
					<main className="main">
						<Switch>
							<AdminRoute path="/admin" exact component={AdminPage} />
							<Route path="/" exact component={() => <HomePage lang={lang} />} />
							<Route path="/about" exact component={AboutPage} />
							<Route path="/imprint" exact component={ImprintPage} />
							<Route path="/credit" exact component={CreditPage} />
							<Route path="/feedback" exact component={FeedbackPage} />
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
