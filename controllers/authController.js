const User = require('../models/User');

// Hiển thị form đăng ký
exports.showRegister = (req, res) => {
    res.render('auth/register');
};

// Xử lý đăng ký
exports.register = async(req, res) => {
    const { username, password, confirm } = req.body;

    if (password !== confirm) {
        return res.send('Mật khẩu nhập lại không khớp');
    }

    try {
        const user = new User({ username, password });
        await user.save();
        res.redirect('/auth/login');
    } catch (err) {
        res.send('Lỗi đăng ký: ' + err.message);
    }
};

// Hiển thị form đăng nhập
exports.showLogin = (req, res) => {
    res.render('auth/login');
};

// Xử lý đăng nhập
exports.login = async(req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.send('Sai tên đăng nhập hoặc mật khẩu');

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.send('Sai tên đăng nhập hoặc mật khẩu');

    req.session.user = { id: user._id, username: user.username };
    res.redirect('/');
};

// Đăng xuất
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login');
    });
};