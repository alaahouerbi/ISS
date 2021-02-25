var express = require( 'express' ),
    router  = express.Router();

;
router.use('/messages',require('./components/message'));
router.use('/user',require('./components/user'));
router.use('/forum',require('./components/thread'));
module.exports = router ;