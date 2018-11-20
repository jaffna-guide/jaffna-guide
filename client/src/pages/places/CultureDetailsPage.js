import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { Carousel } from '../../components/molecules';

@inject('PlaceStore')
@observer
class CultureDetails extends React.Component {
	render() {
		const { PlaceStore } = this.props;
		const place = PlaceStore.currentPlace;

		return (
			<div className="culture-details">
				<div className="culture-details__header">
					<h1 className="culture-details__title">{place.name.en}</h1>
					<h2 className="culture-details__subtitle">{place.name.ta}</h2>
				</div>
				{/* <div className="culture-details__carousel">
					<Carousel>
						{({ MainTrack, Slide, ThumbnailTrack, Thumbnail }) => {
							return (
								<div>
									<ThumbnailTrack>
										{place.images.map((image) => (
											<Thumbnail key={image.thumbnail} url={image.thumbnail} />
										))}
									</ThumbnailTrack>
									<MainTrack>
										{place.images.map((image) => (
											<Slide key={image.original} url={image.original} />
										))}
									</MainTrack>
								</div>
							);
						}}
					</Carousel>
				</div> */}
			</div>
		);
	}
}

export default CultureDetails;
