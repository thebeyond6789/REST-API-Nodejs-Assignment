const { default: mongoose } = require("mongoose");
const db = require("../dataconfig/connectMongoDB");

const userSchema = new mongoose.Schema(
  {
    username: String,
    firstName: String,
    lastName: String,
    email: String,
  },
  { collection: "users" }
);

const User = mongoose.model("users", userSchema);

const addUser = async (req, res) => {
  try {
    // Tạo một instance mới của model User từ dữ liệu nhận được từ request body
    const newUser = new User(req.body);
    console.log("New User: ", req.body);
    // Lưu người dùng vào cơ sở dữ liệu
    await newUser.save();
    // Trả về kết quả thành công
    res.status(201).send(newUser);
  } catch (error) {
    // Trả về lỗi nếu có lỗi xảy ra
    res.status(400).send(error);
  }
};

// Hiển thị danh sách người dùng
const getUsers = async (req, res) => {
  try {
    // Lấy tất cả người dùng từ cơ sở dữ liệu
    const users = await User.find();
    // Trả về danh sách người dùng
    res.send(users);
  } catch (error) {
    // Trả về lỗi nếu có lỗi xảy ra
    res.status(400).send(error);
  }
};
const getUserById = async (req, res) => {
  try {
    // Lấy ID người dùng từ request parameters
    const userId = req.params.id;

    // Tìm người dùng dựa trên ID trong cơ sở dữ liệu
    const user = await User.findById(userId);

    if (!user) {
      // Nếu không tìm thấy người dùng, trả về thông báo lỗi
      return res.status(404).send("Người dùng không tồn tại");
    }

    // Trả về người dùng
    res.send(user);
  } catch (error) {
    // Trả về lỗi nếu có lỗi xảy ra
    res.status(400).send(error);
  }
};
// Sửa
const updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;
    const options = { new: true }; // Trả về document đã được cập nhật
    const updatedUser = await User.findByIdAndUpdate(userId, updates, options);
    if (!updatedUser) {
      return res.status(404).send("User not found");
    }
    res.send(updatedUser);
  } catch (error) {
    res.status(400).send(error);
  }
  //Xóa
};
const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).send("User not found");
    }
    res.send(deletedUser);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  addUser,
  getUsers,
  updateUserById,
  deleteUserById,
  getUserById,
 
};