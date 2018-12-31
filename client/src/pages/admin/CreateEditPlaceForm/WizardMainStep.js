import * as React from 'react';
import { inject } from 'mobx-react';
import { Field } from 'react-final-form';

import { WizardForm } from '../../../components/forms';
import { Editor } from '../../../components/molecules';

@inject('CategoryStore')
@inject('PlaceStore')
class WizardMainStep extends React.Component {
	render() {
		const { initialValues, CategoryStore, PlaceStore } = this.props;

		return (
			<WizardForm.Page
				validate={(values) => {
					const errors = {};

					if (!values.nameEn) {
						errors.nameEn = 'Required';
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
				<div className="create-edit-place-form__header">
					<h1 className="create-edit-place-form__title">{initialValues ? 'Edit place' : 'Add place'}</h1>
					<div className="create-edit-place-form__arrow">{'//'}</div>
					<h2 className="create-edit-place-form__subtitle">Main</h2>
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
	}
}

export default WizardMainStep;
