const connection = require("../database");
const dayjs = require("dayjs");

const get_history_bet = async (req, res) => {
  const { uid } = req.user;
  const { page = 1, fromDate, toDate, status } = req.query;
  const limit = 10; // Number of records per page
  const offset = (page - 1) * limit;

  try {
    // Convert dates to UNIX timestamps
    const fromDateTimestamp = fromDate ? dayjs(fromDate).unix() : null;
    const toDateTimestamp = toDate ? dayjs(toDate).unix() : null;
    // console.log(fromDateTimestamp)
    // Build SQL query with search conditions
    let query = `
      SELECT bet.*, user.*, session.* 
      FROM bet 
      INNER JOIN user ON bet.user_id = user.id 
      INNER JOIN session ON session.session_id = bet.session_id 
      WHERE bet.user_id = ?
    `;

    // Add condition for start date
    if (fromDateTimestamp) {
      query += ` AND UNIX_TIMESTAMP(STR_TO_DATE(SUBSTRING(bet.time_created, 5, 20), '%b %d %Y %H:%i:%s')) >= ${fromDateTimestamp}`;
    }

    // Add condition for end date
    if (toDateTimestamp) {
      query += ` AND UNIX_TIMESTAMP(STR_TO_DATE(SUBSTRING(bet.time_created, 5, 20), '%b %d %Y %H:%i:%s')) <= ${toDateTimestamp}`;
    }

    // Add sorting and pagination
    query += ` ORDER BY bet.timeInt DESC LIMIT ? OFFSET ?`;

    // Execute query
    const [rows] = await connection.query(query, [uid, limit, offset]);

    // Count total records
    let countQuery = `
      SELECT COUNT(*) as total 
      FROM bet 
      INNER JOIN user ON bet.user_id = user.id 
      LEFT JOIN session ON session.session_id = bet.session_id 
      WHERE bet.user_id = ?
    `;

    if (fromDateTimestamp) {
      countQuery += ` AND UNIX_TIMESTAMP(STR_TO_DATE(bet.time_created, '%a %b %d %Y %H:%i:%s GMT%z (Indochina Time)')) >= ${fromDateTimestamp}`;
    }

    if (toDateTimestamp) {
      countQuery += ` AND UNIX_TIMESTAMP(STR_TO_DATE(bet.time_created, '%a %b %d %Y %H:%i:%s GMT%z (Indochina Time)')) <= ${toDateTimestamp}`;
    }

    const [countRows] = await connection.query(countQuery, [uid]);

    const total = countRows[0].total;
    const totalPages = Math.ceil(total / limit);

    return res.json({
      ok: true,
      data: rows,
      totalPages,
      currentPage: parseInt(page, 10),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, error: "Internal server error" });
  }
};

module.exports = get_history_bet;
