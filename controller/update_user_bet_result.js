const connection = require("../database");

const update_user_bet_result = async (req, res) => {
  try {
    const { uid } = req.user;
    const { id, final1, final2, number, result } = req.body;
    const [rows] = await connection.query(
      "SELECT val1, val2, betMoney FROM bet WHERE session_id= ? AND user_id= ?",
      [id, uid]
    );
    if (rows?.length > 0) {
      const val1 = parseInt(rows[0].val1);
      const val2 = parseInt(rows[0].val2);
      const betMoney = parseInt(rows[0].betMoney);
      const totalFinal = parseInt(final1) + parseInt(final2);
      const totalBet = val1 + val2;
      if (
        (totalBet <= 10 && totalFinal <= 10) ||
        (totalBet > 10 && totalFinal > 10)
      ) {
        await connection.query(
          "UPDATE user SET balance = balance + ? WHERE id = ?",
          [betMoney, uid]
        );
      } else {
        await connection.query(
          "UPDATE user SET balance = balance - ? WHERE id = ?",
          [betMoney, uid]
        );
      }
      return res.json({ ok: true });
    }
    return res.json({ ok: false });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, message: "Có lỗi bất ngờ xảy ra từ server" });
  }
};

module.exports = update_user_bet_result;
