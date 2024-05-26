const connection = require("../database");
const dayjs = require("dayjs");

const get_history_bet = async (req, res) => {
  const { uid } = req.user;
  const { page = 1, fromDate, toDate, status } = req.query;
  const limit = 10; // Số lượng bản ghi mỗi trang
  const offset = (page - 1) * limit;

  try {
    // Chuyển đổi định dạng ngày giờ từ định dạng "Wed May 22 2024 02:25:08 GMT+0700 (Indochina Time)"
    const fromDateFormatted = fromDate
      ? dayjs(new Date(fromDate)).format(
          "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ [(Indochina Time)]"
        )
      : null;
    const toDateFormatted = toDate
      ? dayjs(new Date(toDate)).format(
          "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ [(Indochina Time)]"
        )
      : null;

    // Xây dựng câu truy vấn SQL với điều kiện tìm kiếm
    let query = `
      SELECT bet.*, user.*, session.* FROM bet 
      INNER JOIN user ON bet.user_id = user.id 
      LEFT JOIN session ON session.session_id = bet.session_id 
      WHERE bet.user_id = ?
    `;

    // Thêm điều kiện cho ngày bắt đầu
    if (fromDateFormatted) {
      query += ` AND STR_TO_DATE(bet.time_created, '%a %b %d %Y %H:%i:%s GMT%z (Indochina Time)') >= STR_TO_DATE('${fromDateFormatted}', '%a %b %d %Y %H:%i:%s GMT%z (Indochina Time)')`;
    }

    // Thêm điều kiện cho ngày kết thúc
    if (toDateFormatted) {
      query += ` AND STR_TO_DATE(bet.time_created, '%a %b %d %Y %H:%i:%s GMT%z (Indochina Time)') <= STR_TO_DATE('${toDateFormatted}', '%a %b %d %Y %H:%i:%s GMT%z (Indochina Time)')`;
    }

    // Thêm sắp xếp và phân trang
    query += ` ORDER BY bet.time_created DESC LIMIT ? OFFSET ?`;

    // Thực hiện truy vấn
    const [rows] = await connection.query(query, [uid, limit, offset]);

    // Đếm tổng số bản ghi
    let countQuery = `
      SELECT COUNT(*) as total 
      FROM bet 
      INNER JOIN user ON bet.user_id = user.id 
      LEFT JOIN session ON session.session_id = bet.session_id 
      WHERE bet.user_id = ?
    `;

    if (fromDateFormatted) {
      countQuery += ` AND STR_TO_DATE(bet.time_created, '%a %b %d %Y %H:%i:%s GMT%z (Indochina Time)') >= STR_TO_DATE('${fromDateFormatted}', '%a %b %d %Y %H:%i:%s GMT%z (Indochina Time)')`;
    }

    if (toDateFormatted) {
      countQuery += ` AND STR_TO_DATE(bet.time_created, '%a %b %d %Y %H:%i:%s GMT%z (Indochina Time)') <= STR_TO_DATE('${toDateFormatted}', '%a %b %d %Y %H:%i:%s GMT%z (Indochina Time)')`;
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
    return res.json({ ok: false });
  }
};

module.exports = get_history_bet;
