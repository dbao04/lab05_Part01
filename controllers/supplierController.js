const Supplier = require('../models/Supplier');

// Danh sách nhà cung cấp
exports.list = async(req, res) => {
    const suppliers = await Supplier.find().sort('name');
    res.render('suppliers/list', { suppliers });
};

// Hiển thị form thêm
exports.showCreate = (req, res) => {
    res.render('suppliers/form', { supplier: null });
};

// Xử lý thêm
exports.create = async(req, res) => {
    const { name, address, phone } = req.body;
    await Supplier.create({ name, address, phone });
    res.redirect('/suppliers');
};

// Hiển thị form sửa
exports.showEdit = async(req, res) => {
    const supplier = await Supplier.findById(req.params.id);
    res.render('suppliers/form', { supplier });
};

// Xử lý sửa
exports.edit = async(req, res) => {
    const { name, address, phone } = req.body;
    await Supplier.findByIdAndUpdate(req.params.id, { name, address, phone });
    res.redirect('/suppliers');
};

// Xử lý xóa
exports.delete = async(req, res) => {
    await Supplier.findByIdAndDelete(req.params.id);
    res.redirect('/suppliers');
};