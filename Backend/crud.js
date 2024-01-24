
const { pool } = require("./database")
const bcrypt = require('bcrypt')


//Create Employee api

const createEmployee = async (req, res) => {
    try {
        const { emp_id, role_id, user_name, password } = req.body;

        const user = await pool.query(
            "SELECT emp_id FROM employee WHERE emp_id=$1",
            [emp_id],
        );

        if (user.rows.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newEmp = await pool.query(
            "INSERT INTO employee (emp_id, role_id, user_name, password) VALUES ($1,$2,$3,$4) returning *",
            [emp_id, role_id, user_name, hashedPassword],
        );

        const Data = newEmp.rows[0];
        res.status(200).json({ message: "User created successfully", Data });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const getData = async (req, res) => {
    try {
        const { emp_id, inputPassword } = req.body;
        const user = await pool.query(
            "SELECT emp_id, role_id, user_name, password FROM employee WHERE emp_id=$1",
            [emp_id],
        );

        if (user.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const storedPassword = user.rows[0].password;


        const passwordMatch = await bcrypt.compare(inputPassword, storedPassword);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const userData = {
            emp_id: user.rows[0].emp_id,
            role_id: user.rows[0].role_id,
            user_name: user.rows[0].user_name,
        };

        res.status(200).json({ message: "User Data is Fetched", userData });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//Upadte Data Query
const updateData = async (req, res) => {
    try {
        const { emp_id, role_id, user_name, password } = req.body;

        const user = await pool.query("UPDATE employee SET role_id=$1 ,user_name=$2,password=$3 WHERE emp_id=$4", [role_id, user_name, password, emp_id])

        const Data = user.rows[0];
        res.status(200).json({ message: "User Data is Updated", Data })
    }
    catch (err) {
        console.error(err.message)
    }
}

//Delete Data Query
const deleteData = async (req, res) => {
    try {
        const { emp_id, id } = req.body;

        const user = await pool.query("DELETE from employee WHERE emp_id=$1 OR id=$2;", [emp_id, id]);
        res.status(200).json({ message: "User Data is Deleted" })
    }
    catch (err) {
        console.error(err.message)
        res.status(500).json({ message: "Internal server error" })
    }
}


module.exports = {
    createEmployee,
    getData,
    updateData,
    deleteData,
};











//Read Or Retrive Data
// const getdData = async (req, res) => {
//     try {
//         const { emp_id } = req.body;
//         const user = await pool.query(
//             "SELECT emp_id,role_id,user_name,password From employee WHERE emp_id=$1",
//             [emp_id],
//         );

//         //iska line ka use is liye karte hai ke hami kewal importnat information mille
//         const Data = user.rows[0];
//         res.status(200).json({ message: "User Data is Fetched", Data })
//     }
//     catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }
