const express = require('express');
const bodyParser = require('body-parser');
const requireAuth = require('../middlewares/authorization');
const multer = require('multer');
const submissionController = require('../controllers/submissionController');

const router = express.Router();

const jsonParser = bodyParser.json({
    limit: '40mb',
    type: 'application/json'
});

const storage = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, 'test_submissions/');
        },
        filename: function (req, file, cb) {
            cb(
                null,
                new Date().valueOf() + 
                '_' +
                file.originalname
            );
        }
    }
);

const subUpload = multer({
    storage: storage,
});

router.post('/submit', jsonParser, requireAuth, subUpload.single('submission_file'), submissionController.add_submission);
router.get('/:id', jsonParser, requireAuth, submissionController.get_submission_by_id);
router.get('/', jsonParser, requireAuth, submissionController.get_submissions);
router.put('/:id', jsonParser, requireAuth, submissionController.update_submission_status_by_id);


module.exports = router;