import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { inject } from 'mobx-react';

import { AdminRoute, Header } from './components';
import CategoryList from './components/CategoryList';
import CrossFadeBackground from './components/CrossFadeBackground';

import CulturePage from './pages/Culture';
import EventsPage from './pages/Events';
import RestaurantsPage from './pages/Restaurants';
import HotelsPage from './pages/Hotels';
import EducationPage from './pages/Education';
import PlaceDetailsPage from './pages/PlaceDetails';
import AdminPanelPage from './pages/admin/AdminPanel';

@inject('PlaceStore')
@inject('CategoryStore')
class App extends Component {
	componentDidMount() {
		this.props.CategoryStore.fetchCategories();
		this.props.PlaceStore.fetchPlaces();
	}

	render() {
		return (
			<Router>
				<div>
					<CrossFadeBackground />
					<Header />
					<main className="main">
						<Switch>
							<AdminRoute path="/admin" exact component={AdminPanelPage} />
							<Route path="/" exact component={CategoryList} />
							<Route path="/events" exact component={EventsPage} />
							<Route path="/culture" exact component={CulturePage} />
							<Route path="/restaurants" exact component={RestaurantsPage} />
							<Route path="/hotels" exact component={HotelsPage} />
							<Route path="/education" exact component={EducationPage} />
							<Route path="/:place" component={PlaceDetailsPage} />
						</Switch>
					</main>
				</div>
			</Router>
		);
	}
}

export default App;
