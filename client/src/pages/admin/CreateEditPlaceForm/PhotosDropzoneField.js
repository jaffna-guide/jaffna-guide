import * as React from 'react';
import { inject } from 'mobx-react';
import { FormSpy } from 'react-final-form';
import Dropzone from 'react-dropzone';

@inject('PlaceStore')
class PhotosField extends React.Component {
	handlePhotoDrop = (acceptedFiles, rejectedFiles, values) => {
		const { PlaceStore } = this.props;
		PlaceStore.uploadPlacePhotos(PlaceStore.selectedPlaceId, acceptedFiles, values.creditPosition);
	};

	render() {
		const { PlaceStore } = this.props;
		const hasError = PlaceStore.state.startsWith('error');

		return (
			<FormSpy subscription={{ values: true }}>
				{({ values }) => {
					return (
						<>
							<Dropzone
								className="create-edit-place-form__dropzone"
								onDrop={(acceptedFiles, rejectedFiles) =>
									this.handlePhotoDrop(acceptedFiles, rejectedFiles, values)}
							/>
							{hasError && <p className="form-input-hint">File too large.</p>}
						</>
					);
				}}
			</FormSpy>
		);
	}
}

export default PhotosField;
