import * as React from 'react';
import { Field } from 'react-final-form';

import { Icon } from '../../../components/atoms';
import { ReactComponent as LowerLeft } from '../../../assets/pos-lower-left.svg';
import { ReactComponent as UpperLeft } from '../../../assets/pos-upper-left.svg';
import { ReactComponent as UpperRight } from '../../../assets/pos-upper-right.svg';

class CreditPositionField extends React.Component {
	render() {
		return (
			<div className="create-edit-place-form__credit-position">
				<div className="form-group">
					<label className="form-radio form-inline">
						<Field name="creditPosition" component="input" type="radio" value="lower-left" />
						<i className="form-icon" />
						<Icon className="create-edit-place-form__lower-left-icon" icon={LowerLeft} />
					</label>

					<label className="form-radio form-inline">
						<Field name="creditPosition" component="input" type="radio" value="upper-left" />
						<i className="form-icon" />
						<Icon className="create-edit-place-form__lower-left-icon" icon={UpperLeft} />
					</label>
					<label className="form-radio form-inline">
						<Field name="creditPosition" component="input" type="radio" value="upper-right" />
						<i className="form-icon" />
						<Icon className="create-edit-place-form__lower-left-icon" icon={UpperRight} />
					</label>
				</div>
			</div>
		);
	}
}

export default CreditPositionField;
