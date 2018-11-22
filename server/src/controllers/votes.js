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
