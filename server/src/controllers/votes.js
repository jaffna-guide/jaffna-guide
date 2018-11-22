import { Place, Vote } from '../models';

export const vote = async (req, res) => {
	const { votesToBeAdded } = req.body;
	if (!votesToBeAdded) return res.status(400).send('votesToBeAdded is a required parameter.');
	if (votesToBeAdded > 3 || votesToBeAdded <= 0) {
		return res.status(400).send('Invalid value provided for votesToBeAdded. Must range between 1 and 3.');
	}

	const placeToUpvote = await Place.findOne({ body: req.params.placeBody }).populate('category');
	const userToUpvote = req.user;
	const categoryToUpvote = placeToUpvote.category;

	const beginningOfCurrentYear = new Date(new Date().getFullYear(), 0, 1);
	const beginningOfNextYear = new Date(new Date().getFullYear() + 1, 0, 1);
	const existingVote = await Vote.findOne({
		place: placeToUpvote,
		user: userToUpvote,
		votedAt: { $gte: beginningOfCurrentYear, $lt: beginningOfNextYear },
	});

	if (existingVote) {
		existingVote.votes = votesToBeAdded;
		existingVote.votedAt = Date.now();
		await existingVote.save();

		placeToUpvote.votes -= existingVote.votes;
		placeToUpvote.votes += votesToBeAdded;
		await placeToUpvote.save();

		userToUpvote.votes[categoryToUpvote.body] += existingVote.votes;
		userToUpvote.votes[categoryToUpvote.body] -= votesToBeAdded;
		await userToUpvote.save();

		return res.status(200).send({ place: placeToUpvote.votes, user: userToUpvote.votes[categoryToUpvote.body] });
	} else if (votesToBeAdded <= userToUpvote.votes[categoryToUpvote.body]) {
		const vote = new Vote({
			place: placeToUpvote,
			user: userToUpvote,
			category: categoryToUpvote,
			votes: votesToBeAdded,
			votedAt: Date.now(),
		});

		await vote.save();

		placeToUpvote.votes += votesToBeAdded;
		await placeToUpvote.save();

		userToUpvote.votes[categoryToUpvote.body] -= votesToBeAdded;
		await userToUpvote.save();

		return res.status(200).send({ place: placeToUpvote.votes, user: userToUpvote.votes[categoryToUpvote.body] });
	}
};

export const undoVote = async (req, res) => {
	const placeToUndoVote = Place.findOne({ body: req.params.placeBody });
	const userToUndoVote = req.user;
	const categoryToUndoVote = placeToUpvote.category;

	const beginningOfCurrentYear = new Date(new Date().getFullYear(), 0, 1);
	const beginningOfNextYear = new Date(new Date().getFullYear() + 1, 0, 1);
	const existingVote = await Vote.findOne({
		place: placeToUndoVote,
		user: userToUndoVote,
		votedAt: { $gte: beginningOfCurrentYear, $lt: beginningOfNextYear },
	});

	if (existingVote) {
		userToUndoVote.votes[categoryToUndoVote.body] += existingVote.votes;
		await userToUndoVote.save();

		placeToUndoVote.votes -= existingVote.votes;
		await placeToUndoVote.save();

		await existingVote.delete();
		res.status(200).send({ place: placeToUndoVote.votes, user: userToUndoVote.votes[categoryToUndoVote.body] });
	} else {
		res.sendStatus(400);
	}
};

export const getLatestVotes = async (req, res) => {
	const beginningOfCurrentYear = new Date(new Date().getFullYear(), 0, 1);
	const beginningOfNextYear = new Date(new Date().getFullYear() + 1, 0, 1);
	const { placeBody, userId } = req.params;

	let q = Vote.find({ votedAt: { $gte: beginningOfCurrentYear, $lt: beginningOfNextYear } });

	if (placeBody) {
		const place = Place.find({ body: placeBody });
		q = q.find({ place });
	}

	if (userId) {
		q = q.find({ user: userId });
	}

	const votes = await q.exec();
	return res.status(200).send(votes);
};
