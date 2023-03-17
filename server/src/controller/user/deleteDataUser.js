import User from "../../models/userModel.js";


const deleteDataUser = (req, res) => {
  const { id } = req.params
  
  User.findByIdAndDelete(id)
    .then( data => {
        res.json(
          {
            message: "sukses",
            data
          }
        )
      }
    )
    .catch( err => {
        res.status(404).json(
          {
            message: "gagal, data gagal dihapus, id tidak ditemukan",
          }
        )
      }
    )
}

export default deleteDataUser