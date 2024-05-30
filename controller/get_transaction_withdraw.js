const connection = require("../database");
const moment = require('moment');

const getTransactionWithdraw = async (req, res) => {
  try {
    let { page, limit, startDate, endDate } = req.query;
    const offset = (page - 1) * limit;
    limit = parseInt(limit);
    page = parseInt(page);

    // Default date range is the last 7 days if not provided
    startDate = startDate ? moment(startDate).startOf('day').unix() : moment().subtract(7, 'days').startOf('day').unix();
    endDate = endDate ? moment(endDate).endOf('day').unix() : moment().endOf('day').unix();

    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);

    // Query to fetch data with date filter
    const [rows] = await connection.query(
      `SELECT *, withdraw_history.id AS id 
       FROM withdraw_history 
       LEFT JOIN user ON user.id = withdraw_history.user_id 
       WHERE UNIX_TIMESTAMP(STR_TO_DATE(SUBSTRING(withdraw_history.time_created, 5, 20), '%b %d %Y %H:%i:%s')) BETWEEN ? AND ?
       ORDER BY withdraw_history.id DESC 
       LIMIT ? OFFSET ?`,
      [startDate, endDate, limit, offset]
    );

    console.log('Rows:', rows);

    // Query to get the total count with date filter
    const [totalCountRows] = await connection.query(
      `SELECT COUNT(*) as count 
       FROM withdraw_history 
       WHERE UNIX_TIMESTAMP(STR_TO_DATE(SUBSTRING(withdraw_history.time_created, 5, 20), '%b %d %Y %H:%i:%s')) BETWEEN ? AND ?`,
      [startDate, endDate]
    );
    const totalCount = totalCountRows[0].count;
    const totalPages = Math.ceil(totalCount / limit);

    return res.json({ ok: true, data: rows, totalPages: totalPages });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, error: "Internal server error" });
  }
};

module.exports = getTransactionWithdraw;
