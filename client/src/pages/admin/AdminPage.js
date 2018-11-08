import * as React from 'react';
import { observer, inject } from 'mobx-react';

import { Icon } from '../../components/atoms';
import { ReactComponent as Plus } from '../../assets/plus.svg';
import CreateEditPlaceForm from './CreateEditPlaceForm';

@inject('PlaceStore')
@observer
class AdminPanel extends React.Component {
	state = {
		selectedPlace: '',
		modalOpen: false,
	};

	toggleModal = () => {
		this.setState(({ modalOpen }) => ({ modalOpen: !modalOpen }));
	};

	render() {
		const { PlaceStore } = this.props;

		return (
			<div className="admin-panel">
				<div className="admin-panel__title-wrapper">
					<h1 className="admin-panel__title">Admin Panel</h1>
				</div>
				<div className="admin-panel__places">
					<table className="table table-striped table-hover">
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
								<tr
									key={place.body}
									className={this.state.selectedPlace === place.body ? 'active' : ''}
								>
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
					<Icon className="admin-panel__add-place-icon" icon={Plus} onClick={this.toggleModal} />
				</div>
				{this.state.modalOpen && (
					<div className="modal active" id="add-place">
						<div className="modal-overlay" aria-label="Close" onClick={this.toggleModal} />
						<div className="modal-container">
							<CreateEditPlaceForm />
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default AdminPanel;
