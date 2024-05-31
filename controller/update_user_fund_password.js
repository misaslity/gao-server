const connection = require("../database");
const bcrypt = require('bcryptjs');

const update_user_fund_password = async (req, res) => {
  try {
    const { uid } = req.user;
    const {fundPassword}= req.body
    const hashedPassword = await bcrypt.hash(fundPassword, 10);
    await connection.query(
      "UPDATE user SET fund_password= ? WHERE id= ?",
      [hashedPassword, uid]
    );
    
    return res.json({ ok: true, message: "Cập nhật mật khẩu quỹ thành công" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, message: "Có lỗi bất ngờ xảy ra từ server" });
  }
};

module.exports = update_user_fund_password;
