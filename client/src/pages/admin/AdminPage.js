import * as React from 'react';
import { observer, inject } from 'mobx-react';

import { Icon } from '../../components/atoms';
import { ReactComponent as Plus } from '../../assets/plus.svg';
import { ReactComponent as Delete } from '../../assets/delete.svg';
import CreateEditPlaceForm from './CreateEditPlaceForm';

@inject('PlaceStore')
@observer
class AdminPanel extends React.Component {
	render() {
		const { PlaceStore } = this.props;

		return (
			<div className="admin-panel">
				<div className="admin-panel__title-wrapper">
					<h1 className="admin-panel__title">Admin Panel</h1>
				</div>
				<div className="admin-panel__places">
					<table className="admin-panel__table table table-striped table-hover table-scroll">
						<thead>
							<tr>
								<th>name</th>
								<th>category</th>
								<th>score</th>
								<th />
							</tr>
						</thead>
						<tbody>
							{PlaceStore.places.map((place) => {
								return (
									<tr
										key={place.body}
										className={`admin-panel__table-row ${PlaceStore.selectedPlaceId === place._id
											? 'active'
											: ''}`}
									>
										<td
											className="admin-panel__name-column"
											onClick={() => PlaceStore.selectPlace(place._id)}
										>
											<div>{place.name.en}</div>
										</td>
										<td className="admin-panel__category-column" onClick={() => PlaceStore.selectPlace(place._id)}>{place.category.body}</td>
										<td className="admin-panel__score-column" onClick={() => PlaceStore.selectPlace(place._id)}>102</td>
										<td>
											<div className="admin-panel__place-controls">
												<Icon
													className="admin-panel__delete-place-icon"
													icon={Delete}
													onClick={() => PlaceStore.deletePlace(place._id)}
												/>
												<div className="admin-panel__deactivate-switch form-group">
													<label className="form-switch">
														<input
															type="checkbox"
															checked={place.active}
															onChange={() => PlaceStore.togglePlaceActive(place._id)}
														/>
														<i className="form-icon" />
													</label>
												</div>
											</div>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				<div className="admin-panel__add-place">
					<Icon
						className="admin-panel__add-place-icon"
						icon={Plus}
						onClick={PlaceStore.openCreateEditPlaceModal}
					/>
				</div>
				{PlaceStore.createEditPlaceModalVisible && (
					<div className="modal active" id="add-place">
						<div
							className="modal-overlay"
							aria-label="Close"
							onClick={PlaceStore.closeCreateEditPlaceModal}
						/>
						<div className="modal-container">
							{PlaceStore.selectedPlace ? (
								<CreateEditPlaceForm initialValues={PlaceStore.selectedPlace} />
							) : (
								<CreateEditPlaceForm />
							)}
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default AdminPanel;
