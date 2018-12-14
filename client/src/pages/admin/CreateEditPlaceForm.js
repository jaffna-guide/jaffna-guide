import * as React from 'react';
import { Field } from 'react-final-form';
import { inject } from 'mobx-react';
import Dropzone from 'react-dropzone';

import { WizardForm } from '../../components/forms';
import { Icon, Spinner } from '../../components/atoms';
import { Editor } from '../../components/molecules';
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

	handleImageDrop = (acceptedFiles, rejectedFiles) => {
		const { PlaceStore } = this.props;
		PlaceStore.uploadImages(PlaceStore.selectedPlaceId, acceptedFiles);
	};

	renderTamilPage = () => {
		const { initialValues, CategoryStore, PlaceStore } = this.props;
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
					{({ meta, input }) => (
						<div className="form-group">
							<label htmlFor="descriptionTa" className="form-label">
								Description
							</label>
							<Editor
								{...input}
								mentions={PlaceStore.tamilMentions}
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
							<br />
						</div>
					)}
				</Field>
			</WizardForm.Page>
		);
	};

	renderEnglishPage = () => {
		const { initialValues, PlaceStore } = this.props;

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
							<Editor
								{...input}
								mentions={PlaceStore.englishMentions}
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
		const hasError = PlaceStore.state.startsWith('error');

		return (
			<WizardForm.Page>
				<div className="add-place-form__image-page">
					<div className="add-place-form__header">
						<h1 className="add-place-form__title">{initialValues ? 'Edit place' : 'Add place'}</h1>
						<div className="add-place-form__arrow">{'//'}</div>
						<h2 className="add-place-form__subtitle">Images</h2>
					</div>

					<div className="add-place-form__cover-logo-wrapper">
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
						<Field name="logo">
							{({ input, meta }) => (
								<div className="form-group">
									<label htmlFor="logo" className="form-label">
										Logo
									</label>
									{PlaceStore.state === 'pendingUploadLogo' ? (
										<div>
											<Spinner className="add-place-form__spinner" name="line-scale" />
										</div>
									) : initialValues && initialValues.logo ? (
										<div className="add-place-form__logo-wrapper">
											<img
												className="add-place-form__logo-image"
												alt={`${initialValues.nameEn} Logo`}
												src={initialValues.logo}
											/>
											<Icon
												className="add-place-form__delete-icon"
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
					</div>

					<div className="add-place-form__marker-default-active-wrapper">
						<Field name="marker-default">
							{({ input, meta }) => (
								<div className="form-group">
									<label htmlFor="marker-default" className="form-label">
										Marker (default)
									</label>
									{PlaceStore.state === 'pendingUploadMarkerDefault' ? (
										<div>
											<Spinner className="add-place-form__spinner" name="line-scale" />
										</div>
									) : initialValues && initialValues.marker && initialValues.marker.default ? (
										<div className="add-place-form__marker-default-wrapper">
											<img
												className="add-place-form__marker-default-image"
												alt={`${initialValues.nameEn} Marker Default`}
												src={initialValues.marker.default}
											/>
											<Icon
												className="add-place-form__delete-icon"
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
												PlaceStore.uploadMarker(
													PlaceStore.selectedPlaceId,
													'default',
													acceptedFiles,
												);
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
						<Field name="marker-active">
							{({ input, meta }) => (
								<div className="form-group">
									<label htmlFor="marker-active" className="form-label">
										Marker (active)
									</label>
									{PlaceStore.state === 'pendingUploadMarkerActive' ? (
										<div>
											<Spinner className="add-place-form__spinner" name="line-scale" />
										</div>
									) : initialValues && initialValues.marker && initialValues.marker.active ? (
										<div className="add-place-form__marker-active-wrapper">
											<img
												className="add-place-form__marker-active-image"
												alt={`${initialValues.nameEn} Marker Active`}
												src={initialValues.marker.active}
											/>
											<Icon
												className="add-place-form__delete-icon"
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
												PlaceStore.uploadMarker(
													PlaceStore.selectedPlaceId,
													'active',
													acceptedFiles,
												);
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
					</div>

					<div className="add-place-form__images-wrapper">
						<div className={`form-group ${hasError ? 'has-error' : ''}`}>
							<label htmlFor="images" className="form-label">
								Images
							</label>
							<div className="add-place-form__images">
								{initialValues.images.map((image, index) => (
									<div key={index} className="add-place-form__image">
										<img alt={`${initialValues.nameEn} ${index}`} src={image.thumbnail} />
										<Icon
											className="add-place-form__delete-image"
											icon={Close}
											onClick={() => PlaceStore.deleteImage(initialValues._id, image._id)}
											width="1rem"
										/>
									</div>
								))}
								{PlaceStore.state === 'pendingUploadImages' ? (
									<div>
										<Spinner className="add-place-form__dropzone-spinner" name="line-scale" />
									</div>
								) : (
									<div className="add-place-form__dropzone-wrapper">
										<Dropzone className="add-place-form__dropzone" onDrop={this.handleImageDrop} />
										{hasError && <p className="form-input-hint">File too large.</p>}
									</div>
								)}
							</div>
						</div>
						<p className="form-input-hint">Max file size 1.5 MB.</p>
					</div>
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
