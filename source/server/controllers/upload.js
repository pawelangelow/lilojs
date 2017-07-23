'use strict';

const router = require('express').Router();
const uploadService = require('../services/fileUpload');

module.exports = router;

router.post('/', (req, res) => {
	uploadService
		.uploadFile(req)
		.then((fileName) => res.json({data: fileName}))
		.catch((err) => console.log(err));
});
