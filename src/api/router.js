var express = require( 'express' ),
    router  = express.Router();

;
router.use('/user',require('./components/user'));
module.exports = router ;