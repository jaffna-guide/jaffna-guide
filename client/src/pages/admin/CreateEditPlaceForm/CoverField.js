import * as React from 'react';
import { inject } from 'mobx-react';
import { Field } from 'react-final-form';

import { Icon, Spinner } from '../../../components/atoms';
import { ReactComponent as Close } from '../../../assets/close.svg';

@inject('PlaceStore')
class CoverField extends React.Component {
	render() {
		const { PlaceStore, initialValues } = this.props;
		return (
			<Field name="cover">
				{({ input, meta }) => (
					<div className="form-group">
						<label htmlFor="cover" className="form-label">
							Cover
						</label>
						{PlaceStore.state === 'pendingUploadCover' ? (
							<div>
								<Spinner className="add-place-form__spinner" name="line-scale" />
							</div>
						) : initialValues && initialValues.cover ? (
							<div className="add-place-form__cover-wrapper">
								<img
									className="add-place-form__cover-image"
									alt={`${initialValues.nameEn} Cover`}
									src={initialValues.cover}
								/>
								<Icon
									className="add-place-form__delete-icon"
									icon={Close}
									onClick={() => PlaceStore.deleteCover(initialValues._id)}
									width="1rem"
								/>
							</div>
						) : (
							<input
								className="form-input"
								type="file"
								onChange={(acceptedFiles) => {
									const { PlaceStore } = this.props;
									PlaceStore.uploadCover(PlaceStore.selectedPlaceId, acceptedFiles);
								}}
							/>
						)}
						{!initialValues.cover && <p className="form-input-hint">Recommended: 300x200</p>}
						{meta.error && meta.touched && <p className="form-input-hint">{meta.error}</p>}
					</div>
				)}
			</Field>
		);
	}
}

export default CoverField;
