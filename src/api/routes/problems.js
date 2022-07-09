const bodyParser = require('body-parser');
const express = require('express');
const requireAuth = require('../middlewares/authorization');
const problemController = require('../controllers/problemController');
const multer = require('multer');

const router = express.Router();

const jsonParser = bodyParser.json({
    limit: '40mb',
    type: 'application/json'
});

const storage = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, 'test_io/');
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
)

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "text/plain") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('.txt format allowed!'));
        }
    }
});

const testUpload = multer({
    storage: storage,
})
.fields(
    [
        {name: 'test_input', maxCount: 1},
        {name: 'test_output', maxCount: 1}
    ]
)

router.get('/:id', jsonParser, problemController.get_problem_by_id);
router.get('/', jsonParser, problemController.get_problems);
router.post('/', jsonParser, requireAuth, testUpload, problemController.add_problem);

module.exports = router;