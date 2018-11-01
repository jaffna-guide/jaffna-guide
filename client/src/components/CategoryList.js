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
		const { CategoryStore } = this.props;

		return (
			<ul className="category-list">
				{CategoryStore.categories.slice().sort((a, b) => a.rank - b.rank).map((category) => (
					<li className="category-list__item" key={category.body}>
						{category.name.en}
					</li>
				))}
			</ul>
		);
	}
}

export default CategoryList;
