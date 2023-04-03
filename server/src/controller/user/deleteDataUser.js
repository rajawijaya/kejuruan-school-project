import User from "../../models/userModel.js";


const deleteDataUser = (req, res) => {
  const { id } = req.params
  
  User.findByIdAndDelete(id)
    .then( data => {
        res.json(
          {
            message: "Success, the data was successfully deleted.",
            error: false,
            status: 200,
            data
          }
        )
      }
    )
    .catch( err => {
        res.status(404).json(
          {
            message: "Failed, data cannot be deleted.",
            error: true,
            status: 404,
            errorMsg: err
          }
        )
      }
    )
}

export default deleteDataUser