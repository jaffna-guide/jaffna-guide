import * as React from 'react';

import { Title } from '../components/atoms';

const CreditPage = () => {
	return (
		<div className="credit">
			<div className="credit__title">
				<Title>Credit</Title>
			</div>
			<div className="credit__description">
				<i>The Jaffna Guide</i> project is a joint effort by a number of people. We would like to thank all the
				contributors that have helped to shape the platform to what it is today. Whether by providing
				breath-taking images, by researching information about the various places or simply by helping us to
				improve our content in grammar and wording - you are all part of our success story.
			</div>
			<div className="credit__contributors">
				<ul className="credit__contributor-list">
					<li className="credit__contributor">
						<div className="credit__contributor-name">Vithushan V.</div>
						<div className="credit__contributor-help">
							for researching all the restaurants that currently operate in Jaffna.
						</div>
					</li>
          <li className="credit__contributor">
            <div className="credit__contributor-name">Lavanya S.</div>
            <div className="credit__contributor-help">
              for improving the English grammar section across a number of places.
						</div>
          </li>
				</ul>
			</div>
		</div>
	);
};

export default CreditPage;
