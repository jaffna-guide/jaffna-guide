import * as React from 'react';
import { inject } from 'mobx-react';
import { Field } from 'react-final-form';

import { Icon, Spinner } from '../../../components/atoms';
import { ReactComponent as Close } from '../../../assets/close.svg';

@inject('PlaceStore')
class MarkerActiveField extends React.Component {
	render() {
		const { PlaceStore, initialValues } = this.props;
		return (
			<Field name="markerActive">
				{({ input, meta }) => (
					<div className="form-group">
						<label htmlFor="marker-active" className="form-label">
							Marker (active)
						</label>
						{PlaceStore.state === 'pendingUploadMarkerActive' ? (
							<div>
								<Spinner className="create-edit-place-form__spinner" name="line-scale" />
							</div>
						) : initialValues && initialValues.marker && initialValues.marker.active ? (
							<div className="create-edit-place-form__marker-active-wrapper">
								<img
									className="create-edit-place-form__marker-active-image"
									alt={`${initialValues.nameEn} Marker Active`}
									src={initialValues.marker.active}
								/>
								<Icon
									className="create-edit-place-form__delete-icon"
									icon={Close}
									onClick={() => PlaceStore.deleteMarker(initialValues._id, 'active')}
									width="1rem"
								/>
							</div>
						) : (
							<input
								className="form-input"
								type="file"
								onChange={(acceptedFiles) => {
									const { PlaceStore } = this.props;
									PlaceStore.uploadMarker(PlaceStore.selectedPlaceId, 'active', acceptedFiles);
								}}
							/>
						)}
						{((initialValues && initialValues.marker && !initialValues.marker.active) ||
							(initialValues && !initialValues.marker)) && (
							<p className="form-input-hint">Recommended: 400x150</p>
						)}
						{meta.error && meta.touched && <p className="form-input-hint">{meta.error}</p>}
					</div>
				)}
			</Field>
		);
	}
}

export default MarkerActiveField;
