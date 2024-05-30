const connection = require("../database");

const update_user_banking = async (req, res) => {
  try {
    const { uid } = req.user;
    const { accountName, accountNumber, branch, bankName } = req.body;
    // const { account, username } = req.body;
    await connection.query(
      "UPDATE user SET account_name= ?, account_number= ?, bank_name=? , branch= ? WHERE id= ?",
      [accountName, accountNumber, bankName, branch, uid]
    );
    return res.json({ ok: true, message: "Cập nhật thông tin thành công" });
  } catch (error) {
    return res.json({ ok: false, message: "Có lỗi bất ngờ xảy ra" });
  }
};

module.exports = update_user_banking;
