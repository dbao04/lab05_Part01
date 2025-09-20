const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

// Danh sách
router.get('/', supplierController.list);

// Form thêm
router.get('/create', supplierController.showCreate);
router.post('/create', supplierController.create);

// Form sửa
router.get('/:id/edit', supplierController.showEdit);
router.post('/:id/edit', supplierController.edit);

// Xóa
router.post('/:id/delete', supplierController.delete);

module.exports = router;


const { ensureAuth } = require('../middleware/auth');

router.get('/', ensureAuth, supplierController.list);
router.get('/create', ensureAuth, supplierController.showCreate);
router.post('/create', ensureAuth, supplierController.create);
router.get('/:id/edit', ensureAuth, supplierController.showEdit);
router.post('/:id/edit', ensureAuth, supplierController.edit);
router.post('/:id/delete', ensureAuth, supplierController.delete);

module.exports = router;