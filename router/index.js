const router = require('express').Router();
const UserController = require('../controllers/UserController');
const ProductController = require('../controllers/ProductController');
const authentication = require('../middlewares/authentication');

router.post('/admin/register', UserController.register);
router.post('/admin/login', UserController.login);

router.use(authentication);
router.get('/products', ProductController.getAll);
router.post('/products', ProductController.addData);
router.put('/products/:id', ProductController.editData);
router.delete('/products/:id', ProductController.removeData);


module.exports = router;