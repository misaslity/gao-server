const connection = require("../database");

const update_user_banking_admin = async (req, res) => {
  try {
    const { bank_name, branch, account_number, id } = req.body;
    const timeUpdated= new Date().toString()
    await connection.query(
      "UPDATE user SET bank_name= ?, branch= ?, account_number= ?, time_update_bank= ? WHERE id= ?",
      [bank_name, branch, account_number, timeUpdated, id]
    );
    return res.json({ ok: true, message: "Cập nhật người dùng thành công" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, message: "Có lỗi bất ngờ xảy ra từ server" });
  }
};

module.exports = update_user_banking_admin;
