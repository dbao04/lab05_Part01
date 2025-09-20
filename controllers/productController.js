const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

// Danh sách sản phẩm
exports.list = async(req, res) => {
    const products = await Product.find().populate('supplier').sort('name');
    res.render('products/list', { products });
};

// Hiển thị form thêm
exports.showCreate = async(req, res) => {
    const suppliers = await Supplier.find().sort('name');
    res.render('products/form', { product: null, suppliers });
};

// Xử lý thêm
exports.create = async(req, res) => {
    const { name, price, quantity, supplier } = req.body;
    await Product.create({ name, price, quantity, supplier });
    res.redirect('/products');
};

// Hiển thị form sửa
exports.showEdit = async(req, res) => {
    const product = await Product.findById(req.params.id);
    const suppliers = await Supplier.find().sort('name');
    res.render('products/form', { product, suppliers });
};

// Xử lý sửa
exports.edit = async(req, res) => {
    const { name, price, quantity, supplier } = req.body;
    await Product.findByIdAndUpdate(req.params.id, { name, price, quantity, supplier });
    res.redirect('/products');
};

// Xử lý xóa
exports.delete = async(req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
};