//get all employees

const getAllEmployees = (req, res) => {
  res.status(200).json({ message: "Get all the employees" });
};

//create a new employee

const createEmployee = (req, res) => {
  console.log("The request body is : ",req.body)
  const {name, email, phone} = req.body
  if(!name || !email || !phone) {
    res.status(400)
    throw new Error("All feilds are mandatory...")
  }
  res.status(201).json({ message: "Create an employee" });
};

//get employee by id

const getEmployee = (req, res) => {
  res.status(200).json({ message: `Get an employee for ${req.params.id}` });
};

//update employee

const updateEmployee = (req, res) => {
  res.status(200).json({ message: `Update an employee for ${req.params.id}` });
};

//delete an employee

const deleteEmployee = (req, res) => {
  res.status(200).json({ message: `Delete an employee for ${req.params.id}` });
};

module.exports = {
  getAllEmployees,
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};
