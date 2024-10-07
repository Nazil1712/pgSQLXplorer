import { QueryTypes, Sequelize } from "sequelize";

const sequelize = new Sequelize("persondb", "postgres", "9026", {
  host: "localhost",
  dialect: "postgres",
});

export const initialize = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};


const SELECT_TYPE = {
  type: QueryTypes.SELECT
}

// User defined DB function
export const getMaxSalByDept = async(dept) =>{
    const data = await sequelize.query(`SELECT * from dept_max_sal_emp1('${dept}')`,SELECT_TYPE)
    return data
}

// DB PROCEDURE
export const updateEmpSalary = async(empId, newSalary) => {
    const result = await sequelize.query(`CALL update_emp_salary('${empId}','${newSalary}')`,SELECT_TYPE)
    
    const table = await sequelize.query(`SELECT * from employees`,SELECT_TYPE)
    return table
}

export const getCustomerOrderReport = async()=>{
  const result = await sequelize.query(`SELECT * from customerordersview`,SELECT_TYPE)
  console.log(result)
}