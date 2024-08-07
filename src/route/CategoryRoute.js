const express = require('express');

const CategoryController = require('../controllers/CategoryController');

const router = express.Router();
const auth = require('../middlewares/auth');

const CategoryController = new CategoryController();

router.get('/data-table', auth(), CategoryController.CategoryDataTable);
router.get('/', CategoryController.getAllCategory);
router.post('/', auth(), CategoryController.CategoryCreate);
router.put('/:id', auth(), CategoryController.CategoryUpdate);
router.get('/:id', auth(), CategoryController.getCategory);
router.delete('/:id', auth(), CategoryController.deleteCategory);

// public route
router.get('/public/get-list', CategoryController.getCategoryList);
router.get('/public/get-Category/:id', CategoryController.getCategoryById);
router.get('/public/all-dashboard-data', CategoryController.getDashboardData);

module.exports = router;
