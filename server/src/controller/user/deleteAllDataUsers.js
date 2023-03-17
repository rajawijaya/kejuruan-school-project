import User from "../../models/userModel.js";


const deleteAllDataUsers = (req, res) => {
  User.deleteMany({})
    .then( data => {
      console.log(`${data.deletedCount} data berhasil dihapus`);
      res.json(
        {
          message: `sukses, ${data.deletedCount} data berhasil dihapus`
        }
      )
    })
    .catch( err => {
      console.log(err);
      res.status(500).json(
        {
          message: `gagal, terjadi kesalahan saat menghapus semua data`,
          data: err
        }
      )
    })
}

export default deleteAllDataUsers