import { Place, Vote, User } from '../models';

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
		const voteDelta = -1 * existingVote.votes + votesToBeAdded;
		const upvotedPlace = await Place.findByIdAndUpdate(
			placeToUpvote._id,
			{ $inc: { votes: voteDelta } },
			{ new: true },
		);

		const upvotedUser = await User.findByIdAndUpdate(
			userToUpvote._id,
			{ $inc: { [`votes.${categoryToUpvote.body}`]: existingVote.votes + -1 * votesToBeAdded } },
			{ new: true },
		);

		existingVote.votes = votesToBeAdded;
		existingVote.votedAt = Date.now();
		await existingVote.save();

		return res.status(200).send({ place: upvotedPlace.votes, user: upvotedUser.votes[categoryToUpvote.body] });
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

		const upvotedUser = await User.findByIdAndUpdate(
			userToUpvote._id,
			{ $inc: { [`votes.${categoryToUpvote.body}`]: -1 * votesToBeAdded } },
			{ new: true },
		);

		return res.status(200).send({ place: placeToUpvote.votes, user: upvotedUser.votes[categoryToUpvote.body] });
	}
};

export const undoVote = async (req, res) => {
	const placeToUndoVote = await Place.findOne({ body: req.params.placeBody }).populate('category');
	const userToUndoVote = req.user;
	const categoryToUndoVote = placeToUndoVote.category;

	const beginningOfCurrentYear = new Date(new Date().getFullYear(), 0, 1);
	const beginningOfNextYear = new Date(new Date().getFullYear() + 1, 0, 1);
	const existingVote = await Vote.findOne({
		place: placeToUndoVote,
		user: userToUndoVote,
		votedAt: { $gte: beginningOfCurrentYear, $lt: beginningOfNextYear },
	});

	if (existingVote) {
		const unvotedPlace = await Place.findByIdAndUpdate(
			placeToUndoVote._id,
			{ $inc: { votes: -1 * existingVote.votes } },
			{ new: true },
		);

		const unvotedUser = await User.findByIdAndUpdate(
			userToUndoVote._id,
			{ $inc: { [`votes.${categoryToUndoVote.body}`]: existingVote.votes } },
			{ new: true },
		);

		await existingVote.delete();

		res.status(200).send({ place: unvotedPlace.votes, user: unvotedUser.votes[categoryToUndoVote.body] });
	} else {
		res.sendStatus(400);
	}
};

export const getLatestVotes = async (req, res) => {
	const beginningOfCurrentYear = new Date(new Date().getFullYear(), 0, 1);
	const beginningOfNextYear = new Date(new Date().getFullYear() + 1, 0, 1);
	const { placeBody, userId } = req.query;

	let q = Vote.find({ votedAt: { $gte: beginningOfCurrentYear, $lt: beginningOfNextYear } });

	if (placeBody) {
		const place = await Place.find({ body: placeBody });
		console.log('place', place);
		q = q.find({ place });
	}

	if (userId) {
		q = q.find({ user: userId });
	}

	const votes = await q.exec();
	console.log('votes', votes);

	return res.status(200).send(votes);
};
