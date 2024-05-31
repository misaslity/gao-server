const connection = require("../database");

const update_user_bet_result = async (req, res) => {
  try {
    const { uid } = req.user;
    const { id, final1, final2, number, result } = req.body;
    const [rows] = await connection.query(
      "SELECT betMoney, bet FROM bet WHERE session_id= ? AND user_id= ?",
      [id, uid]
    );
    if (rows?.length > 0) {
      const bet= rows[0].bet
      const betMoney = parseInt(rows[0].betMoney);
      const totalFinal = parseInt(final1) + parseInt(final2);
      // win
      if (
        ((totalFinal <= 10 && bet == 1) || (totalFinal > 10 && bet == 2))
      ) {
        await connection.query(
          "UPDATE user SET balance = balance + ? WHERE id = ?",
          [betMoney * 2, uid]
        );
      }
      //  lose
      else {
        await connection.query(
          "UPDATE user SET balance = balance WHERE id = ?",
          [uid]
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
