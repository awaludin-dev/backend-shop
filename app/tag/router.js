const router = require('express').Router();
const { police_check } = require('../../middlewares');
const tagController = require('./controller');

router.get('/tag', tagController.index);
router.get('/tag/:id', tagController.search);
router.post('/tag/', 
    police_check('create', 'Tag'),
    tagController.store
);
router.put('/tag/:id', 
    police_check('update', 'Tag'),
    tagController.update
);
router.delete('/tag/:id', 
    police_check('delete', 'Tag'),
    tagController.destroy
);

module.exports = router;