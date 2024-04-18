const { render } = require('ejs');
var pool = require('../dataconfig/connectDB');
var bcrypt = require("bcryptjs");

//product

// const createaddsubject = async (req, res) => {
//     try {
//         const { _id, name, time, teacher, task } = req.body;

//         // Kiểm tra xem các trường thông tin cần thiết đã được cung cấp hay chưa
//         if (!_id || !name || !time || !teacher || !task) {
//             return res.status(400).json({
//                 message: "Thiếu thông tin cần thiết"
//             });
//         }

//         // Thực hiện câu lệnh SQL INSERT INTO để thêm môn học mới
//         const query = `
//             INSERT INTO subject (_id, name, time, teacher, task)
//             VALUES (?, ?, ?, ?, ?)
//         `;

//         await pool.execute(query, [_id, name, time, teacher, task]);

//         // Trả về thông báo thành công nếu thêm vào thành công
//         return res.status(200).json({
//             message: "Thêm môn học thành công",
//         });
//     } catch (error) {
//         // Bắt và xử lý lỗi nếu có
//         console.error('Error adding subject:', error);
//         return res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
//     }
// };

// const getSubjectsByTime = async (req, res) => {
//     try {
//         const query = `
//             SELECT * FROM subject WHERE time > 10 ORDER BY time ASC;
//         `;
//         const [rows, fields] = await pool.execute(query);

//         if (rows.length === 0) {
//             return res.status(404).json({ message: "Không có môn học nào có số tiết lớn hơn 10" });
//         }

//         return res.status(200).json({
//             message: "Danh sách các môn học có số tiết lớn hơn 10 sắp xếp tăng dần",
//             data: rows,
//         });
//     } catch (error) {
//         console.error('Error executing SQL query:', error);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// };

// const getSubjectWithMostClasses = async (req, res) => {
//     try {
//         // Sử dụng câu truy vấn SQL để lấy thông tin môn học mà giáo viên có số lớp dạy cao nhất
//         const query = `
//             SELECT * 
//             FROM subject 
//             WHERE task = (
//                 SELECT MAX(task)
//                 FROM subject
//             )
//             LIMIT 1
//         `;
//         const [rows, fields] = await pool.execute(query);

//         if (rows.length === 0) {
//             return res.status(404).json({ message: "Không tìm thấy thông tin môn học" });
//         }

//         // Trả về thông tin môn học mà giáo viên có số lớp dạy cao nhất
//         return res.status(200).json({
//             message: "Thông tin môn học mà giáo viên có số lớp dạy cao nhất",
//             data: rows,
//         });
//     } catch (error) {
//         // Bắt và xử lý lỗi nếu có
//         console.error('Error fetching subject with most classes:', error);
//         return res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
//     }
// };

const getAus = async (req, res) => {
    try {
        const query = `
            SELECT * FROM national WHERE nationality = "Australia" AND date > 2 ORDER BY date ASC
        `;
        const [rows, fields] = await pool.execute(query);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Không có người nào có lần nhập cảnh lớn hơn 2"});
        }

        return res.status(200).json({
            message: "Danh sách những người có số lần nhập cảnh lớn hơn 2: ",
            data: rows,
        });
    } catch (error) {
        console.error('Error executing SQL query:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const putNational = async (req, res) => {
  try {
    // Lấy thông tin từ request body
    const { id, name, nationality, date } = req.body;

    // Kiểm tra xem có dữ liệu truyền vào không
    if (!id || !name || !nationality || !date) {
      return res
        .status(400)
        .json({ message: "Vui lòng cung cấp đủ thông tin." });
    }

    // Kiểm tra xem số lần nhập cảnh (date) có phải là số dương không
    if (date <= 0) {
      return res
        .status(400)
        .json({ message: "Số lần nhập cảnh phải là số dương." });
    }

    // Lấy thông tin số lần nhập cảnh hiện tại từ cơ sở dữ liệu
    const getCurrentDateQuery = `SELECT date FROM national WHERE id = ${id}`;
    const [currentRows, currentFields] = await pool.execute(
      getCurrentDateQuery
    );
    const currentDate = currentRows[0].date;

    // Kiểm tra xem số lần nhập cảnh mới có lớn hơn số lần nhập cảnh hiện tại không
    if (date <= currentDate) {
      return res
        .status(400)
        .json({
          message:
            "Số lần nhập cảnh mới phải lớn hơn số lần nhập cảnh hiện tại.",
        });
    }

    // Tạo câu truy vấn SQL cập nhật thông tin
    const query = `
            UPDATE national
            SET name = '${name}',
                nationality = '${nationality}',
                date = '${date}'
            WHERE id = ${id};
        `;

    // Thực thi câu truy vấn
    const [rows, fields] = await pool.execute(query);

    // Kiểm tra xem có bản ghi nào được cập nhật không
    if (rows.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy bản ghi để cập nhật." });
    }

    // Trả về thông báo thành công
    return res.status(200).json({ message: "Cập nhật thành công." });
  } catch (error) {
    // Xử lý lỗi
    console.error("Lỗi khi cập nhật dữ liệu:", error);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi cập nhật dữ liệu." });
  }
};


module.exports = {
    getAus,
    putNational,
};