// PhotosController
import { Photo, Like } from '../models';

export const likePlacePhoto = async (req, res) => {
	const likePopulation = {
		path: 'likes',
		select: 'user',
		populate: {
			path: 'user',
			select: 'displayName',
		},
	};
	const photoToBeUpdated = await Photo.findById(req.params.photoId).populate(likePopulation);
	const photoLike = photoToBeUpdated.likes.find((like) => like.user.displayName);

	if (photoLike) {
		await photoToBeUpdated.update({ $pull: { likes: [ photoLike._id ] } });
		await Like.findByIdAndDelete(photoLike._id);
		const updatedPhoto = await Photo.findById(photoToBeUpdated._id).populate(likePopulation);
		return res.status(200).send(updatedPhoto);
	} else {
		const like = new Like({
			user: req.user,
		});

		await like.save();
		photoToBeUpdated.likes.push(like);
		await photoToBeUpdated.save();

		const updatedPhoto = await Photo.findById(photoToBeUpdated._id).populate(likePopulation);
		return res.status(200).send(updatedPhoto);
	}
};
