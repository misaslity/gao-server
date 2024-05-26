const connection = require("../database");

const get_last_user_betting = async (req, res) => {
  try {
    const { uid } = req.user;
    const [rows] = await connection.query(
      "SELECT val1, val2, number, result FROM bet INNER JOIN session ON bet.session_id = session.session_id  WHERE bet.user_id= ? ORDER BY bet.id DESC LIMIT 5",
      [uid]
    );

    return res.json({ ok: true, data: rows });
  } catch (error) {
    console.log(error);
    return res.json({ ok: false });
  }
};

module.exports = get_last_user_betting;
