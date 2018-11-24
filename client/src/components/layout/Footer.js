import * as React from 'react';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';

const Footer = () => {
	return (
		<MediaQuery minWidth={580}>
			{(matches) =>
				matches ? (
					<footer className="footer">
						<div className="footer__link footer__link--about">
							<Link to="/about">About</Link>
						</div>
						<div className="footer__link footer-link--feedback">
							<Link to="/feedback">Feedback</Link>
						</div>
						<div className="footer__made-in-jaffna">
							Made with <span className="footer__heart">&#x2764;</span> in Jaffna.
						</div>
						<div className="footer__link footer__link--imprint">
							<Link to="/imprint">Imprint</Link>
						</div>
						<div className="footer__link footer__link--credit">
							<Link to="/credit">Credit</Link>
						</div>
					</footer>
				) : (
					<footer className="footer">
						<div className="footer__mobile">
							<div className="footer__link-group">
								<div className="footer__link footer__link--about">
									<Link to="/about">About</Link>
								</div>
								<div className="footer__link footer-link--feedback">
									<Link to="/feedback">Feedback</Link>
								</div>
								<div className="footer__link footer__link--imprint">
									<Link to="/imprint">Imprint</Link>
								</div>
								<div className="footer__link footer__link--credit">
									<Link to="/credit">Credit</Link>
								</div>
							</div>
							<div className="footer__made-in-jaffna">
								Made with <span className="footer__heart">&#x2764;</span> in Jaffna.
							</div>
						</div>
					</footer>
				)}
		</MediaQuery>
	);
};

export default Footer;
