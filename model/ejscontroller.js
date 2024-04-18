var db = require('../dataconfig/mysqlconnect');
let getAllProduct = async (req,res)=>{
    let sql = `SELECT * FROM product`;
  db.query(sql, (err, listProduct) => {
      if (err) throw (err);
      res.render("product", { products: listProduct });
  });
};
module.exports={
    getAllProduct,
};