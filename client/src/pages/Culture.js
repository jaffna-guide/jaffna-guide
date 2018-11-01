import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom'

@inject('PlaceStore')
@observer
class Culture extends React.Component {
	state = {};

	render() {
		const { PlaceStore } = this.props;

		return (
			<div className="culture">
        <Link to="/">Back</Link>
				<ul className="place-list">
					{PlaceStore.culture.map((place) => {
						return (
							<li key={place.body} className="place-list__item">
								{place.name.en}
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

export default Culture;
