const connection = require("../database");
const bcrypt = require('bcryptjs');

const withdraw = async (req, res) => {
  try {
    const { uid } = req.user;
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const { amount, accountName, password, account, bank } = req.body;
    const [rows] = await connection.query("SELECT * FROM user WHERE id = ?", [
      uid,
    ]);
    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Mật khẩu không đúng", ok: false });
    }
    const realEnough= parseInt(amount) * 1000
    const isEnoughBalance= rows[0].balance >= realEnough
    if(isEnoughBalance!== true) {
      return res
      .status(401)
      .json({ message: "Số dư không đủ, Vui lòng thử lại với số tiền khác", ok: false });
    }

    const timeCreated = new Date().toString();
    const timeUpdated = new Date().toString();
    const status = 0;
    await connection.query(
      "INSERT INTO withdraw_history(user_id, amount, account_name, account_number, bank_name, time_created, time_updated, status, ip) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [uid, amount, accountName, account, bank, timeCreated, timeUpdated, status, ip]
    );
    return res.json({ ok: true, message: "Đã xác nhận" });
  } catch (error) {
    console.log(error);
    return res.json({ ok: false, message: "Có lỗi xảy ra" });
  }
};

module.exports = withdraw;
