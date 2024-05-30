const connection = require("../database");

const get_user_banking = async (req, res) => {
  try {
    const { uid } = req.user;
    const [rows] = await connection.query(
      "SELECT account_name, account_number, bank_name, branch FROM user WHERE id= ?",
      [uid]
    );

    return res.json({ ok: true, data: rows[0] });
  } catch (error) {
    console.log(error);
    return res.json({ ok: false });
  }
};

module.exports = get_user_banking;
