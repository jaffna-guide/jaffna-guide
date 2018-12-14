import * as React from 'react';

import { Title, Icon } from '../components/atoms';
import { ReactComponent as NodeJsLogo } from '../assets/nodejs.svg';
import { ReactComponent as MobXLogo } from '../assets/mobx.svg';
import { ReactComponent as ReactLogo } from '../assets/react.svg';
import { ReactComponent as MongoDBLogo } from '../assets/mongodb.svg';
import { ReactComponent as DraftJSLogo } from '../assets/draftjs.svg';

const AboutPage = () => {
	return (
		<div className="about">
			<div className="about__title">
				<Title>About</Title>
			</div>

			<div className="about__description">
				<p className="about__description--p1">
					<i>The Jaffna Guide</i> is a joint venture between <a href="http://uki.life/">Uki Coding School</a>{' '}
					batch 3 graduates and <a href="https://soosap.co">soosap GmbH</a> software engineering based in
					Switzerland. The project has been designed and built by Jaffna residents.
				</p>

				<p className="about__description--p2">
					Most travel guides present our city from a purely touristic point of view chasing visitors from one
					iconic landmark to another while providing wikipedia-type information. With the Jaffna Guide we
					invite you to experience the treasures of our beautiful city through an alternative lens, our eyes.
				</p>
			</div>
			<div className="about__members">
				<ul className="about__member-list">
					<li className="about__member">
						<div className="about__chip">
							<div className="about__chip-initials about__chip-initials--1">DH</div>
							<div className="about__chip-text">Darshana H.</div>
						</div>
					</li>
					<li className="about__member">
						<div className="about__chip">
							<div className="about__chip-initials about__chip-initials--2">VP</div>
							<div className="about__chip-text">Vavitha P.</div>
						</div>
					</li>
					<li className="about__member">
						<div className="about__chip">
							<div className="about__chip-initials about__chip-initials--3">SJ</div>
							<div className="about__chip-text">Shanuja J.</div>
						</div>
					</li>
					<li className="about__member">
						<div className="about__chip">
							<div className="about__chip-initials about__chip-initials--4">BB</div>
							<div className="about__chip-text">Babitha B.</div>
						</div>
					</li>
					<li className="about__member">
						<div className="about__chip">
							<div className="about__chip-initials about__chip-initials--5">TT</div>
							<div className="about__chip-text">Tharshana T.</div>
						</div>
					</li>
					<li className="about__member">
						<div className="about__chip">
							<div className="about__chip-initials about__chip-initials--6">PS</div>
							<div className="about__chip-text">Prasath S.</div>
						</div>
					</li>
				</ul>
			</div>
			<div className="about__technology">
				<div className="about__description">
					We use a number of modern server and client technologies to build the features of{' '}
					<i>The Jaffna Guide</i>.
				</div>
				<div className="about__tech-stack">
					<a className="about__technology" href="https://reactjs.org/">
						<Icon className="about__tech-icon about__tech-icon--react" icon={ReactLogo} />
					</a>
					<a className="about__technology" href="https://mobx.js.org/">
						<Icon className="about__tech-icon about__tech-icon--mobx" icon={MobXLogo} />
					</a>
					<a className="about__technology" href="https://nodejs.org/">
						<Icon className="about__tech-icon about__tech-icon--nodejs" icon={NodeJsLogo} />
					</a>
					<a className="about__technology" href="https://www.mongodb.com/">
						<Icon className="about__tech-icon about__tech-icon--mongodb" icon={MongoDBLogo} />
					</a>
					<a className="about__technology about__technology--draftjs" href="https://draftjs.org/">
						<Icon className="about__tech-icon about__tech-icon--draftjs" icon={DraftJSLogo} />
						<span>Draft.js</span>
					</a>
				</div>
			</div>
		</div>
	);
};

export default AboutPage;
