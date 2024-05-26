const connection = require("../database");

const update_user = async (req, res) => {
  try {
    const { uid } = req.user;
    const { account, username } = req.body;
    await connection.query("UPDATE user SET username= ? WHERE id= ?", [
      username,
      uid,
    ]);
    return res.json({ ok: true, message: "Cập nhật thông tin thành công"});
  } catch (error) {
    return res.json({ ok: false, message: "Có lỗi bất ngờ xảy ra" });
  }
};

module.exports = update_user;
