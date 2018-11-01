import * as React from 'react';
import { observer, inject } from 'mobx-react';

@inject('CategoryStore')
@observer
class CategoryList extends React.Component {
  state = {};
  
  componentDidMount() {
    this.props.CategoryStore.fetchCategories();
  }

	render() {
    console.log('this.props.CategoryStore.categories', this.props.CategoryStore.categories);

		return (
			<ul>
				<li>Restaurants</li>
				<li>Culture</li>
			</ul>
		);
	}
}

export default CategoryList;
