import * as React from 'react';

const About = ({ lang }) => {
	switch (lang) {
		case 'de':
			return <div>Dieses Projekt wurde von Uki Studenten gebaut.</div>;
		case 'ta':
			return <div>Intha project uki students mulama kadhapadhathu.</div>;
		default:
			return <div>This project is developed by Uki students.</div>;
	}
};

export default About;
