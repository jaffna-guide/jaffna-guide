import * as React from 'react';
import GoogleMap from 'google-map-react';

const AnyReactComponent = () => <div>any</div>;

class PlacesMap extends React.Component {
	static defaultProps = {
		zoom: 11,
	};

	render() {
		return (
			<div className="places-map">
				<GoogleMap
					bootstrapURLKeys={{
						key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
					}}
					defaultCenter={this.props.center}
					defaultZoom={this.props.zoom}
				>
					<AnyReactComponent />
				</GoogleMap>
			</div>
		);
	}
}

export default PlacesMap;
