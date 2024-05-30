const bcrypt = require('bcryptjs');
const connection = require('../database');

exports.register = async (req, res) => {
  const { username, password, account } = req.body;
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  try {
    // Kiểm tra nếu tên người dùng đã tồn tại
    const [rows] = await connection.query('SELECT * FROM user WHERE username = ?', [username]);
    if (rows.length > 0) {
      return res.status(400).json({ message: 'Tên người dùng đã tồn tại', ok: false});
    }
    // Kiểm tra nếu tên tài khoản đã tồn tại
    const [rows1] = await connection.query('SELECT * FROM user WHERE account = ?', [account]);
    if (rows1.length > 0) {
      return res.status(400).json({ message: 'Tên tài khoản đã tồn tại', ok: false });
    }

    // Băm mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);
    const timeRegister= new Date().toString()
    // Lưu người dùng mới vào cơ sở dữ liệu
    await connection.query('INSERT INTO user (username, password, account, time_register, ip_register) VALUES (?, ?, ?, ?, ?)', [username, hashedPassword, account, timeRegister, ip]);

    res.status(201).json({ message: 'Đăng ký thành công', ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Đã xảy ra lỗi, vui lòng thử lại sau', ok: false });
  }
};
