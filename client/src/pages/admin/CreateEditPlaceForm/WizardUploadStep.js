import * as React from 'react';
import { inject } from 'mobx-react';

import { WizardForm } from '../../../components/forms';

import CoverField from './CoverField';
import LogoField from './LogoField';
import MarkerDefaultField from './MarkerDefaultField';
import MarkerActiveField from './MarkerActiveField';
import PhotosField from './PhotosField';

@inject('PlaceStore')
class WizardUploadStep extends React.Component {
	render() {
		const { initialValues } = this.props;

		return (
			<WizardForm.Page>
				<div className="add-place-form__photos-page">
					<div className="add-place-form__header">
						<h1 className="add-place-form__title">{initialValues ? 'Edit place' : 'Add place'}</h1>
						<div className="add-place-form__arrow">{'//'}</div>
						<h2 className="add-place-form__subtitle">Uploads</h2>
					</div>
					<div className="add-place-form__cover-logo-wrapper">
						<CoverField initialValues={initialValues} />
						<LogoField initialValues={initialValues} />
					</div>
					<div className="add-place-form__marker-default-active-wrapper">
						<MarkerDefaultField initialValues={initialValues} />
						<MarkerActiveField initialValues={initialValues} />
					</div>
					<div className="add-place-form__photos-wrapper">
						<PhotosField initialValues={initialValues} />
					</div>
				</div>
			</WizardForm.Page>
		);
	}
}

export default WizardUploadStep;
