import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('PlaceStore')
@observer
class App extends Component {
  render() {
    const { PlaceStore } = this.props;

    return (
      <div>
        <h2>You have {PlaceStore.placeCount} place(s).</h2>
      </div>
    );
  }
}

export default App;
