'use strict';

const queueEntriesData = require('mongoose').model('QueueEntry');

exports.getQueueEntryAndDeleteIt = () => {
	return new Promise ((resolve, reject) => {
		queueEntriesData
			.find({})
			.sort({
				priority: 'desc'
			})
			.limit(1)
			.populate('submission')
			.exec()
			.then((foundEntry) => {
				if (foundEntry[0]) {
					// resolve(foundEntry[0]);
					queueEntriesData
						.findByIdAndRemove(foundEntry[0]._id)
						.then(() => {
							resolve(foundEntry[0]);
						});
				} else {
					resolve(null);
				}
			})
			.reject((err) => {
				reject(err);
			});
	});
};
