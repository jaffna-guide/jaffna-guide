import * as React from 'react';
import { inject } from 'mobx-react';
import { Field } from 'react-final-form';
import Dropzone from 'react-dropzone';

@inject('PlaceStore')
class PhotosField extends React.Component {
	render() {
		const { PlaceStore } = this.props;
		const hasError = PlaceStore.state.startsWith('error');

		return (
			<Field name="photos">
				{({ input, meta }) => (
					<div>
						<Dropzone className="create-edit-place-form__dropzone" onDrop={this.handlePhotoDrop} />
						{hasError && <p className="form-input-hint">File too large.</p>}
					</div>
				)}
			</Field>
		);
	}
}

export default PhotosField;
