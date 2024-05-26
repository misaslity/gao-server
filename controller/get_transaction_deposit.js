const connection = require("../database");

const getTransactionDeposit = async (req, res) => {
  try {
    let { page, limit } = req.query;
    const offset = (page - 1) * limit;
    limit = parseInt(limit);
    page = parseInt(page);
    // Thực hiện truy vấn với limit và offset
    const [rows] = await connection.query(
      "SELECT *, deposit_history.id AS id FROM deposit_history LEFT JOIN user ON user.id = deposit_history.user_id ORDER BY deposit_history.id DESC LIMIT ? OFFSET ?",
      [limit, offset]
    );

    // Lấy tổng số trang
    const [totalCountRows] = await connection.query(
      "SELECT COUNT(*) as count FROM deposit_history"
    );
    const totalCount = totalCountRows[0].count;
    const totalPages = Math.ceil(totalCount / limit);

    return res.json({ ok: true, data: rows, totalPages: totalPages });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, error: "Internal server error" });
  }
};

module.exports = getTransactionDeposit;
