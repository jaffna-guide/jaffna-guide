import * as React from 'react';

import { Title } from '../components/atoms';

const FeedbackPage = () => {
	return (
		<div className="feedback">
			<div className="feedback__title">
				<Title>Feedback</Title>
			</div>
			<div className="feedback__description">
				We are happy to hear your feedback on how we can improve our platform. Please feel free to email us
				at&nbsp;
				<span className="feedback__email">feedback@jaffna.guide</span> with any suggestions that you may have.
				We are constantly trying to make the user experience on our platform as smooth as possible. Therefore,
				your input is invaluable for us.
			</div>
			<ul className="feedback__contribution-list">
				<li className="feedback__contribution-item">
					<strong>Photos:</strong> If you have good photographs from any of the places listed on our platform
					that you are willing you share with the world, we would be happy to receive them via email. Please
					provide some context about the photo such as where and when it was taken. We give you credit for the
					photos that you provide. Just let us know the credit text, i.e. "@ramasamy (Australia)" or
					"Firstname Lastname", which we will engrave into the photo. We ask for raw photos upon which we add
					the credit text in order to maintain the same look and feel across all photos.
				</li>
				<li className="feedback__contribution-item">
					<strong>Research:</strong> We are not into copying Wikipedia or other travel site as source for our
					place details. Jaffna has a rich history and culture which makes it tricky sometimes to understand
					the full meaning and value for cultural places in particular. We welcome well researched knowledge
					that we can add to our platform.
				</li>
				<li className="feedback__contribution-item">
					<strong>Grammar/Wording:</strong> We are just recent graduates and are still in the process of
					improving our English skills. If you have suggestions on how to improve the structure and/or the
					wording of certain sentences feel addressed to reach out. Both, input for English as well as for
					Tamil is equally welcome.
				</li>
				<li className="feedback__contribution-item">
					<strong>Feature requests:</strong> if you have suggestions for new features we would be thrilled to
					learn more about them. Please provide a detailed description on how the traveller experience can be
					enhanced. If technically feasible and useful in nature we will try our best to make that feature a
					reality.
				</li>
			</ul>
		</div>
	);
};

export default FeedbackPage;
