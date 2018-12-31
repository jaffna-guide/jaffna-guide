import * as React from 'react';
import { inject } from 'mobx-react';

import { Icon, Spinner } from '../../../components/atoms';
import { ReactComponent as Close } from '../../../assets/close.svg';
import PhotosDropzoneField from './PhotosDropzoneField';
import CreditPositionField from './CreditPositionField';

@inject('PlaceStore')
class Photos extends React.Component {
	render() {
		const { PlaceStore, initialValues } = this.props;
		const hasError = PlaceStore.state.startsWith('error');

		return (
			<div className={`form-group ${hasError ? 'has-error' : ''}`}>
				<label htmlFor="photos" className="form-label">
					Photos
				</label>
				<div className="create-edit-place-form__photos">
					{initialValues.photos.map((photo, index) => {
						return (
							<div key={index} className="create-edit-place-form__photo">
								<img alt={`${initialValues.nameEn} ${index + 1}`} src={photo.thumbnailUrl} />
								<Icon
									className="create-edit-place-form__delete-photo"
									icon={Close}
									onClick={() => PlaceStore.deletePlacePhoto(initialValues._id, photo._id)}
									width="1rem"
								/>
							</div>
						);
					})}
					{PlaceStore.state === 'pendingUploadPhotos' ? (
						<div>
							<Spinner className="create-edit-place-form__dropzone-spinner" name="line-scale" />
						</div>
					) : (
						<div className="create-edit-place-form__dropzone-wrapper">
							<CreditPositionField />
							<PhotosDropzoneField />
						</div>
					)}
				</div>
				<p className="form-input-hint">Max file size 1.5 MB.</p>
			</div>
		);
	}
}

export default Photos;
