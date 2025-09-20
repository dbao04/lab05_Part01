const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Supplier = require('../models/Supplier');
router.get('/', async (req, res) => {
  const suppliers = await Supplier.find().sort('name');
  const { supplier: supplierId, q } = req.query;
  const filter = {};
  if (supplierId) filter.supplier = supplierId;
  if (q) filter.name = { $regex: q, $options: 'i' };
  const products = await Product.find(filter).populate('supplier').limit(50);
  res.render('index', { suppliers, products, query: req.query });
});
module.exports = router;