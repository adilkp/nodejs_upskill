const asyncHandler = require("express-async-handler")
const Employee = require("../models/employeeModel")
//get all employees

const getAllEmployees = asyncHandler (async (req, res) => {
    const employees = await Employee.find({user_id: req.user.id})
  res.status(200).json(employees);
});

//create a new employee

const createEmployee = asyncHandler (async  (req, res) => {
  console.log("The request body is : ",req.body)
  const {name, email, phone} = req.body
  if(!name || !email || !phone) {
    res.status(400)
    throw new Error("All feilds are mandatory...")
  }

  const employee = await Employee.create({
    name,
    email,
    phone,
    user_id: req.user.id
  })
  res.status(201).json(employee);
});

//get employee by id

const getEmployee = asyncHandler (async (req, res) => {
    const employee = await Employee.findById(req.params.id)
    if(!employee) {
        res.status(404)
        throw new Error(`Employee with given id: ${req.params.id} not found`);
    }
  res.status(200).json(employee);
});

//update employee

const updateEmployee = asyncHandler (async  (req, res) => {
    const employee = await Employee.findById(req.params.id)
    if(!employee) {
        res.status(404)
        throw new Error(`Employee with given id: ${req.params.id} not found`);
    }

    if(employee.user_id.toString() !== req.user.id) {
      res.status(403)
      throw new Error("User does not have access to other users information !!!")
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
  res.status(200).json(updatedEmployee);
});

//delete an employee

const deleteEmployee = asyncHandler (async (req, res) => {
    const employee = await Employee.findById(req.params.id)
    if(!employee) {
        res.status(404)
        throw new Error(`Employee with given id: ${req.params.id} not found`);
    }

    if(employee.user_id.toString() !== req.user.id) {
      res.status(403)
      throw new Error("User does not have access to other users information !!!")
    }

    await Employee.deleteOne({_id: req.params.id})
  res.status(200).json(employee);
});

module.exports = {
  getAllEmployees,
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};
