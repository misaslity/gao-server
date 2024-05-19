const connection = require("../database");

function generateRandomNumbers() {
  const randomNumber = Math.floor(Math.random() * 100000);
  const formattedRandomNumber = randomNumber.toString().padStart(5, "0");
  return formattedRandomNumber;
}

const adjust_result = async (req, res) => {
  const { val1, val2, val3, val4, val5 } = req.body;
  try {
    await connection.query("INSERT INTO reserve(result) VALUES (?)", [
      val1 + val2 + val3 + val4 + val5,
    ]);
    return res.json({ ok: true });
  } catch (error) {
    console.log(error);
    return res.json({ ok: false });
  }
};

module.exports = adjust_result;
