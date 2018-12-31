import * as React from 'react';
import { inject } from 'mobx-react';
import { Field } from 'react-final-form';

import { Icon, Spinner } from '../../../components/atoms';
import { ReactComponent as Close } from '../../../assets/close.svg';

@inject('PlaceStore')
class LogoField extends React.Component {
	render() {
		const { PlaceStore, initialValues } = this.props;
		return (
			<Field name="logo">
				{({ input, meta }) => (
					<div className="form-group">
						<label htmlFor="logo" className="form-label">
							Logo
						</label>
						{PlaceStore.state === 'pendingUploadLogo' ? (
							<div>
								<Spinner className="create-edit-place-form__spinner" name="line-scale" />
							</div>
						) : initialValues && initialValues.logo ? (
							<div className="create-edit-place-form__logo-wrapper">
								<img
									className="create-edit-place-form__logo-image"
									alt={`${initialValues.nameEn} Logo`}
									src={initialValues.logo}
								/>
								<Icon
									className="create-edit-place-form__delete-icon"
									icon={Close}
									onClick={() => PlaceStore.deleteLogo(initialValues._id)}
									width="1rem"
								/>
							</div>
						) : (
							<input
								className="form-input"
								type="file"
								onChange={(acceptedFiles) => {
									const { PlaceStore } = this.props;
									PlaceStore.uploadLogo(PlaceStore.selectedPlaceId, acceptedFiles);
								}}
							/>
						)}
						{!initialValues.logo && <p className="form-input-hint">Recommended: 200x200</p>}
						{meta.error && meta.touched && <p className="form-input-hint">{meta.error}</p>}
					</div>
				)}
			</Field>
		);
	}
}

export default LogoField;
