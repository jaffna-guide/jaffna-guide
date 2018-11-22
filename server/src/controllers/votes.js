import { Place, Vote } from '../models';

export const vote = async (req, res) => {
	const votesToBeAdded = req.body.votes;
	const placeToUpvote = Place.findById(req.params.placeId);
	const userToUpvote = req.user;
	const categoryToUpvote = placeToUpvote.category;

	// check whether current year vote exists
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
	}

	res.status(200).send(placeToUpvote.votes);
};

export const undoVote = async (req, res) => {
	const placeToUndoVote = Place.findById(req.params.placeId);
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

export const getCurrentVotes = async (req, res) => {
	const { userId, placeId, placeBody } = req.body;
	let place;

	if (userId && (placeId || placeBody)) {
		if (placeId) {
			place = await Place.findOne({ _id: placeId });
		} else {
			place = await Place.findOne({ body: placeBody });
		}

		const user = req.user;
		const vote = await Vote.findOne({ place, user });

		if (!vote) return res.status(404).send('User has not voted for this place yet.');

		return res.status(200).send(vote);
	}

	if (userId) {
		const user = req.user;
		const votes = await Vote.find({ user });
		return res.status(200).send(votes);
	}

	if (placeId || placeBody) {
		if (placeId) {
			place = await Place.findOne({ _id: placeId });
		} else {
			place = await Place.findOne({ body: placeBody });
		}

		const votes = await Vote.find({ place });
		return res.status(200).send(votes);
	}

	res.status(400).send('Either userId and/or placeId/placeBody is/are required.');
};
