const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Danh sách sản phẩm
router.get('/', productController.list);

// Form thêm sản phẩm
router.get('/create', productController.showCreate);
router.post('/create', productController.create);

// Form sửa sản phẩm
router.get('/:id/edit', productController.showEdit);
router.post('/:id/edit', productController.edit);

// Xóa sản phẩm
router.post('/:id/delete', productController.delete);

module.exports = router;

const { ensureAuth } = require('../middleware/auth');

router.get('/', ensureAuth, productController.list);
router.get('/create', ensureAuth, productController.showCreate);
router.post('/create', ensureAuth, productController.create);
router.get('/:id/edit', ensureAuth, productController.showEdit);
router.post('/:id/edit', ensureAuth, productController.edit);
router.post('/:id/delete', ensureAuth, productController.delete);

module.exports = router;