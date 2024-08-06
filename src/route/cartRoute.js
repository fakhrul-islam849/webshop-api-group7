const express = require('express');
const CartController = require('../controllers/CartController');

const router = express.Router();
const userAuth = require('../middlewares/userAuth');

const cartController = new CartController();

router.get('/get-carts', userAuth(), cartController.getCarts);
router.post('/add-to-cart', userAuth(), cartController.addToCart);
router.post('/remove-from-cart', userAuth(), cartController.removeFromCart);
router.post('/cart-item-delete', userAuth(), cartController.cartItemDelete);

// favorite
router.get('/get-all-favorites-brand-ids', userAuth(), cartController.getAllFavoritesBrandIds);
router.post('/add-to-favorite', userAuth(), cartController.addToFavorite);
router.post('/remove-from-favorite', userAuth(), cartController.removeFromFavorite);
router.get('/get-favorite-list', userAuth(), cartController.getWishList);

module.exports = router;