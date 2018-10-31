import { Places } from '../models';

export default (app) => {
	app.get('/api/places', (req, res) => {
		Places.find({}, (err, places) => {
			res.send(places);
		});
	});
};
