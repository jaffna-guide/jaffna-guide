import * as React from 'react';
import { inject } from 'mobx-react';

import { WizardForm } from '../../../components/forms';

import WizardMainStep from './WizardMainStep';
import WizardTamilStep from './WizardTamilStep';
import WizardUploadStep from './WizardUploadStep';

@inject('PlaceStore')
@inject('CategoryStore')
class CreatePlaceForm extends React.Component {
	handleSubmit = (values) => {
		const { PlaceStore, CategoryStore } = this.props;

		const categoryId = CategoryStore.categories.find((c) => c.body === values.category.toLowerCase())._id;

		const place = {
			name: {
				ta: values.nameTa,
				en: values.nameEn,
			},
			description: {
				ta: values.descriptionTa,
				en: values.descriptionEn,
			},
			category: categoryId,
			latitude: parseFloat(values.latitude),
			longitude: parseFloat(values.longitude),
		};

		if (this.props.initialValues) {
			place.id = PlaceStore.selectedPlaceId;
			PlaceStore.editPlace(place);
		} else {
			PlaceStore.createPlace(place);
		}
	};

	// handlePhotoDrop = (acceptedFiles, rejectedFiles) => {
	// 	const { PlaceStore } = this.props;
	// 	PlaceStore.uploadPlacePhotos(PlaceStore.selectedPlaceId, acceptedFiles);
	// };

	render() {
		const { initialValues } = this.props;

		return initialValues ? (
			<WizardForm name="create-edit-place-form" onSubmit={this.handleSubmit} initialValues={initialValues}>
				<WizardMainStep initialValues={initialValues} />
				<WizardTamilStep initialValues={initialValues} />
				<WizardUploadStep initialValues={initialValues} />
			</WizardForm>
		) : (
			<WizardForm name="create-edit-place-form" onSubmit={this.handleSubmit}>
				<WizardMainStep initialValues={initialValues} />
				<WizardTamilStep initialValues={initialValues} />
			</WizardForm>
		);
	}
}

export default CreatePlaceForm;
