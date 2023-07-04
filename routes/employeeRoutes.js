const express = require("express")
const router = express.Router()
const {
    getAllEmployees,
    createEmployee,
    getEmployee,
    updateEmployee,
    deleteEmployee,
  } = require("../controllers/employeeController")
const validateToken = require("../middleware/validateTokenHandler")

router.use(validateToken)

router.route("/").get(getAllEmployees).post(createEmployee)

router.route("/:id").get(getEmployee).put(updateEmployee).delete(deleteEmployee)

module.exports = router