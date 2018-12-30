import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import { Carousel } from '../../components/molecules';
import PlacesBallot from './PlacesBallot';

@withRouter
@inject('AuthStore')
@inject('PlaceStore')
@observer
class VillagesDetailsPage extends React.Component {
  componentDidMount() {
    const { AuthStore, match } = this.props;
    const token = localStorage.getItem('token');
    const { place } = match.params;

    if (token) {
      AuthStore.authenticate(place);
    }
  }

  render() {
    const { PlaceStore } = this.props;
    const place = PlaceStore.currentPlace;

    return (
      <div className="villages-details">
        {place.logo && (
          <div className="villages-details__logo-wrapper">
            <img className="villages-details__logo-image" src={place.logo} alt={`${place.name.en} Logo`} />
          </div>
        )}
        <div className="villages-details__header">
          <div className="villages-details__heading">
            <h1 className="villages-details__title">{place.name.en}</h1>
            <h2 className="villages-details__subtitle">{place.name.ta}</h2>
          </div>
          <div className="villages-details__ballot">
            <PlacesBallot place={place} category="villages" />
          </div>
        </div>
        {place.images.length > 0 && (
          <div className="villages-details__carousel">
            <Carousel name={place.name.en} images={place.images} />
          </div>
        )}
        <div className="villages-details__description">
          <div className="villages-details__description--en">{place.description.en}</div>
          <div className="villages-details__description--ta">{place.description.ta}</div>
        </div>
      </div>
    );
  }
}

export default VillagesDetailsPage;
