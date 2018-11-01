import * as React from 'react';
import { observer, inject } from 'mobx-react';

@inject('PlaceStore')
@observer
class Culture extends React.Component {
  state = {};

  render() {
    const { PlaceStore } = this.props;

    return (
      <ul className="place-list">
        {PlaceStore.culture.map((place) => {
          return (
            <li key={place.body} className="place-list__item">
              {place.name.en}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Culture;
