const router = require('express').Router();
const UserController = require('../controllers/UserController');
const ProductController = require('../controllers/ProductController');
const OrderController = require('../controllers/OrderController');
const authentication = require('../middlewares/authentication');
const { Admin, Customer } = require('../middlewares/userRole');

router.post('/admin/register', Admin, UserController.register);
router.post('/customer/register', Customer, UserController.register);
router.post('/login', UserController.login);

router.get('/products', ProductController.getAll);
router.use(authentication);
router.post('/products', ProductController.addData);
router.put('/products/:id', ProductController.editData);
router.delete('/products/:id', ProductController.removeData);

router.get('/cart', OrderController.getCart);
router.post('/cart', OrderController.addToCart);
router.delete('/cart', OrderController.deleteFromCart);


module.exports = router;