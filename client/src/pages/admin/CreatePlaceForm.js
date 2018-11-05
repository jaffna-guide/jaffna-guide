import * as React from 'react';
import { Field } from 'react-final-form';
import { inject } from 'mobx-react';

import { Wizard } from '../../components';

@inject('CategoryStore')
class CreatePlaceForm extends React.Component {
	handleSubmit = (values) => {
		console.log('values', values);
	};

	render() {
		const { CategoryStore } = this.props;

		return (
			<Wizard name="add-place-form" onSubmit={this.handleSubmit}>
				<Wizard.Page>
					<h1 className="add-place-form__title">Add place &rsaquo; தமிழ்</h1>
					<div className="form-group">
						<label htmlFor="nameTa" className="form-label">
							Name
						</label>
						<Field
							name="nameTa"
							className="form-input"
							component="input"
							placeholder="i.e. நல்லூர் கந்தசுவாமி கோவில்"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="category" className="form-label">
							Category
						</label>
						<Field name="category" component="select" className="form-select">
							<option>Choose an option</option>
							{CategoryStore.categories.map((category) => (
								<option key={category.body}>{category.name.en}</option>
							))}
						</Field>
					</div>
				</Wizard.Page>
				<Wizard.Page>
					<h1 className="add-place-form__title">Add place &rsaquo; English</h1>
					<div className="form-group">
						<label htmlFor="nameEn" className="form-label">
							Name
						</label>
						<Field
							name="nameEn"
							className="form-input"
							component="input"
							placeholder="i.e. Nallur Kandaswamy Kovil"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="descriptionEn" className="form-label">
							Description
						</label>
						<Field
							name="descriptionEn"
							className="form-input"
							component="textarea"
							placeholder="i.e. The Nallur Kandaswamy Kovil is an iconic landmark."
						/>
					</div>
				</Wizard.Page>
			</Wizard>
		);
	}
}

export default CreatePlaceForm;
