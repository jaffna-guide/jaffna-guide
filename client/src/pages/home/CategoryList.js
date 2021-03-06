import * as React from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

@inject('CategoryStore')
@observer
class CategoryList extends React.Component {
	render() {
		const { CategoryStore, lang } = this.props;

		return (
			<div className="home__category-list">
				<ul className="category-list">
					{CategoryStore.categories.slice().sort((a, b) => a.rank - b.rank).map((category) => (
						<li className={`category-list__item category-list__item--${category.body}`} key={category.body}>
							<Link to={`/${category.body}`}>{category.name[lang]}</Link>
						</li>
					))}
				</ul>
			</div>
		);
	}
}

export default CategoryList;
