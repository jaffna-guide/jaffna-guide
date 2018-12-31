import * as React from 'react';
import { inject } from 'mobx-react';
import { Field } from 'react-final-form';

import { WizardForm } from '../../../components/forms';
import { Editor } from '../../../components/molecules';

@inject('PlaceStore')
class WizardTamilStep extends React.Component {
	render() {
		const { initialValues, PlaceStore } = this.props;

		return (
			<WizardForm.Page
				validate={(values) => {
					const errors = {};

					if (!values.nameTa) {
						errors.nameTa = 'Required';
					}

					return errors;
				}}
			>
				<div className="create-edit-place-form__header">
					<h1 className="create-edit-place-form__title">{initialValues ? 'Edit place' : 'Add place'}</h1>
					<div className="create-edit-place-form__arrow">{'//'}</div>
					<h2 className="create-edit-place-form__subtitle">தமிழ்</h2>
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
			</WizardForm.Page>
		);
	}
}

export default WizardTamilStep;
