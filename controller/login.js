const connection = require("../database");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
  const { password, account } = req.body;

  try {
    // Kiểm tra người dùng có tồn tại trong cơ sở dữ liệu không
    const [rows] = await connection.query("SELECT * FROM user WHERE account = ?", [
      account
    ]);
    const user = rows[0];

    if (!user) {
      return res
        .status(401)
        .json({ message: "Tên tài khoản hoặc mật khẩu không đúng", ok: false });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Tên tài khoản hoặc mật khẩu không đúng", ok: false });
    }
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const timeLogin= new Date().toString()
    await connection.query("UPDATE user SET ip_login= ?, time_last_login= ? WHERE id= ?", [ip, timeLogin, user.id])
    // Tạo token JWT
    const token = jwt.sign({ uid: user.id, role: user.role }, "1245678", {
      expiresIn: "24h",
    });

    res.json({ token, ok: true, message: "Đăng nhập thành công" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Đã xảy ra lỗi, vui lòng thử lại sau", ok: false });
  }
};
