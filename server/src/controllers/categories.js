// CategoriesController
import { Category } from '../models';

export const getAllCategories = (req, res) => {
	return Category.find({ active: true }, (err, categories) => {
		res.send(categories);
	});
};

export const createCategory = (req, res) => {
	const { body, name, description } = req.body;

	const category = new Category({
    body,
		name,
		description,
	});

	category.save();

	res.send(category);
};
