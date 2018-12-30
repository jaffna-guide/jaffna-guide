// PhotosController
import { Photo, Love } from '../models';

export const togglePhotoLove = async (req, res) => {
  const photoToBeUpdated = await Photo.findById(req.params.photoId).populate('loves');
  const userLove = photoToBeUpdated.loves.findOne({ user: req.user });

  if (userLove) {
    photoToBeUpdated.loves.pull(userLove._id);
    await photoToBeUpdated.save();
    Love.findByIdAndRemove(userLove._id);

    res.status(200).send(photoToBeUpdated);
  } else {
    const love = new Love({
      user: req.user,
    });
    await love.save();
    photoToBeUpdated.loves.push(love);
    await photoToBeUpdated.save();

    res.status(200).send(photoToBeUpdated);
  }
};
