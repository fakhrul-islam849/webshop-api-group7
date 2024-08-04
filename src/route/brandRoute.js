const express = require('express');
const BrandController = require('../controllers/BrandController');

const router = express.Router();
const auth = require('../middlewares/auth');

const brandController = new BrandController();

router.get('/data-table', auth(), brandController.brandDataTable);
router.get('/:id', auth(), brandController.brandDetails);
router.post('/', auth(), brandController.brandCreate);
router.put('/:id', auth(), brandController.brandUpdate);

// public route
router.get('/public/get-list', brandController.getBrandList);
router.get('/public/all-brands', brandController.getAllBrandList);
router.get('/public/get-list/by-pharma-id', brandController.getBrandListByPharmaId);
router.get('/low/stock-list', auth(), brandController.lowStock);

module.exports = router;
