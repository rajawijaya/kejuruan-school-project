import User from "../../models/userModel.js";


const deleteAllDataUsers = (req, res) => {
  User.deleteMany({})
    .then( data => {
      res.json(
        {
          message: `${data.deletedCount} data deleted successfully.`,
          error: false,
          status: 200
        }
      )
    })
    .catch( err => {
      res.status(500).json(
        {
          message: `Failed, an error occurred while deleting data.`,
          error: true,
          status: 500,
          errorMsg: err
        }
      )
    })
}

export default deleteAllDataUsers