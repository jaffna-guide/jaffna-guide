import * as React from 'react';
import { Field } from 'react-final-form';
import { inject } from 'mobx-react';

import { WizardForm } from '../../components/forms';
import { Icon, Spinner } from '../../components/atoms';
import { ReactComponent as Close } from '../../assets/close.svg';

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

	handleCoverDrop = (acceptedFiles) => {
		const { PlaceStore } = this.props;
		PlaceStore.uploadCover(PlaceStore.selectedPlaceId, acceptedFiles);
	};

	handleMarkerDrop = (acceptedFiles) => {
		const { PlaceStore } = this.props;
		PlaceStore.uploadMarker(PlaceStore.selectedPlaceId, acceptedFiles);
	};

	renderEnglishPage = () => {
		const { initialValues, CategoryStore } = this.props;
		return (
			<WizardForm.Page
				validate={(values) => {
					const errors = {};

					if (!values.nameTa) {
						errors.nameTa = 'Required';
					}
					if (!values.category) {
						errors.category = 'Required';
					}
					if (!values.latitude) {
						errors.latitude = 'Required';
					}
					if (!values.longitude) {
						errors.longitude = 'Required';
					}

					return errors;
				}}
			>
				<div className="add-place-form__header">
					<h1 className="add-place-form__title">{initialValues ? 'Edit place' : 'Add place'}</h1>
					<div className="add-place-form__arrow">{'//'}</div>
					<h2 className="add-place-form__subtitle">தமிழ்</h2>
				</div>
				<Field name="nameTa">
					{({ input, meta }) => (
						<div className="form-group">
							<label htmlFor="nameTa" className="form-label">
								Name
							</label>
							<input {...input} className="form-input" placeholder="i.e. நல்லூர் கந்தசுவாமி கோவில்" />
							{meta.error && meta.touched && <p className="form-input-hint">{meta.error}</p>}
						</div>
					)}
				</Field>
				<Field name="descriptionTa">
					{({ input, meta }) => (
						<div className="form-group">
							<label htmlFor="descriptionTa" className="form-label">
								Description
							</label>
							<textarea
								{...input}
								rows={5}
								className="form-input"
								placeholder="i.e. நாகபூஷணி அம்மன் கோயில் நயினாதீவில் பாக்கு சலசந்தி நடுவில் அமைந்துள்ள ஒரு பழமையான மற்றும் வரலாற்று இந்து கோவில் ஆகும்."
							/>
							{meta.error && meta.touched && <p className="form-input-hint">{meta.error}</p>}
						</div>
					)}
				</Field>
				<Field name="category">
					{({ input, meta }) => (
						<div className="form-group">
							<label htmlFor="category" className="form-label">
								Category
							</label>
							<select {...input} className="form-select">
								<option value="">Choose an option</option>
								{CategoryStore.placeCategories.map((category) => (
									<option key={category.body} value={category.body}>
										{category.name.en}
									</option>
								))}
							</select>
							{meta.error && meta.touched && <p className="form-input-hint">{meta.error}</p>}
						</div>
					)}
				</Field>
				<Field name="latitude">
					{({ input, meta }) => (
						<div className="form-group">
							<label htmlFor="latitude" className="form-label">
								Latitude
							</label>
							<input {...input} className="form-input" placeholder="i.e. 9.661498" />
							{meta.error && meta.touched && <p className="form-input-hint">{meta.error}</p>}
						</div>
					)}
				</Field>
				<Field name="longitude">
					{({ input, meta }) => (
						<div className="form-group">
							<label htmlFor="longitude" className="form-label">
								Longitude
							</label>
							<input {...input} className="form-input" placeholder="i.e. 80.025543" />
							{meta.error && meta.touched && <p className="form-input-hint">{meta.error}</p>}
						</div>
					)}
				</Field>
			</WizardForm.Page>
		);
	};

	renderTamilPage = () => {
		const { initialValues } = this.props;

		return (
			<WizardForm.Page
				validate={(values) => {
					const errors = {};

					if (!values.nameEn) {
						errors.nameEn = 'Required';
					}

					return errors;
				}}
			>
				<div className="add-place-form__header">
					<h1 className="add-place-form__title">{initialValues ? 'Edit place' : 'Add place'}</h1>
					<div className="add-place-form__arrow">{'//'}</div>
					<h2 className="add-place-form__subtitle">English</h2>
				</div>
				<Field name="nameEn">
					{({ input, meta }) => (
						<div className="form-group">
							<label htmlFor="nameEn" className="form-label">
								Name
							</label>
							<input {...input} className="form-input" placeholder="i.e. Nallur Kandaswamy Kovil" />
							{meta.error && meta.touched && <p className="form-input-hint">{meta.error}</p>}
						</div>
					)}
				</Field>
				<Field name="descriptionEn">
					{({ input, meta }) => (
						<div className="form-group">
							<label htmlFor="descriptionEn" className="form-label">
								Description
							</label>
							<textarea
								{...input}
								rows={5}
								className="form-input"
								placeholder="i.e. The Nallur Kandaswamy Kovil is an iconic landmark."
							/>
							{meta.error && meta.touched && <p className="form-input-hint">{meta.error}</p>}
						</div>
					)}
				</Field>
			</WizardForm.Page>
		);
	};

	renderImagePage = () => {
		const { PlaceStore, initialValues } = this.props;

		return (
			<WizardForm.Page>
				<div className="add-place-form__header">
					<h1 className="add-place-form__title">{initialValues ? 'Edit place' : 'Add place'}</h1>
					<div className="add-place-form__arrow">{'//'}</div>
					<h2 className="add-place-form__subtitle">Images</h2>
				</div>

				<div className="add-place-form__cover-marker">
					<Field name="cover">
						{({ input, meta }) => (
							<div className="form-group">
								<label htmlFor="cover" className="form-label">
									Cover
								</label>
								{PlaceStore.state === 'pending' ? (
									<div>
										<Spinner className="add-place-form__spinner" name="line-scale" />
									</div>
								) : initialValues && initialValues.cover ? (
									<div className="add-place-form__cover-wrapper">
										<img
											className="add-place-form__cover"
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
									<input className="form-input" type="file" onChange={this.handleCoverDrop} />
								)}
								<p className="form-input-hint">Recommended: 64x64</p>
								{meta.error && meta.touched && <p className="form-input-hint">{meta.error}</p>}
							</div>
						)}
					</Field>
					<Field name="marker">
						{({ input, meta }) => (
							<div className="form-group">
								<label htmlFor="marker" className="form-label">
									Marker
								</label>
								{PlaceStore.state === 'pending' ? (
									<div>
										<Spinner className="add-place-form__spinner" name="line-scale" />
									</div>
								) : initialValues && initialValues.marker ? (
									<div className="add-place-form__marker-wrapper">
										<img
											className="add-place-form__marker"
											alt={`${initialValues.nameEn} Marker`}
											src={initialValues.marker}
										/>
										<Icon
											className="add-place-form__delete-icon"
											icon={Close}
											onClick={() => PlaceStore.deleteMarker(initialValues._id)}
											width="1rem"
										/>
									</div>
								) : (
									<input className="form-input" type="file" onChange={this.handleMarkerDrop} />
								)}
								<p className="form-input-hint">Recommended: 64x64</p>
								{meta.error && meta.touched && <p className="form-input-hint">{meta.error}</p>}
							</div>
						)}
					</Field>
				</div>
			</WizardForm.Page>
		);
	};

	render() {
		const { initialValues } = this.props;

		return initialValues ? (
			<WizardForm name="add-place-form" onSubmit={this.handleSubmit} initialValues={initialValues}>
				{this.renderTamilPage()}
				{this.renderEnglishPage()}
				{this.renderImagePage()}
			</WizardForm>
		) : (
			<WizardForm name="add-place-form" onSubmit={this.handleSubmit}>
				{this.renderTamilPage()}
				{this.renderEnglishPage()}
			</WizardForm>
		);
	}
}

export default CreatePlaceForm;
