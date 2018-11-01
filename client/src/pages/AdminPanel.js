import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { ReactComponent as Plus } from '../assets/plus.svg';
import { Icon } from '../components';

@inject('PlaceStore')
@observer
class AdminPanel extends React.Component {
	state = {
		selectedPlace: '',
	};

	render() {
		const { PlaceStore } = this.props;

		return (
			<div className="admin-panel">
				<h1 className="admin-panel__title">Admin Panel</h1>
				<div className="admin-panel__places">
					<table class="table table-striped table-hover">
						<thead>
							<tr>
								<th>name</th>
								<th>category</th>
								<th>score</th>
								<th />
							</tr>
						</thead>
						<tbody>
							{PlaceStore.places.map((place) => (
								<tr className={this.state.selectedPlace === place.body ? 'active' : ''}>
									<td>{place.name.en}</td>
									<td>{place.category.body}</td>
									<td>102</td>
									<td>Delete | Deactivate</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="admin-panel__add-place">
					<Icon className="admin-panel__add-place-icon" icon={Plus} />
				</div>
			</div>
		);
	}
}

export default AdminPanel;
