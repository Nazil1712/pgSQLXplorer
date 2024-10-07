import express from "express";
import {
  getCustomerOrderReport,
  getMaxSalByDept,
  initialize,
  updateEmpSalary,
} from "./postgresql.js";
import { Sequelize } from "sequelize";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("../client"));
initialize();

/* FUNCTION */
// getMaxSalByDept('Finance')

/* PROCEDURE */
// updateEmpSalary(11,10)

/* VIEW */
// getCustomerOrderReport()

// Endpoint for getMaxSalByDept
app.get("/max-sal-by-dept/:dept", async (req, res) => {
  const { dept } = req.params;
  const data = await getMaxSalByDept(dept);
  res.json(data);
});

// Endpoint for updateEmpSalary
app.post("/update-emp-salary", async (req, res) => {
  const { empId, newSalary } = req.body;
  const result = await updateEmpSalary(empId, newSalary);
  res.json({ message: "Salary updated", result });
});

// Endpoint for getCustomerOrderReport
app.get("/customer-order-report", async (req, res) => {
  const data = await getCustomerOrderReport();
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
