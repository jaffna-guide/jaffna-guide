import * as React from 'react';
import { inject } from 'mobx-react';
import { Field } from 'react-final-form';
import Dropzone from 'react-dropzone';

import { Icon, Spinner } from '../../../components/atoms';
import { ReactComponent as Close } from '../../../assets/close.svg';

@inject('PlaceStore')
class PhotosField extends React.Component {
	render() {
		const { PlaceStore, initialValues } = this.props;
		const hasError = PlaceStore.state.startsWith('error');
		return (
			<Field name="logo">
				{({ input, meta }) => (
					<div className={`form-group ${hasError ? 'has-error' : ''}`}>
						<label htmlFor="photos" className="form-label">
							Photos
						</label>
						<div className="add-place-form__photos">
							{initialValues.photos.map((photo, index) => {
								return (
									<div key={index} className="add-place-form__photo">
										<img alt={`${initialValues.nameEn} ${index + 1}`} src={photo.thumbnailUrl} />
										<Icon
											className="add-place-form__delete-photo"
											icon={Close}
											onClick={() => PlaceStore.deletePlacePhoto(initialValues._id, photo._id)}
											width="1rem"
										/>
									</div>
								);
							})}
							{PlaceStore.state === 'pendingUploadPhotos' ? (
								<div>
									<Spinner className="add-place-form__dropzone-spinner" name="line-scale" />
								</div>
							) : (
								<div className="add-place-form__dropzone-wrapper">
									<Dropzone className="add-place-form__dropzone" onDrop={this.handlePhotoDrop} />
									{hasError && <p className="form-input-hint">File too large.</p>}
								</div>
							)}
						</div>
						<p className="form-input-hint">Max file size 1.5 MB.</p>
					</div>
				)}
			</Field>
		);
	}
}

export default PhotosField;
