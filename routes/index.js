const router = require('express').Router()

// Import our modular routers for /db 
const dbRouter = require('./db');
const noteRouter = require('./notes');

router.use('/db', dbRouter);
router.use('/notes', noteRouter)


module.exports = router;
