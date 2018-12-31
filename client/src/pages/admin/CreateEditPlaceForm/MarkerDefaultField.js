import * as React from 'react';
import { inject } from 'mobx-react';
import { Field } from 'react-final-form';

import { Icon, Spinner } from '../../../components/atoms';
import { ReactComponent as Close } from '../../../assets/close.svg';

@inject('PlaceStore')
class MarkerDefaultField extends React.Component {
	render() {
		const { PlaceStore, initialValues } = this.props;
		return (
			<Field name="marker-default">
				{({ input, meta }) => (
					<div className="form-group">
						<label htmlFor="marker-default" className="form-label">
							Marker (default)
						</label>
						{PlaceStore.state === 'pendingUploadMarkerDefault' ? (
							<div>
								<Spinner className="create-edit-place-form__spinner" name="line-scale" />
							</div>
						) : initialValues && initialValues.marker && initialValues.marker.default ? (
							<div className="create-edit-place-form__marker-default-wrapper">
								<img
									className="create-edit-place-form__marker-default-image"
									alt={`${initialValues.nameEn} Marker Default`}
									src={initialValues.marker.default}
								/>
								<Icon
									className="create-edit-place-form__delete-icon"
									icon={Close}
									onClick={() => PlaceStore.deleteMarker(initialValues._id, 'default')}
									width="1rem"
								/>
							</div>
						) : (
							<input
								className="form-input"
								type="file"
								onChange={(acceptedFiles) => {
									const { PlaceStore } = this.props;
									PlaceStore.uploadMarker(PlaceStore.selectedPlaceId, 'default', acceptedFiles);
								}}
							/>
						)}
						{((initialValues && initialValues.marker && !initialValues.marker.default) ||
							(initialValues && !initialValues.marker)) && (
							<p className="form-input-hint">Recommended: 106x150</p>
						)}
						{meta.error && meta.touched && <p className="form-input-hint">{meta.error}</p>}
					</div>
				)}
			</Field>
		);
	}
}

export default MarkerDefaultField;
