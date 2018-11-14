import * as React from 'react';
import { Form } from 'react-final-form';

class WizardForm extends React.Component {
	static Page = ({ children }) => children;

	constructor(props) {
		super(props);

		this.state = {
			page: 0,
			values: props.initialValues || {},
		};
	}

	next = (event) => {
		event.persist && event.persist();
		this.setState((state) => ({
			page: Math.min(state.page + 1, this.props.children.length - 1),
		}));
	};

	previous = () => {
		this.setState((state) => ({ page: Math.max(state.page - 1, 0) }));
	};

	validate = (values) => {
		const activePage = React.Children.toArray(this.props.children)[this.state.page];
		return activePage.props.validate ? activePage.props.validate(values) : {};
	};

	handleSubmit = (values) => {
		const { onSubmit, children } = this.props;
		const { page } = this.state;
		const isLastPage = page === React.Children.count(children) - 1;

		if (isLastPage) {
			return onSubmit(values);
		} else {
			this.next(values);
		}
	};

	render() {
		const { name, children, initialValues } = this.props;
		const { page, values } = this.state;
		const activePage = React.Children.toArray(children)[page];
		const isLastPage = page === React.Children.count(children) - 1;

		return (
			<Form
				initialValues={values}
				validate={this.validate}
				onSubmit={this.handleSubmit}
				render={({ handleSubmit, submitting, values }) => {
					return (
						<form className={name} onSubmit={handleSubmit}>
							{activePage}
							<div className={`${name}__buttons btn-group`}>
								{page > 0 && (
									<button className={`${name}__button--prev btn`} onClick={this.previous}>
										« Previous
									</button>
								)}
								{!isLastPage && (
									<button className={`${name}__button--next btn btn-primary`} type="submit">
										Next »
									</button>
								)}
								{isLastPage && (
									<button
										type="submit"
										className={`${name}__button--submit btn btn-primary`}
										disabled={submitting}
									>
										{initialValues ? 'Edit' : 'Submit'}
									</button>
								)}
							</div>
						</form>
					);
				}}
			/>
		);
	}
}

export default WizardForm;
